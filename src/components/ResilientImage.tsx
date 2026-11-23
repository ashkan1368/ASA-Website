import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#151816] text-[#C8A96A] p-6 text-center select-none border border-[#C8A96A]/20 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Sparkles className="w-6 h-6 mb-2 text-[#C8A96A] opacity-80" />
        <span className="font-serif text-base text-[#F5F2EB]">
          {fallbackLabel || alt}
        </span>
        <span className="text-[11px] text-[#9E988E] mt-1">
          ASA · آسایش · سهولت · آرامش
        </span>
      </div>
    );
  }

  const isExternalHttp = src.startsWith('http://') || src.startsWith('https://');

  return (
    <div className={`relative overflow-hidden bg-[#151816] ${className}`}>
      <img
        src={src}
        alt={alt}
        {...(isExternalHttp ? { referrerPolicy: 'no-referrer' } : {})}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-95'
        }`}
      />
    </div>
  );
};
