import { useEffect, useRef, useState } from 'react';

/** Tracks prefers-reduced-motion. All animated bits pause/degrade when true. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReduced(mq.matches);
      const onChange = (e) => setReduced(e.matches);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    } catch {
      return undefined;
    }
  }, []);
  return reduced;
}

/**
 * Tracks whether an element is inside the viewport.
 * Animated bits pause expensive rendering while off-screen.
 */
export function useInView(threshold = 0.05) {
  const ref = useRef(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/** Geo-Farm risk accent colors (muted, never neon). */
export const RISK_ACCENT = {
  LOW: '#2F7D5A',
  MODERATE: '#A3862B',
  MEDIUM: '#A3862B',
  HIGH: '#C26A2B',
  CRITICAL: '#B03A3A',
};
