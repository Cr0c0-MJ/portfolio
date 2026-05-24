'use client';
import { useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  /** 뷰포트 상단 이미지 (LCP 대상)엔 priority={true} */
  priority?: boolean;
  /** next/image sizes 힌트 — 미지정 시 기본값 사용 */
  sizes?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={`bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center ${className ?? ''}`}
      >
        <span className="text-gray-500 text-sm">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      priority={priority}
      sizes={sizes}
      onError={() => setError(true)}
    />
  );
}
