import React, { useCallback, useRef, useState } from 'react';

/**
 * FlipCard — restrained 3D flip card for the Onion Field Guide.
 * Front: disease image + name + type + "click to explore" cue.
 * Back: recognition / conditions / field check + VIEW FIELD GUIDE CTA.
 * Click, Enter or Space flips. Subtle tilt only (no glare, no drama).
 */
export default function FlipCard({
  axis = 'y',
  flipOnClick = true,
  tilt = true,
  tiltMax = 7,
  hoverScale = 1.015,
  perspective = 1200,
  width = 280,
  height = 350,
  radius = 16,
  background = '#FFFFFF',
  color = '#19382A',
  shadow = true,
  shadowColor = '#18382A',
  shadowOpacity = 0.1,
  flipped: controlledFlipped,
  defaultFlipped = false,
  onFlip,
  front,
  back,
  ariaLabel = 'Disease card. Activate to flip.',
  className = '',
  style,
  ...rest
}) {
  const [internal, setInternal] = useState(defaultFlipped);
  const flipped = controlledFlipped !== undefined ? controlledFlipped : internal;
  const [tiltXY, setTiltXY] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const cardRef = useRef(null);

  const doFlip = useCallback(() => {
    const next = !flipped;
    if (controlledFlipped === undefined) setInternal(next);
    onFlip?.(next);
  }, [flipped, controlledFlipped, onFlip]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      // Space on a nested CTA must not double-flip the card.
      if (e.target !== e.currentTarget) return;
      e.preventDefault();
      if (flipOnClick) doFlip();
    }
  };

  const onPointerMove = (e) => {
    if (!tilt || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTiltXY({ x: -py * tiltMax, y: px * tiltMax });
  };

  const rotate = flipped ? 180 : 0;
  const faceTransform = (extra) =>
    axis === 'y'
      ? `rotateY(${rotate + extra}deg)`
      : `rotateX(${rotate + extra}deg)`;

  const face = (isBack, content) => (
    <div
      aria-hidden={isBack ? !flipped : flipped}
      style={{
        position: 'absolute',
        inset: 0,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: faceTransform(isBack ? 180 : 0),
        background,
        color,
        borderRadius: radius,
        overflow: 'hidden',
        border: '1px solid #DCE4DC',
      }}
    >
      {content}
    </div>
  );

  return (
    <div style={{ perspective, width: '100%', maxWidth: width, ...style }} className={className} {...rest}>
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-pressed={flipped}
        onClick={() => flipOnClick && doFlip()}
        onKeyDown={onKeyDown}
        onPointerMove={onPointerMove}
        onPointerLeave={() => { setTiltXY({ x: 0, y: 0 }); setHover(false); }}
        onPointerEnter={() => setHover(true)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        style={{
          position: 'relative',
          width: '100%',
          height,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tiltXY.x}deg) rotateY(${tiltXY.y}deg) scale(${hover ? hoverScale : 1})`,
          transition: 'transform 260ms cubic-bezier(0.3, 1.2, 0.4, 1)',
          cursor: flipOnClick ? 'pointer' : 'default',
          outline: 'none',
        }}
        onFocusCapture={(e) => { e.currentTarget.style.boxShadow = '0 0 0 2px #267A70'; }}
        onBlurCapture={(e) => { e.currentTarget.style.boxShadow = ''; }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transformStyle: 'preserve-3d',
            transform: axis === 'y' ? `rotateY(${rotate}deg)` : `rotateX(${rotate}deg)`,
            transition: 'transform 480ms cubic-bezier(0.35, 1.1, 0.4, 1)',
            borderRadius: radius,
            boxShadow: shadow ? `0 6px 18px ${hexA(shadowColor, shadowOpacity)}` : 'none',
          }}
        >
          {face(false, front)}
          {face(true, back)}
        </div>
      </div>
    </div>
  );
}

function hexA(hex, alpha) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return `rgba(24,56,42,${alpha})`;
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}
