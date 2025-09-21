'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cardVisibility, setCardVisibility] = useState({
    topLeft: false,
    topRight: false,
    bottomLeft: false,
    bottomRight: false
  });

  // Observe visibility for heading animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Trigger cascade effect with staggered delays
          setTimeout(() => setCardVisibility(prev => ({ ...prev, topLeft: true })), 200);
          setTimeout(() => setCardVisibility(prev => ({ ...prev, topRight: true })), 400);
          setTimeout(() => setCardVisibility(prev => ({ ...prev, bottomLeft: true })), 600);
          setTimeout(() => setCardVisibility(prev => ({ ...prev, bottomRight: true })), 800);
        } else {
          // Reverse animation when scrolling away
          setIsVisible(false);
          setCardVisibility({
            topLeft: false,
            topRight: false,
            bottomLeft: false,
            bottomRight: false
          });
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
                Multiple colleagues describe Thomas in a positive light...💡
              </h2>
            </div>
          </div>
          
          {/* Floating Cards */}
          <div className="xl:contents flex flex-col md:grid md:grid-cols-2 gap-6 mt-6 xl:mt-0">
          {/* Top-left card */}
           <div
            className={`w-full xl:w-80 rounded-xl bg-gray-100 p-6 xl:absolute transition-all duration-500 ease-out ${
               cardVisibility.topLeft ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
             }`}
             style={{ 
               top: 230,
               left: 170
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
            className={`w-full xl:w-[25rem] rounded-xl bg-gray-100 p-6 xl:absolute transition-all duration-500 ease-out ${
               cardVisibility.topRight ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
             }`}
             style={{ 
               top: 140,
               right: 96
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
            className={`w-full xl:w-[30rem] rounded-xl bg-gray-100 p-6 xl:absolute transition-all duration-500 ease-out ${
               cardVisibility.bottomLeft ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
             }`}
             style={{ 
               bottom: 220,
               left: 80
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
            className={`w-full xl:absolute rounded-xl bg-gray-100 p-6 transition-all duration-500 ease-out ${
               cardVisibility.bottomRight ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
             }`}
             style={{ 
               right: -50,
               bottom: 145,
               width: 'min(48rem, 65vw)'
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
    </div>
  );
}
