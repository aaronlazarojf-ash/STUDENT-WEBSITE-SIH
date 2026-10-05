import React, { useEffect, useRef, useState } from 'react';

/**
 * SpringCheck — spring-animated checkbox for the FIELD CHECK list.
 * Real <input type="checkbox"> semantics (keyboard + screen-reader safe).
 * The tick draws in with a small bounce; completed rows get a soft green
 * tint from the parent via [data-checked="true"]. No strikethrough.
 */
export default function SpringCheck({
  label,
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  color = '#35594A',
  fillColor = '#176744',
  checkColor = '#FFFFFF',
  boxSize = 24,
  boxRadius = 7,
  fontSize = 14,
  bounce = 0.16,
  name,
  className = '',
  style,
  ...rest
}) {
  const [internal, setInternal] = useState(defaultChecked);
  const checked = controlledChecked !== undefined ? controlledChecked : internal;
  const [justChecked, setJustChecked] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const toggle = () => {
    const next = !checked;
    if (controlledChecked === undefined) setInternal(next);
    if (next) {
      setJustChecked(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setJustChecked(false), 320);
    }
    onChange?.(next);
  };

  const bounceScale = 1 + bounce;
  const dashLen = 30;

  return (
    <label
      data-checked={checked ? 'true' : 'false'}
      className={`springcheck flex items-center gap-2.5 px-2.5 py-2 rounded-[10px] cursor-pointer select-none transition-colors duration-150 ${className}`}
      style={{ fontSize, color, ...style }}
      {...rest}
    >
      <input
        type="checkbox"
        className="sr-only"
        name={name}
        checked={checked}
        onChange={toggle}
      />
      <span
        aria-hidden="true"
        style={{
          width: boxSize,
          height: boxSize,
          borderRadius: boxRadius,
          flexShrink: 0,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: checked ? fillColor : '#FFFFFF',
          border: `2px solid ${checked ? fillColor : '#C9D4C9'}`,
          transform: justChecked ? `scale(${bounceScale})` : 'scale(1)',
          transition: justChecked
            ? 'transform 160ms cubic-bezier(0.3, 1.6, 0.4, 1), background-color 150ms, border-color 150ms'
            : 'transform 180ms ease-out, background-color 150ms, border-color 150ms',
        }}
      >
        <svg
          width={boxSize * 0.58}
          height={boxSize * 0.58}
          viewBox="0 0 24 24"
          fill="none"
          stroke={checkColor}
          strokeWidth={3.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M4 12.5l5 5L20 6.5"
            strokeDasharray={dashLen}
            strokeDashoffset={checked ? 0 : dashLen}
            style={{ transition: 'stroke-dashoffset 220ms ease-out 40ms' }}
          />
        </svg>
      </span>
      <span style={{ fontWeight: checked ? 700 : 500 }}>{label}</span>
    </label>
  );
}
