'use client';

import { ReactNode } from 'react';

interface ScrollSmootherWrapperProps {
  children: ReactNode;
}

/**
 * Wrapper component for ScrollSmoother
 * ScrollSmoother requires a specific HTML structure:
 * - #smooth-wrapper: The outer wrapper (viewport container)
 * - #smooth-content: The scrollable content area (gets transformed for smooth effect)
 * 
 * Note: Position fixed elements should be placed outside this wrapper
 */
export function ScrollSmootherWrapper({ children }: ScrollSmootherWrapperProps) {
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}
