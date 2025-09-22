'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function AssistantSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        if (entry.isIntersecting || ratio > 0.1) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
        setCtaVisible(entry.isIntersecting && ratio >= 0.80);
      },
      {
        threshold: [0, 0.1, 0.80, 1],
        rootMargin: '0px 0px -100px 0px'
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
              className={`text-4xl font-medium text-black leading-[1.5] transition-all duration-1200 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
          Not to mention, he defined chat experiences across Sitecore, starting with <span className='underline'><a href="/case-studies/assistant">Brand Assistant</a></span> ↓</h2>
          </div>

          {/* Image Section - Full width with proper aspect ratio */}
          <div className="w-full">
            <a 
              href="/case-studies/assistant"
              className="block cursor-pointer hover:opacity-90 transition-opacity duration-300"
            >
              <div 
                className={`w-full relative max-w-full rounded-2xl overflow-hidden transition-all duration-1000 ease-out ${
                  isVisible 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-90 translate-y-16'
                }`}
                style={{ 
                  aspectRatio: '389 / 218',
                  transitionDelay: isVisible ? '200ms' : '0ms'
                }}
              >
                <Image 
                  src="/images/assistant-thumbnail.jpg" 
                  alt="Brand Assistant" 
                  fill
                  className="object-cover"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
      {/* Floating CTA */}
      <a
        href="/case-studies/assistant"
        aria-label="Read Assistant case study"
        className={`fixed left-1/2 -translate-x-1/2 bottom-10 md:bottom-12 z-50 rounded-full bg-[#171717] text-white px-5 sm:px-6 font-medium text-lg py-3 shadow-lg transition-all duration-300 ease-out flex items-center gap-2 tracking-[.03em] ${
          ctaVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <span className="text-sm sm:text-base">Read Assistant case study</span>
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}
