'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { MoveHorizontal } from 'lucide-react';
import { CornerDownLeftIcon } from '@/components/animate-ui/icons/corner-down-left';
import { SquareArrowOutUpRight } from '@/components/animate-ui/icons/square-arrow-out-up-right';

type CursorState = 'default' | 'header' | 'button' | 'ring' | 'work-image' | 'sidepanel' | 'heart' | 'external-link' | 'confetti' | 'swipe' | 'about-paint';

export function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isInSidepanel, setIsInSidepanel] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOverAccentBg, setIsOverAccentBg] = useState(false);
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
      setIsInSidepanel(false);
      setIsOverAccentBg(false);
      stopLoopingAnimation();
      return;
    }

    // Skip if we're detecting the cursor element itself
    if (cursorRef.current && cursorRef.current.contains(element)) {
      return;
    }

    // Check if hovering over accent-colored background
    const checkForAccentBg = (el: HTMLElement | null): boolean => {
      let current: HTMLElement | null = el;
      while (current) {
        // Check if element has bg-accent-tertiary class
        if (current.classList.contains('bg-accent-tertiary')) {
          return true;
        }
        // Check computed background color
        const style = window.getComputedStyle(current);
        const bgColor = style.backgroundColor;
        // Check if background color matches accent color (#E5FF20 or rgb(229, 255, 32))
        if (bgColor === 'rgb(229, 255, 32)' || bgColor === '#E5FF20' || bgColor === 'rgb(229, 255, 32)') {
          return true;
        }
        current = current.parentElement;
        if (!current || current.tagName === 'BODY' || current.tagName === 'HTML') {
          break;
        }
      }
      return false;
    };

    const overAccentBg = checkForAccentBg(element);
    setIsOverAccentBg(overAccentBg);

    // Check if hovering over footer name section (signature and text)
    const footerNameSection = element.closest('.cursor-heart');
    if (footerNameSection) {
      setCursorState('heart');
      setIsInSidepanel(false);
      stopLoopingAnimation();
      return;
    }

    // Check if hovering over confetti cursor element
    const confettiElement = element.closest('.cursor-confetti');
    if (confettiElement) {
      setCursorState('confetti');
      setIsInSidepanel(false);
      stopLoopingAnimation();
      return;
    }

    // Back arrow when hovering the case-study drawer overlay
    const drawerDismiss = element.closest('[data-drawer-dismiss]');
    if (drawerDismiss) {
      setCursorState('button');
      setIsInSidepanel(false);
      startLoopingAnimation();
      return;
    }

    const swipeable = element.closest('[data-swipeable]');
    const swipeOverLink = Boolean(
      swipeable && element.closest('a, button, [role="button"]'),
    );
    if (swipeable && !swipeOverLink) {
      setCursorState('swipe');
      setIsInSidepanel(false);
      stopLoopingAnimation();
      return;
    }

    // Check if hovering over work images
    const workImage = element.closest('[data-work-image]');
    if (workImage) {
      setCursorState('work-image');
      setIsInSidepanel(false);
      startLoopingAnimation();
      return;
    }

    // Check if hovering over the SVG in header section (not the whole header)
    const headerSvg = element.closest('[data-header-svg="true"]');
    if (headerSvg) {
      setCursorState('header');
      setIsInSidepanel(false);
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
    
    // Check if hovering over sidepanel
    const sidepanel = element.closest('[data-sidepanel]');
    const isInsideSidepanel = !!sidepanel;
    setIsInSidepanel(isInsideSidepanel);
    
    // Check if interactive element is inside sidepanel
    const isInteractiveInSidepanel = interactiveParent ? !!interactiveParent.closest('[data-sidepanel]') : false;
    if (isInteractiveInSidepanel) {
      setIsInSidepanel(true);
    }
    
    // If in sidepanel but not over an interactive element, show sidepanel state
    if (isInsideSidepanel && !interactiveParent) {
      setCursorState('sidepanel');
      stopLoopingAnimation();
      return;
    }
    
    // Use stable reference to prevent flickering during animations
    // If we're still over the same interactive parent, don't update state
    if (interactiveParent) {
      // Check if it's the theme switcher button
      const isThemeSwitcher = 
        interactiveParent.getAttribute('data-slot') === 'theme-toggler-button' ||
        interactiveParent.closest('[data-slot="theme-toggler-button"]') ||
        interactiveParent.closest('button[data-slot="theme-toggler-button"]');
      
      // Check if it's an external link
      const isExternalLink = 
        interactiveParent.tagName === 'A' &&
        (interactiveParent.getAttribute('target') === '_blank' ||
         interactiveParent.getAttribute('href')?.startsWith('http'));
      
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
        } else if (isExternalLink) {
          setCursorState('external-link');
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
            const recheckAbout = recheckElement?.closest('#about');
            setCursorState(recheckAbout ? 'about-paint' : 'default');
            stopLoopingAnimation();
          }
        } else {
          lastDetectedElementRef.current = null;
          const recheckAbout = recheckElement?.closest('#about');
          setCursorState(recheckAbout ? 'about-paint' : 'default');
          stopLoopingAnimation();
        }
        stateChangeTimeoutRef.current = null;
      }, 50);
      return;
    }

    // No interactive parent and we weren't over one before
    const aboutSection = element.closest('#about');
    if (aboutSection) {
      lastDetectedElementRef.current = null;
      setCursorState('about-paint');
      setIsInSidepanel(false);
      stopLoopingAnimation();
      return;
    }

    setCursorState('default');
    setIsInSidepanel(false);
    // Note: isOverAccentBg is already set above, don't reset it here
    stopLoopingAnimation();
  }, [startLoopingAnimation, stopLoopingAnimation]);

  useEffect(() => {
    // Only show cursor on desktop-sized screens
    // Many Windows devices report touch capability after updates but are primarily mouse-driven
    // So we check screen size instead of just touch capability
    const isMobileOrTablet = window.innerWidth < 1024;
    
    // Only disable on small screens (mobile/tablet), not desktop screens with touch capability
    if (isMobileOrTablet) return;

    let hitTestFrame = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      // Skip expensive hit-testing while dragging the case-study carousel
      if (e.buttons === 1) {
        const target = document.elementFromPoint(e.clientX, e.clientY);
        if (target?.closest('[data-swipeable]')) {
          return;
        }
      }

      if (hitTestFrame) {
        cancelAnimationFrame(hitTestFrame);
      }
      hitTestFrame = requestAnimationFrame(() => {
        hitTestFrame = 0;
        checkElementUnderCursor(lastPointerX, lastPointerY);
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setCursorState('default');
      setIsOverAccentBg(false);
      stopLoopingAnimation();
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (hitTestFrame) {
        cancelAnimationFrame(hitTestFrame);
      }
      if (stateChangeTimeoutRef.current) {
        clearTimeout(stateChangeTimeoutRef.current);
      }
      stopLoopingAnimation();
    };
  }, [cursorX, cursorY, checkElementUnderCursor, stopLoopingAnimation]);

  // Start animation when icon becomes visible, stop when it disappears
  useEffect(() => {
    if (cursorState === 'button' || cursorState === 'work-image') {
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

  const size =
    cursorState === 'default'
      ? 64
      : cursorState === 'work-image'
        ? 120
        : cursorState === 'heart'
          ? 48
          : cursorState === 'confetti'
            ? 48
            : cursorState === 'swipe'
              ? 48
              : 36;
  const iconSize = cursorState === 'work-image' ? 40 : 20;
  const showIcon = cursorState === 'button' || cursorState === 'work-image';
  const showExternalLinkIcon = cursorState === 'external-link';
  const showHeart = cursorState === 'heart';
  const showConfetti = cursorState === 'confetti';
  const showSwipe = cursorState === 'swipe';
  const showMarker = cursorState === 'about-paint';
  const isRing = cursorState === 'ring';
  const isSidepanelState = cursorState === 'sidepanel';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={cursorRef}
          className="fixed pointer-events-none z-[9999]"
          style={{
            x: showMarker ? cursorX : x,
            y: showMarker ? cursorY : y,
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
          {showMarker ? (
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              aria-hidden
              className="overflow-visible"
            >
              <g transform="translate(40 40) rotate(-38)">
                <rect x="-5.5" y="-36" width="11" height="22" rx="2.2" fill="#f7f7f5" stroke="#222222" strokeWidth="1.4" />
                <rect x="-5.5" y="-16.5" width="11" height="5" fill="#2F6CFF" />
                <polygon points="-5.5,-11.5 5.5,-11.5 0,0" fill="#2F6CFF" />
              </g>
            </svg>
          ) : (
          <motion.div
            className="rounded-full flex items-center justify-center"
            style={{
              width: size,
              height: size,
              backgroundColor: isRing ? 'transparent' : (isSidepanelState || isInSidepanel || isOverAccentBg) ? '#222222' : 'var(--accent-tertiary)',
              border: isRing ? `2px solid ${(isSidepanelState || isInSidepanel || isOverAccentBg) ? '#222222' : 'var(--accent-tertiary)'}` : 'none',
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
                style={{ color: (isSidepanelState || isInSidepanel || isOverAccentBg) ? 'var(--accent-tertiary)' : '#222222' }}
              >
                <CornerDownLeftIcon
                  ref={iconRef}
                  size={iconSize}
                />
              </motion.div>
            )}
            {showHeart && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
                style={{ 
                  color: (isSidepanelState || isInSidepanel || isOverAccentBg) ? 'var(--accent-tertiary)' : '#222222',
                  fontSize: '24px',
                  lineHeight: '1'
                }}
              >
                ❤️
              </motion.div>
            )}
            {showExternalLinkIcon && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
                style={{ color: (isSidepanelState || isInSidepanel || isOverAccentBg) ? 'var(--accent-tertiary)' : '#222222' }}
              >
                <SquareArrowOutUpRight
                  size={iconSize}
                />
              </motion.div>
            )}
            {showConfetti && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
                style={{ 
                  color: (isSidepanelState || isInSidepanel || isOverAccentBg) ? 'var(--accent-tertiary)' : '#222222',
                  fontSize: '24px',
                  lineHeight: '1'
                }}
              >
                🎉
              </motion.div>
            )}
            {showSwipe && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
                style={{ color: (isSidepanelState || isInSidepanel || isOverAccentBg) ? 'var(--accent-tertiary)' : '#222222' }}
              >
                <motion.div
                  animate={{ x: [0, 3, -3, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <MoveHorizontal size={iconSize} />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
