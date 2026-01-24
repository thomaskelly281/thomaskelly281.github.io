'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { CornerDownLeftIcon } from '@/components/animate-ui/icons/corner-down-left';

type CursorState = 'default' | 'header' | 'button' | 'ring';

export function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<{ startAnimation: () => void; stopAnimation: () => void } | null>(null);
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastDetectedElementRef = useRef<HTMLElement | null>(null);
  const stateChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to start looping animation
  const startLoopingAnimation = useCallback(() => {
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }
    
    // Start animation immediately if icon is available
    if (iconRef.current) {
      iconRef.current.startAnimation();
    }
    
    // Set up interval for continuous looping
    animationIntervalRef.current = setInterval(() => {
      if (iconRef.current) {
        iconRef.current.startAnimation();
      }
    }, 450); // Match animation duration (450ms)
  }, []);

  // Function to stop looping animation
  const stopLoopingAnimation = useCallback(() => {
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = null;
    }
    if (iconRef.current) {
      iconRef.current.stopAnimation();
    }
  }, []);

  // Function to check what element is under the cursor
  const checkElementUnderCursor = useCallback((x: number, y: number) => {
    // Temporarily hide cursor to get accurate element detection
    if (cursorRef.current) {
      cursorRef.current.style.pointerEvents = 'none';
    }
    
    const element = document.elementFromPoint(x, y) as HTMLElement | null;
    
    // Re-enable pointer events
    if (cursorRef.current) {
      cursorRef.current.style.pointerEvents = '';
    }
    
    if (!element) {
      setCursorState('default');
      stopLoopingAnimation();
      return;
    }

    // Skip if we're detecting the cursor element itself
    if (cursorRef.current && cursorRef.current.contains(element)) {
      return;
    }

    // Check if hovering over the SVG in header section (not the whole header)
    const headerSvg = element.closest('[data-header-svg="true"]');
    if (headerSvg) {
      setCursorState('header');
      stopLoopingAnimation();
      return;
    }

    // Find the closest interactive parent element (button, link, etc.)
    // This is more stable during animations where child elements change
    const findInteractiveParent = (el: HTMLElement): HTMLElement | null => {
      let current: HTMLElement | null = el;
      while (current) {
        // Check if current element is interactive
        if (
          current.tagName === 'BUTTON' ||
          current.tagName === 'A' ||
          current.getAttribute('role') === 'button' ||
          current.classList.contains('cursor-pointer')
        ) {
          return current;
        }
        
        // Check computed style for pointer cursor
        const style = window.getComputedStyle(current);
        if (style.cursor === 'pointer' || style.cursor === 'grab') {
          return current;
        }
        
        // Move to parent
        current = current.parentElement;
        
        // Stop if we've gone too far up (past body)
        if (!current || current.tagName === 'BODY' || current.tagName === 'HTML') {
          break;
        }
      }
      return null;
    };

    const interactiveParent = findInteractiveParent(element);
    
    // Use stable reference to prevent flickering during animations
    // If we're still over the same interactive parent, don't update state
    if (interactiveParent) {
      // Check if it's the theme switcher button
      const isThemeSwitcher = 
        interactiveParent.getAttribute('data-slot') === 'theme-toggler-button' ||
        interactiveParent.closest('[data-slot="theme-toggler-button"]') ||
        interactiveParent.closest('button[data-slot="theme-toggler-button"]');
      
      // Clear any pending state change to default
      if (stateChangeTimeoutRef.current) {
        clearTimeout(stateChangeTimeoutRef.current);
        stateChangeTimeoutRef.current = null;
      }
      
      // Only update if we're detecting a different interactive parent
      if (lastDetectedElementRef.current !== interactiveParent) {
        lastDetectedElementRef.current = interactiveParent;
        if (isThemeSwitcher) {
          setCursorState('ring');
          stopLoopingAnimation();
        } else {
          setCursorState('button');
          startLoopingAnimation();
        }
      }
      return;
    }

    // If we were over an interactive element but now we're not,
    // add a small delay before changing to default to prevent flickering
    if (lastDetectedElementRef.current) {
      if (stateChangeTimeoutRef.current) {
        clearTimeout(stateChangeTimeoutRef.current);
      }
      
      stateChangeTimeoutRef.current = setTimeout(() => {
        // Verify we're still not over an interactive element
        if (cursorRef.current) {
          cursorRef.current.style.pointerEvents = 'none';
        }
        const recheckElement = document.elementFromPoint(x, y) as HTMLElement | null;
        if (cursorRef.current) {
          cursorRef.current.style.pointerEvents = '';
        }
        
        if (recheckElement && cursorRef.current && !cursorRef.current.contains(recheckElement)) {
          const recheckParent = findInteractiveParent(recheckElement);
          if (!recheckParent) {
            lastDetectedElementRef.current = null;
            setCursorState('default');
            stopLoopingAnimation();
          }
        } else {
          lastDetectedElementRef.current = null;
          setCursorState('default');
          stopLoopingAnimation();
        }
        stateChangeTimeoutRef.current = null;
      }, 50);
      return;
    }

    // No interactive parent and we weren't over one before
    setCursorState('default');
    stopLoopingAnimation();
  }, [startLoopingAnimation, stopLoopingAnimation]);

  useEffect(() => {
    // Only show cursor on desktop (non-touch devices)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
      
      // Use the actual mouse coordinates for detection
      // The cursor visual is centered on these coordinates with translate(-50%, -50%)
      // So the center of the circle is at the mouse position
      checkElementUnderCursor(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setCursorState('default');
      stopLoopingAnimation();
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (stateChangeTimeoutRef.current) {
        clearTimeout(stateChangeTimeoutRef.current);
      }
      stopLoopingAnimation();
    };
  }, [cursorX, cursorY, checkElementUnderCursor, stopLoopingAnimation]);

  // Start animation when icon becomes visible, stop when it disappears
  useEffect(() => {
    if (cursorState === 'button') {
      // Small delay to ensure icon is mounted
      const timeout = setTimeout(() => {
        if (iconRef.current) {
          startLoopingAnimation();
        }
      }, 50);
      return () => {
        clearTimeout(timeout);
        stopLoopingAnimation();
      };
    } else {
      stopLoopingAnimation();
    }
  }, [cursorState, startLoopingAnimation, stopLoopingAnimation]);

  const size = cursorState === 'default' ? 64 : 36;
  const showIcon = cursorState === 'button';
  const isRing = cursorState === 'ring';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={cursorRef}
          className="fixed pointer-events-none z-[9999]"
          style={{
            x,
            y,
          }}
          transformTemplate={(values, generated) => {
            // Use the generated transform from x/y and add centering
            return `${generated} translate(-50%, -50%)`;
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="rounded-full flex items-center justify-center"
            style={{
              width: size,
              height: size,
              backgroundColor: isRing ? 'transparent' : 'var(--accent-tertiary)',
              border: isRing ? `2px solid var(--accent-tertiary)` : 'none',
            }}
            animate={{
              width: size,
              height: size,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {showIcon && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
                style={{ color: '#222222' }}
              >
                <CornerDownLeftIcon
                  ref={iconRef}
                  size={20}
                />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
