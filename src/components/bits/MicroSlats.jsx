import React, { useEffect, useRef } from 'react';
import { useInView, useReducedMotion, RISK_ACCENT } from './useBits.js';

/**
 * MicroSlats — compact agricultural signal visualization (canvas 2D).
 * Rows of softly animated slats suggesting combined field signals.
 * Parent controls size (recommended h-[120px]–h-[170px], w-full).
 * `risk` recolors the slats: LOW / MODERATE / HIGH / CRITICAL (muted).
 * Pauses off-screen and under prefers-reduced-motion.
 */
export default function MicroSlats({
  color = '#2F7D5A',
  risk = null,
  glintColor = '#E4F0E7',
  backgroundColor = 'transparent',
  slatWidth = 7,
  slatHeight = 18,
  gap = 4,
  speed = 0.5,
  paused = false,
  className = '',
  style,
  ...rest
}) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const [inViewRef, inView] = useInView(0.05);
  const reduced = useReducedMotion();
  const accent = (risk && RISK_ACCENT[risk]) || color;
  const frozen = paused || reduced;

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return undefined;
    const ctx = canvas.getContext('2d');
    let raf = 0;
    let w = 0;
    let h = 0;
    let t = Math.random() * 100;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      w = Math.max(1, Math.floor(r.width));
      h = Math.max(1, Math.floor(r.height));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (backgroundColor !== 'transparent') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, w, h);
      }
      const step = slatWidth + gap;
      const cols = Math.ceil(w / step);
      const rowH = slatHeight + gap * 2;
      const rows = Math.max(1, Math.floor(h / rowH));
      const yOff = (h - rows * rowH) / 2 + gap;
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const wave = Math.sin(c * 0.35 + t * (0.5 + speed) + r * 1.1) * 0.5 + 0.5;
          const chop = wave > 0.72;
          const bh = slatHeight * (0.35 + wave * 0.65);
          const x = c * step;
          const y = yOff + r * rowH + (slatHeight - bh);
          ctx.fillStyle = chop ? glintColor : accent;
          ctx.globalAlpha = chop ? 0.9 : 0.32 + wave * 0.5;
          const rad = Math.min(4, slatWidth / 2);
          ctx.beginPath();
          if (ctx.roundRect) ctx.roundRect(x, y, slatWidth, bh, rad);
          else ctx.rect(x, y, slatWidth, bh);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    draw();
    if (frozen || !inView) return () => ro.disconnect();
    const loop = () => {
      t += 0.02 + speed * 0.03;
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accent, glintColor, backgroundColor, slatWidth, slatHeight, gap, speed, frozen, inView]);

  void rest;
  return (
    <div
      ref={(el) => {
        wrapRef.current = el;
        inViewRef.current = el;
      }}
      aria-hidden="true"
      className={className}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
