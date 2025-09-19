'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function AssistantSection() {
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
        threshold: 0.1, // Trigger when 30% of the section is visible
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
      className="w-full flex items-center justify-center py-16 overflow-hidden"
    >
      <div className="w-full max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 2xl:gap-12">
          {/* Text Section - Full width */}
          <div className="w-full flex justify-center 2xl:justify-start relative z-10">
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
          Thomas helped define chat experiences across Sitecore, starting with <span className='underline'><a href="#">Brand Assistant</a></span> ↓</h2>
          </div>

          {/* Image Section - Full width with proper aspect ratio */}
          <div className="w-full">
            <div 
              className="w-full relative max-w-full rounded-2xl overflow-hidden"
              style={{ aspectRatio: '389 / 218' }}
            >
              <Image 
                src="/images/assistant-thumbnail.jpg" 
                alt="Brand Assistant" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
