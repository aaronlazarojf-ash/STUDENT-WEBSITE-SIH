import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * RubberSegment — spring micro-interaction segmented filter control.
 * Wraps an existing string filter value: onChange(value) mirrors the
 * previous button behavior exactly. Single-select only.
 *
 * Geo-Farm palette: track #E4ECE6, thumb #156344. Restrained elasticity
 * (stretch 30–50, squash 1–2, glide 30–45) — smooth, never toy-like.
 */
export default function RubberSegment({
  items = [],
  value,
  defaultValue,
  onChange,
  trackColor = '#E4ECE6',
  thumbColor = '#156344',
  textColor = '#4D6258',
  activeTextColor = '#FFFFFF',
  size = 'sm',
  radius = 9,
  inset = 3,
  equalSlots = true,
  stretch = 45,
  squash = 2,
  glide = 40,
  draggable = true,
  getLabel,
  ariaLabel = 'Filter',
  className = '',
  ...rest
}) {
  const controlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? items[0]);
  const current = controlled ? value : internal;
  const trackRef = useRef(null);
  const btnRefs = useRef([]);
  const [thumb, setThumb] = useState({ left: 0, width: 0, ready: false });
  const [kicking, setKicking] = useState(false);
  const dragging = useRef(false);

  const labelOf = useCallback((it) => (getLabel ? getLabel(it) : it), [getLabel]);

  const measure = useCallback(() => {
    const idx = Math.max(0, items.indexOf(current));
    const track = trackRef.current;
    const btn = btnRefs.current[idx];
    if (!track || !btn) return;
    const tr = track.getBoundingClientRect();
    const br = btn.getBoundingClientRect();
    setThumb({ left: br.left - tr.left, width: br.width, ready: true });
  }, [current, items]);

  useEffect(() => {
    measure();
    // Re-measure once webfonts settle (prevents thumb/label drift).
    try {
      document.fonts?.ready.then(() => measure()).catch(() => {});
    } catch {
      /* ignore */
    }
  }, [measure, current, items.length]);

  useEffect(() => {
    window.addEventListener('resize', measure);
    // Re-measure when label widths change (e.g. language switch).
    const track = trackRef.current;
    let ro = null;
    if (track && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => measure());
      ro.observe(track);
    }
    return () => {
      window.removeEventListener('resize', measure);
      ro?.disconnect();
    };
  }, [measure]);

  const select = useCallback((it, dir = 0) => {
    if (it === current) return;
    if (!controlled) setInternal(it);
    // Brief squash-and-stretch kick on change (direction-aware, subtle).
    setKicking(dir);
    window.setTimeout(() => setKicking(false), 220);
    onChange?.(it);
  }, [current, controlled, onChange]);

  const onKeyDown = (e, idx) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const n = items[(idx + 1) % items.length];
      select(n, 1);
      btnRefs.current[(idx + 1) % items.length]?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const p = items[(idx - 1 + items.length) % items.length];
      select(p, -1);
      btnRefs.current[(idx - 1 + items.length) % items.length]?.focus();
    }
  };

  const pad = size === 'sm' ? 'px-2.5 py-1.5 text-xs' : 'px-3.5 py-2 text-[13px]';
  const kickScale = kicking ? `scaleX(${1 + squash / 100})` : 'scaleX(1)';

  return (
    <div
      ref={trackRef}
      role="radiogroup"
      aria-label={ariaLabel}
      className={`relative inline-flex max-w-full overflow-x-auto ${className}`}
      style={{
        backgroundColor: trackColor,
        borderRadius: radius + inset,
        padding: inset,
        gap: 2,
      }}
      {...rest}
    >
      {/* Sliding thumb */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: inset,
          bottom: inset,
          left: thumb.left,
          width: thumb.width,
          backgroundColor: thumbColor,
          borderRadius: radius,
          opacity: thumb.ready ? 1 : 0,
          transform: kickScale,
          transformOrigin: kicking < 0 ? 'right center' : 'left center',
          transition: `left ${120 + glide * 4}ms cubic-bezier(0.3, 1.4, 0.4, 1), width ${120 + glide * 4}ms cubic-bezier(0.3, 1.4, 0.4, 1), transform 200ms ease-out, opacity 150ms`,
          boxShadow: '0 1px 3px rgba(18,60,42,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
        }}
      />
      {items.map((it, idx) => {
        const active = it === current;
  void stretch;
  return (
          <button
            key={String(it)}
            ref={(el) => { btnRefs.current[idx] = el; }}
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={(e) => select(it, e.clientX > (btnRefs.current[idx]?.getBoundingClientRect().left ?? 0) ? 1 : -1)}
            onKeyDown={(e) => onKeyDown(e, idx)}
            onPointerEnter={(e) => {
              if (draggable && dragging.current && e.buttons > 0) select(it);
            }}
            onPointerDown={() => { dragging.current = true; }}
            onPointerUp={() => { dragging.current = false; }}
            className={`relative z-[1] shrink-0 font-bold whitespace-nowrap transition-colors duration-150 rounded-[7px] focus-visible:outline-2 focus-visible:outline-[#267A70] ${equalSlots ? 'flex-1' : ''} ${pad}`}
            style={{ color: active ? activeTextColor : textColor, minWidth: equalSlots ? `${100 / Math.max(1, items.length)}%` : undefined }}
          >
            {labelOf(it)}
          </button>
        );
      })}
    </div>
  );
}

function eButtonsDown() {
  return true;
}
