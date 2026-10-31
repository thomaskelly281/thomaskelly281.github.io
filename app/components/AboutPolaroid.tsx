'use client';

import { CSSProperties, ReactNode } from 'react';
import { Caveat } from 'next/font/google';
import './AboutIdle.css';

const handwriting = Caveat({
  subsets: ['latin'],
  weight: ['500', '600'],
});

type AboutPolaroidProps = {
  src: string;
  alt: string;
  caption: string;
  rotation?: number;
  className?: string;
  children?: ReactNode;
};

export function AboutPolaroid({
  src,
  alt,
  caption,
  rotation = 0,
  className = 'mx-auto w-[72%]',
  children,
}: AboutPolaroidProps) {
  const sheenDelay = [...src].reduce((n, char) => n + char.charCodeAt(0), 0);
  const sheenStyle = {
    '--about-sheen-delay': `${(sheenDelay % 7) * 1.15}s`,
  } as CSSProperties;

  return (
    <div
      className={`relative ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <figure
        className="relative m-0 overflow-visible border-0 px-3 pt-3 pb-4 shadow-[0_8px_24px_rgba(34,34,34,0.08)]"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="relative aspect-[4/3] overflow-visible bg-neutral-100">
          <div className="about-sheen-host h-full w-full" style={sheenStyle}>
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <span className="about-sheen" aria-hidden />
          </div>
          {children}
        </div>
        <figcaption
          className={`${handwriting.className} mt-3 min-h-[2.75rem] bg-[#ffffff] px-1 pb-0.5 text-center text-[1.3rem] leading-snug text-neutral-800 sm:text-[1.4rem]`}
          style={{ backgroundColor: '#ffffff' }}
        >
          {caption}
        </figcaption>
      </figure>
    </div>
  );
}
