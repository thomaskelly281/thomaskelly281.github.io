'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Observe visibility for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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



  // Tilt logic handlers per card
  const createTiltHandlers = (card: HTMLDivElement) => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateMax = 10; // deg
      const rotateY = ((x - centerX) / centerX) * rotateMax; // left/right
      const rotateX = -((y - centerY) / centerY) * rotateMax; // up/down
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    };

    return { handleMouseMove, handleMouseLeave };
  };

  // Attach listeners after mount
  useEffect(() => {
    const nodes = sectionRef.current?.querySelectorAll<HTMLDivElement>('[data-tilt-card]');
    if (!nodes || nodes.length === 0) return;
    const cleanups: Array<() => void> = [];
    nodes.forEach((node) => {
      const { handleMouseLeave, handleMouseMove } = createTiltHandlers(node);
      node.addEventListener('mousemove', handleMouseMove);
      node.addEventListener('mouseleave', handleMouseLeave);
      cleanups.push(() => {
        node.removeEventListener('mousemove', handleMouseMove);
        node.removeEventListener('mouseleave', handleMouseLeave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [isVisible]);

  return (
    <div ref={sectionRef} className="w-full flex items-center justify-center py-16 overflow-visible" style={{ minHeight: '60vh' }}>
      <div className="w-full max-w-full px-4 sm:px-6 lg:px-8">
        <div className="relative w-full">
          {/* Text Section - Centered */}
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
                Multiple colleagues describe Thomas in a positive light... 
              </h2>
            </div>
          </div>
          
          {/* Floating Cards */}
          {/* Top-left card */}
          <div
            data-tilt-card
            className={`absolute w-80 rounded-xl bg-gray-100 p-6 transition-transform duration-200 will-change-transform ${
              isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transformStyle: 'preserve-3d',
              top: 230,
              left: 170,
              transitionDelay: '200ms'
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-gray-300" />
              <div className="text-sm text-gray-600 truncate tracking-[0.025em]">
                Petra Chrystomaki - Design Lead, Content Hub
              </div>
            </div>
            <p className="text-gray-800 text-lg font-medium whitespace-pre-line">You are incredible <br />Sometimes</p>
          </div>

          {/* Top-right card */}
          <div
            data-tilt-card
            className={`absolute w-100 rounded-xl bg-gray-100 p-6 transition-transform duration-200 will-change-transform ${
              isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transformStyle: 'preserve-3d',
              top: 140,
              right: 96,
              transitionDelay: '400ms'
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-gray-300" />
              <div className="text-sm text-gray-600 truncate tracking-[0.025em]">Konstantina Diamantopoulou - Design Manager, XM Cloud</div>
            </div>
            <p className="text-gray-800 text-lg font-medium mb-4">Thomas in the future.</p>
            <div className="rounded-lg overflow-hidden bg-gray-200 relative mb-3">
              <Image
                src="/images/iron-man.gif"
                alt="Thomas future"
                width={400}
                height={240}
                className="object-cover select-none pointer-events-none"
                draggable={false}
              />
            </div>
            
          </div>

          {/* Bottom-left card */}
          <div
            data-tilt-card
            className={`absolute w-120 rounded-xl bg-gray-100 p-6 transition-transform duration-200 will-change-transform ${
              isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transformStyle: 'preserve-3d',
              bottom: 220,
              left: 80,
              transitionDelay: '600ms'
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-gray-300" />
              <div className="text-sm text-gray-600 truncate tracking-[0.025em]">Mo Cherif - VP, AI & Innovation</div>
            </div>
            <p className="text-gray-800 text-lg font-medium">
              Your [Thomas] flexibility, agility, and creativity never cease to amaze me, especially your ability to deeply focus on the user journey. Looking forward to all the new and upcoming great stuff ;)
            </p>
          </div>

          {/* Bottom-right card */}
          <div
            data-tilt-card
            className={`absolute rounded-xl bg-gray-100 p-6 transition-transform duration-200 will-change-transform ${
              isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              transformStyle: 'preserve-3d',
              right: -50,
              bottom: 145,
              width: 'min(48rem, 65vw)',
              transitionDelay: '800ms'
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-gray-300" />
              <div className="text-sm text-gray-600 truncate tracking-[0.025em]">Rob Coyle - Director, Product Design</div>
            </div>
            <p className="text-gray-800 text-lg font-medium">
              True story. The first time I heard of Thomas was via his project posters and the NCAD final year exhibition. He had built a camera based AI app that helped people improve their public speaking &quot;Actually&quot; built it. It looked clean and simple to use. It stood out. I thought &quot;we should talk to him - this kid&#39;s got depth&quot;. A year later we still haven&#39;t found the bottom.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
