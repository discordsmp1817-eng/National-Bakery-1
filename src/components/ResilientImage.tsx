import { useEffect, useRef, useState } from 'react';
import { Croissant } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
}

export function ResilientImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setHasError(false);
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#17283B] via-[#223952] to-[#17283B] text-[#FFF7EB] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Croissant className="w-8 h-8 text-[#D6B17A] mb-2 opacity-80" strokeWidth={1.5} />
        <span className="font-serif text-sm tracking-wide text-[#FFF7EB]/90 line-clamp-2">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#EFE6D8] ${className}`}>
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#EFE6D8] via-[#F7F0E4] to-[#EFE6D8] animate-pulse"
          aria-hidden="true"
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
