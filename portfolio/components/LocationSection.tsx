'use client';

import { useState, useEffect, useRef } from 'react';

export default function LocationSection() {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <div 
      ref={sectionRef}
      className="w-full min-h-full flex items-center justify-center py-16"
    >
      <div className="w-full">
        <div className="flex flex-col 2xl:flex-row items-center gap-8 2xl:gap-12">
          {/* Text Section - 75% on desktop, full width on mobile */}
          <div className="w-full 2xl:w-3/4 flex justify-center 2xl:justify-start relative z-10">
            <h2 
              className={`text-4xl font-medium text-black leading-[1.5] transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              Based in London, working with teams around the world
            </h2>
          </div>
          
          {/* Empty space to match SplashSection layout - 25% on desktop */}
          <div className="w-full 2xl:w-1/4 flex justify-end 2xl:justify-end">
          </div>
        </div>
      </div>
    </div>
  );
}