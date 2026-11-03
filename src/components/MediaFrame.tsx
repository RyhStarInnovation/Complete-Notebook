import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';

interface MediaFrameProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallbackLabel?: string;
}

export function MediaFrame({
  src,
  alt,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  fallbackLabel = 'Complete Notebook',
}: MediaFrameProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-[#0B132B] dark:via-[#111D3A] dark:to-[#070C1A] text-slate-600 dark:text-slate-300 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <BookOpen className="w-8 h-8 text-blue-600 dark:text-sky-400 mb-2 opacity-80" />
        <span className="text-xs font-medium tracking-wide">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setFailed(true)}
        className={imgClassName}
      />
    </div>
  );
}
