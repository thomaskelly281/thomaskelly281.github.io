'use client';

import * as React from 'react';
import { RollingText } from '@/components/animate-ui/primitives/texts/rolling';
import { cn } from '@/lib/utils';

interface RollingTextHoverProps {
  text: string;
  className?: string;
  transition?: { duration?: number; delay?: number; ease?: 'easeOut' | 'easeIn' | 'easeInOut' | 'linear' };
}

export function RollingTextHover({ text, className, transition }: RollingTextHoverProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [shouldRoll, setShouldRoll] = React.useState(false);
  const [animationKey, setAnimationKey] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    // Clear any pending roll animation
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    setIsHovered(true);
    setShouldRoll(false);
    setIsAnimating(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    // Only trigger roll if not already animating
    if (!isAnimating) {
      setShouldRoll(true);
      setAnimationKey((prev) => prev + 1);
      setIsAnimating(true);
      
      // Calculate animation duration based on text length
      const textLength = text.length;
      const baseDuration = transition?.duration ?? 0.3;
      const totalDuration = baseDuration + (textLength * (transition?.delay ?? 0.02)) + 0.3;
      
      // Reset animation state after animation completes
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
        setShouldRoll(false);
        timeoutRef.current = null;
      }, totalDuration * 1000);
    }
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn('relative inline-block', className)}
    >
      <span className="relative">
        <RollingText
          key={animationKey}
          text={text}
          inView={shouldRoll}
          inViewOnce={false}
          transition={{
            duration: transition?.duration ?? 0.3,
            delay: transition?.delay ?? 0.02,
            ease: (transition?.ease ?? 'easeOut') as 'easeOut' | 'easeIn' | 'easeInOut' | 'linear',
          }}
        />
        {/* Green underline on hover */}
        <span
          className={cn(
            'absolute bottom-0 left-0 h-0.5 bg-accent-tertiary transition-all duration-300',
            isHovered ? 'w-full' : 'w-0'
          )}
        />
      </span>
    </span>
  );
}
