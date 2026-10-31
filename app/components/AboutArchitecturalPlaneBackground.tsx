'use client';

import { useEffect, useMemo } from 'react';
import { useTheme } from 'next-themes';

const GRID_CELL_PX = 40;

type AboutArchitecturalPlaneBackgroundProps = {
  className?: string;
  onReady?: () => void;
  /** Vertical bleed (vh) above and below the scroll track for edge fades */
  fadeVh?: number;
};

export function AboutArchitecturalPlaneBackground({
  className,
  onReady,
  fadeVh = 0,
}: AboutArchitecturalPlaneBackgroundProps) {
  const { resolvedTheme } = useTheme();

  const { backgroundColor, gridLineColor } = useMemo(() => {
    const isDark =
      resolvedTheme === 'dark' ||
      (typeof document !== 'undefined' &&
        document.documentElement.classList.contains('dark'));

    if (isDark) {
      return {
        backgroundColor: '#0a0a0a',
        gridLineColor: '#3a3a3a',
      };
    }

    return {
      backgroundColor: '#ffffff',
      gridLineColor: '#d8d8d8',
    };
  }, [resolvedTheme]);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  return (
    <div
      className={className}
      aria-hidden
      style={{
        top: fadeVh > 0 ? `-${fadeVh}vh` : undefined,
        height:
          fadeVh > 0 ? `calc(100% + ${fadeVh * 2}vh)` : '100%',
        backgroundColor,
        backgroundImage: `linear-gradient(to right, ${gridLineColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridLineColor} 1px, transparent 1px)`,
        backgroundSize: `${GRID_CELL_PX}px ${GRID_CELL_PX}px`,
        backgroundRepeat: 'repeat',
        backgroundPosition: '0 0',
      }}
    />
  );
}
