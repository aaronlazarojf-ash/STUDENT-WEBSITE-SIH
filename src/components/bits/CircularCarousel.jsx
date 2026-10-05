import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ImageOff } from 'lucide-react';
import { useInView, useReducedMotion } from './useBits.js';

/**
 * CircularCarousel — restrained 3D cylinder showcase for featured onion
 * threats (Knowledge Library). 5–6 captioned cards, step autoplay that
 * pauses on hover / off-screen / reduced-motion, drag with snap,
 * keyboard arrows, no page overflow (container clips).
 */
export default function CircularCarousel({
  items = [],
  cardWidth = 190,
  aspectRatio = 1.12,
  speed = 7,
  gap = 18,
  tilt = -4,
  perspective = 2600,
  autoplay = 'step',
  interval = 6,
  direction = 'left',
  draggable = true,
  momentum = 0.45,
  snap = true,
  pauseOnHover = true,
  focusOnClick = true,
  parallax = 0.12,
  stretch = 0.18,
  depthFade = 0.45,
  fadeColor = '#F5F7F2',
  innerShade = 0.35,
  cornerRadius = 14,
  captions = true,
  onItemClick,
  ariaLabel = 'Featured onion threats carousel',
  className = '',
  style,
  ...rest
}) {
  const count = items.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragDeg, setDragDeg] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [wrapRef, inView] = useInView(0.1);
  const reduced = useReducedMotion();
  const dragStart = useRef({ x: 0, deg: 0 });

  const stepDeg = count > 0 ? 360 / count : 0;
  const radius = useMemo(() => {
    if (count < 2) return 0;
    const slot = cardWidth + gap;
    return Math.round(slot / (2 * Math.tan(Math.PI / count)));
  }, [count, cardWidth, gap]);

  const go = useCallback((dir) => {
    setIndex((i) => (i + dir + count) % count);
  }, [count]);

  // Step autoplay (respects hover / viewport / reduced motion).
  useEffect(() => {
    if (!autoplay || autoplay === 'off' || reduced || paused || !inView || count < 2) return undefined;
    const ms = Math.max(2, interval) * 1000;
    const id = window.setInterval(() => {
      setIndex((i) => (i + (direction === 'left' ? 1 : -1) + count) % count);
    }, ms);
    return () => window.clearInterval(id);
  }, [autoplay, interval, direction, count, paused, inView, reduced]);

  const onPointerDown = (e) => {
    if (!draggable) return;
    setDragging(true);
    setPaused(true);
    dragStart.current = { x: e.clientX, deg: 0 };
    setDragDeg(0);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.current.x;
    setDragDeg(dx * 0.25);
  };
  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);
    setPaused(false);
    if (snap && stepDeg > 0) {
      const steps = Math.round(-dragDeg / stepDeg);
      if (steps !== 0) setIndex((i) => (i + steps + count * 10) % count);
    }
    setDragDeg(0);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  };

  const rotation = -index * stepDeg + dragDeg;
  const cardH = Math.round(cardWidth * aspectRatio);
  void speed; void momentum; void parallax; void stretch;

  if (count === 0) return null;

  return (
    <div
      className={className}
      style={{ ...style }}
      {...rest}
    >
      <div
        ref={wrapRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerEnter={() => pauseOnHover && setPaused(true)}
        onPointerLeave={() => { setPaused(false); endDrag(); }}
        className="focus-visible:outline-2 focus-visible:outline-[#267A70] rounded-2xl"
        style={{
          position: 'relative',
          overflow: 'hidden',
          perspective,
          perspectiveOrigin: '50% 40%',
          touchAction: 'pan-y',
          cursor: draggable ? 'grab' : 'default',
        }}
      >
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          style={{
            position: 'relative',
            height: cardH + 76,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${tilt}deg)`,
          }}
        >
          {items.map((item, i) => {
            let rel = (i - index + count) % count;
            if (rel > count / 2) rel -= count;
            const fade = Math.min(1, Math.abs(rel) * (depthFade + 0.25));
            return (
              <div
                key={item.id || i}
                onClick={(e) => {
                  if (Math.abs(dragDeg) > 6) return;
                  if (focusOnClick && rel !== 0) {
                    setIndex(i);
                    return;
                  }
                  if (rel === 0 || !focusOnClick) onItemClick?.(item, e);
                  else setIndex(i);
                }}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && rel === 0) {
                    e.preventDefault();
                    onItemClick?.(item, e);
                  }
                }}
                tabIndex={rel === 0 ? 0 : -1}
                role="button"
                aria-label={`${item.title}. ${rel === 0 ? 'Activate to inspect.' : 'Activate to focus.'}`}
                style={{
                  position: 'absolute',
                  top: 8,
                  left: `calc(50% - ${cardWidth / 2}px)`,
                  width: cardWidth,
                  transform: `rotateY(${i * stepDeg + rotation}deg) translateZ(${radius}px)`,
                  backfaceVisibility: rel === 0 ? 'visible' : 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  opacity: 1 - fade * 0.85,
                  transition: dragging ? 'none' : 'transform 550ms cubic-bezier(0.3, 1.15, 0.4, 1), opacity 400ms',
                  zIndex: 100 - Math.abs(rel),
                }}
              >
                <div
                  style={{
                    borderRadius: cornerRadius,
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    border: rel === 0 ? '1px solid rgba(21,99,68,0.45)' : '1px solid #DCE4DC',
                    boxShadow: rel === 0
                      ? '0 8px 22px rgba(18,60,42,0.16)'
                      : '0 2px 8px rgba(18,60,42,0.08)',
                    transition: 'border-color 200ms, box-shadow 200ms',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: cardH - 92, overflow: 'hidden', background: '#EFF4EF' }}>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.alt || `${item.title} — onion reference illustration`}
                        draggable={false}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
                        loading="lazy"
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                        <ImageOff size={20} color="#B9C7B9" />
                        <span style={{ fontSize: 10, fontWeight: 600, color: '#9AAA9A' }}>Field reference image</span>
                      </div>
                    )}
                    <div
                      style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none',
                        background: `linear-gradient(180deg, transparent 55%, rgba(18,60,42,${innerShade}) 100%)`,
                      }}
                    />
                  </div>
                  {captions && (
                    <div style={{ padding: '8px 10px 10px' }}>
                      <p style={{ fontSize: 11, fontWeight: 800, color: '#123C2A', letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.title}
                      </p>
                      {item.subtitle && (
                        <p style={{ fontSize: 10, color: '#66756D', fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.subtitle}
                        </p>
                      )}
                      {item.tag && (
                        <p style={{ fontSize: 9, fontWeight: 800, color: '#0A6B45', letterSpacing: '0.08em', marginTop: 2 }}>
                          {item.tag}
                        </p>
                      )}
                      <p style={{ fontSize: 10, fontWeight: 700, color: rel === 0 ? '#0A6B45' : '#9AAA9A', marginTop: 2 }}>
                        Tap to inspect →
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* Depth fade edges */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `linear-gradient(90deg, ${fadeColor} 0%, transparent 18%, transparent 82%, ${fadeColor} 100%)` }} />
      </div>
      {/* Prev / next */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 10 }}>
        <button onClick={() => go(-1)} aria-label="Previous threat" className="btn-secondary !min-h-0 !py-1.5 px-3 text-[12px]">← Prev</button>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }} aria-hidden="true">
          {items.map((it, i) => (
            <span key={it.id || i} style={{ width: 6, height: 6, borderRadius: 9999, background: i === index ? '#156344' : '#C9D4C9', transition: 'background 200ms' }} />
          ))}
        </div>
        <button onClick={() => go(1)} aria-label="Next threat" className="btn-secondary !min-h-0 !py-1.5 px-3 text-[12px]">Next →</button>
      </div>
    </div>
  );
}
