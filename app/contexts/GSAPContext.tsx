'use client';

import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
}

interface GSAPContextType {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  ScrollSmoother: typeof ScrollSmoother;
  ScrollToPlugin: typeof ScrollToPlugin;
  smoother: ScrollSmoother | null;
}

const GSAPContext = createContext<GSAPContextType | null>(null);

interface GSAPProviderProps {
  children: ReactNode;
  /**
   * ScrollSmoother configuration options
   * @default { smooth: 1, effects: true, smoothTouch: 0.1 }
   */
  scrollSmootherConfig?: {
    smooth?: number;
    effects?: boolean;
    smoothTouch?: number;
    wrapper?: string;
    content?: string;
  };
}

/**
 * GSAP Context Provider
 * Provides GSAP instance and plugins to all child components
 * Handles proper cleanup and responsive animations
 * Initializes ScrollSmoother for smooth scrolling
 */
export function GSAPProvider({ 
  children, 
  scrollSmootherConfig = {
    smooth: 1,
    effects: true,
    smoothTouch: 0.1,
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
  }
}: GSAPProviderProps) {
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const contextValue = useRef<GSAPContextType>({
    gsap,
    ScrollTrigger,
    ScrollSmoother,
    ScrollToPlugin,
    smoother: null,
  });

  useEffect(() => {
    // Set default GSAP settings for better performance
    gsap.config({
      nullTargetWarn: false,
    });

    // Initialize ScrollSmoother
    const initScrollSmoother = () => {
      const wrapper = document.querySelector(scrollSmootherConfig.wrapper || '#smooth-wrapper');
      const content = document.querySelector(scrollSmootherConfig.content || '#smooth-content');
      
      if (!wrapper || !content) {
        console.warn('ScrollSmoother: Wrapper or content element not found. Make sure you have #smooth-wrapper and #smooth-content in your layout.');
        return;
      }

      try {
        const smoother = ScrollSmoother.create({
          wrapper: scrollSmootherConfig.wrapper || '#smooth-wrapper',
          content: scrollSmootherConfig.content || '#smooth-content',
          smooth: scrollSmootherConfig.smooth ?? 1,
          effects: scrollSmootherConfig.effects ?? true,
          smoothTouch: scrollSmootherConfig.smoothTouch ?? 0.1,
          ignoreMobileResize: true,
        });

        smootherRef.current = smoother;
        contextValue.current.smoother = smoother;
      } catch (error) {
        console.error('Failed to initialize ScrollSmoother:', error);
      }
    };

    // Wait for DOM to be ready
    if (typeof window !== 'undefined') {
      // Small delay to ensure DOM is fully ready
      const timer = setTimeout(() => {
        initScrollSmoother();
      }, 100);

      // Refresh ScrollTrigger on resize for responsive layouts
      const handleResize = () => {
        ScrollTrigger.refresh();
        if (smootherRef.current) {
          smootherRef.current.refresh();
        }
      };

      window.addEventListener('resize', handleResize);
      
      // Initial refresh
      ScrollTrigger.refresh();

      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
        
        // Cleanup ScrollSmoother
        if (smootherRef.current) {
          smootherRef.current.kill();
          smootherRef.current = null;
          contextValue.current.smoother = null;
        }
        
        // Cleanup all ScrollTrigger instances
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [scrollSmootherConfig.wrapper, scrollSmootherConfig.content, scrollSmootherConfig.smooth, scrollSmootherConfig.effects, scrollSmootherConfig.smoothTouch]);

  return (
    <GSAPContext.Provider value={contextValue.current}>
      {children}
    </GSAPContext.Provider>
  );
}

/**
 * Hook to access GSAP context
 * @returns GSAP instance and plugins
 */
export function useGSAP() {
  const context = useContext(GSAPContext);
  if (!context) {
    throw new Error('useGSAP must be used within a GSAPProvider');
  }
  return context;
}
