import React, { useEffect, useRef } from 'react';
import { useInView, useReducedMotion } from './useBits.js';

/**
 * PatternWaves — subtle atmospheric silk-line wave field (canvas 2D).
 *
 * INTENDED USE ONLY: public landing-page hero background, behind content
 * (absolute inset-0 z-0; hero copy at z-1 with a readability overlay).
 *
 * NOT mounted anywhere in the current app: the landing hero lives inside
 * Login.jsx, which is frozen by product rule. Mount this only when the
 * public landing is next redesigned — never on dashboards or behind maps.
 *
 * Respects prefers-reduced-motion (renders one static frame) and pauses
 * while outside the viewport.
 */
export default function PatternWaves({
  color = '#2F6B4F',
  backgroundColor = 'transparent',
  spacing = 18,
  speed = 0.16,
  opacity = 0.22,
  interactive = true,
  cursorSize = 55,
  cursorStrength = 0.28,
  paused = false,
  className = '',
  style,
  ...rest
}) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const [inViewRef, inView] = useInView(0);
  const reduced = useReducedMotion();
  const cursor = useRef({ x: -9999, y: -9999, active: false });

  const frozen = paused || reduced || !interactive && false;

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

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      cursor.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true };
    };
    const onLeave = () => { cursor.current.active = false; };
    if (interactive && !reduced) {
      wrap.addEventListener('pointermove', onMove);
      wrap.addEventListener('pointerleave', onLeave);
    }

    const rows = () => Math.max(4, Math.floor(h / spacing));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (backgroundColor !== 'transparent') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      const n = rows();
      const amp = 9;
      for (let r = 0; r <= n; r += 1) {
        const yBase = (r / n) * h;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 6) {
          let y = yBase
            + Math.sin(x * 0.012 + t * (0.6 + speed * 4) + r * 0.55) * amp
            + Math.sin(x * 0.03 - t * 0.9 + r) * amp * 0.35;
          if (cursor.current.active) {
            const dx = x - cursor.current.x;
            const dy = yBase - cursor.current.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < cursorSize * 2) {
              const f = (1 - d / (cursorSize * 2)) * cursorStrength * 46;
              y -= f * Math.exp(-((d / cursorSize) ** 2));
            }
          }
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    draw(); // always paint at least one frame
    if (frozen || !inView) {
      return () => {
        ro.disconnect();
        wrap.removeEventListener('pointermove', onMove);
        wrap.removeEventListener('pointerleave', onLeave);
      };
    }
    const loop = () => {
      t += 0.008 + speed * 0.03;
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, backgroundColor, spacing, speed, opacity, interactive, cursorSize, cursorStrength, frozen, inView]);

  void rest;
  return (
    <div
      ref={(el) => {
        wrapRef.current = el;
        inViewRef.current = el;
      }}
      aria-hidden="true"
      className={className}
      style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: interactive && !reduced ? 'auto' : 'none', ...style }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
