import React, { useState } from 'react';
import { LotusDivider } from './HeritageIcons';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}

export function ResilientImage({ src, alt, className = '', eager = false }: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#2C1E16] via-[#4A2E1B] to-[#1F1A17] text-[#FAF8F5] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <LotusDivider className="w-28 h-5 text-[#D49B35] mb-2" />
        <span className="text-xs font-serif-heritage tracking-wide text-[#E5DEC9] line-clamp-2">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
