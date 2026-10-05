import React, { useState } from 'react';
import { ONION_PLACEHOLDER_IMAGE } from '../data/onionKnowledge.js';

/**
 * Agricultural reference image with honest fallbacks.
 *
 * - Fixed sizing comes from the parent via className (aspect set before
 *   load → no layout shift); a subtle skeleton shows while loading.
 * - Missing src → neutral onion silhouette + "Field reference image".
 * - Failed load → silhouette + "Reference image unavailable".
 * - Never a broken browser icon, never a wrong-crop substitution.
 */
export default function AgriImage({ src, alt, label = 'Field reference image', className = '' }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!src || failed) {
    return (
      <div className={`bg-[#EFF4EF] border border-gov-border flex flex-col items-center justify-center gap-1 p-3 text-center ${className}`}>
        <img src={ONION_PLACEHOLDER_IMAGE} alt="" aria-hidden="true" className="w-10 h-10 opacity-70" />
        <span className="text-[11px] text-gray-500 font-medium leading-tight">
          {failed ? 'Reference image unavailable' : label}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#EFF4EF] ${className}`}>
      {!loaded && <div className="skeleton absolute inset-0" aria-hidden="true" />}
      <img
        src={src}
        alt={alt || 'Onion reference illustration'}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`object-cover w-full h-full transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
