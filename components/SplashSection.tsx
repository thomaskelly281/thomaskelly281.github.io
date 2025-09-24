'use client';

import { useState, useEffect, useRef } from 'react';
import AnimatedCards from './AnimatedCards';

export default function SplashSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px 0px -100px 0px' // Start animation slightly before fully in view
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress based on how much of the section has scrolled past the top
      // 0 = section is fully in view at the top
      // 1 = section has completely scrolled past
      const sectionTop = rect.top;
      
      // Only start animation when section starts leaving the top of viewport
      let progress = 0;
      if (sectionTop < 0) {
        // Section is scrolling out of view - calculate progress
        progress = Math.min(1, Math.abs(sectionTop) / windowHeight);
      }

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Compute fade and horizontal motion as user scrolls to next section
  const textOpacity = isVisible ? Math.max(0, Math.min(1, 1 - scrollProgress * 1.2)) : 0;
  const textTranslateX = isVisible ? -scrollProgress * 300 : 0; // move left
  const cardsOpacity = isVisible ? Math.max(0, Math.min(1, 1 - scrollProgress * 1.2)) : 0;
  const cardsTranslateX = isVisible ? scrollProgress * 300 : 0; // move right

  return (
    <div 
      ref={sectionRef}
      className="w-full min-h-full flex items-center justify-center py-16"
    >
      <div className="w-full">
        <div className="flex flex-col 2xl:flex-row items-center gap-8 2xl:gap-12">
          {/* Text Section - 75% on desktop, full width on mobile */}
          <div className="w-full 2xl:w-3/4 flex justify-center 2xl:justify-start relative z-10">
            <div className="flex flex-col">
              <h1 
                className={`text-4xl font-medium text-black leading-[1.5] transition-all duration-1000 ease-out ${
                  isVisible 
                    ? 'translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  opacity: isVisible ? textOpacity : 0,
                  transform: isVisible 
                    ? `translateY(0px) translateX(${textTranslateX}px)` 
                    : 'translateY(32px) translateX(0px)',
                  transition: isVisible 
                    ? 'opacity 0.3s ease-out, transform 0.3s ease-out'
                    : 'opacity 1s ease-out, transform 1s ease-out'
                }}
              >
              Thomas Kelly is a product designer <span className="font-semibold">@</span> Sitecore</h1>
              <p 
                className={`text-lg text-gray-600 mt-4 transition-all duration-1000 ease-out ${
                  isVisible 
                    ? 'translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  opacity: isVisible ? textOpacity : 0,
                  transform: isVisible 
                    ? `translateY(0px) translateX(${textTranslateX}px)` 
                    : 'translateY(32px) translateX(0px)',
                  transition: isVisible 
                    ? 'opacity 0.3s ease-out, transform 0.3s ease-out'
                    : 'opacity 1s ease-out, transform 1s ease-out'
                }}
              >
                He works on AI solutions, innovation labs and design system
              </p>
            </div>
          </div>
          
          {/* Animated Cards Section - 25% on desktop, full width on mobile */}
          <div 
            className="w-full 2xl:w-1/4 flex justify-end 2xl:justify-end"
            style={{
              opacity: isVisible ? cardsOpacity : 0,
              transform: isVisible 
                ? `translateX(${cardsTranslateX}px)` 
                : 'translateX(0px)',
              transition: isVisible 
                ? 'opacity 0.3s ease-out, transform 0.3s ease-out'
                : 'opacity 1s ease-out, transform 1s ease-out'
            }}
          >
            <AnimatedCards />
          </div>
        </div>
      </div>
    </div>
  );
}
