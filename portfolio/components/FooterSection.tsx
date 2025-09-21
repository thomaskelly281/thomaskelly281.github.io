'use client';

import { useEffect, useRef, useState } from 'react';

export default function FooterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div ref={sectionRef} className="w-full flex items-center justify-center py-16 overflow-visible" style={{ minHeight: '40vh' }}>
      <div className="w-full max-w-full px-4 sm:px-6 lg:px-8">
        <div className="relative w-full">
          <div className="w-full flex justify-center 2xl:justify-start relative z-10">
            <div className="w-full 2xl:w-3/4">
              <h2
                className={`text-4xl font-medium text-black leading-[1.5] transition-all duration-1000 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  fontFamily:
                    'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
              >
              Thanks for stopping by. If you want to learn more about Thomas, check out <span className='underline'><a href="#">his CV/Resume</a></span>, or <span className='underline'><a href="#">reach out</a></span></h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


