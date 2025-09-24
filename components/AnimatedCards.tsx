'use client';

import { useState, useEffect, useRef } from 'react';

export default function AnimatedCards() {
  const [isVisible, setIsVisible] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

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

    const currentRef = cardsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const cards = [
    { id: 1, title: 'Design', color: 'from-blue-500 to-blue-600', image: '/images/profile-img.jpg' },
    { id: 2, title: 'Build', color: 'from-gray-400 to-gray-400' },
    { id: 3, title: 'Launch', color: 'from-gray-200 to-gray-200' }
  ];

  return (
    <div 
      ref={cardsRef}
      className="relative w-full h-96 sm:h-[28vh] md:h-[33.6vh] lg:h-[56vh] flex items-end justify-center"
      style={{ width: '100%', minWidth: '600px' }}
    >
      <div className="relative flex items-end justify-center cards-container">
        {cards.map((card, index) => {
          const rotations = [0, -10, -20]; // 0deg, -10deg, -20deg
          const zIndex = cards.length - index; // Higher z-index for cards on top
          const translateY = index * 8; // Slight vertical offset for stacking
          
          return (
            <div
              key={card.id}
              className={`absolute animated-card bg-gradient-to-br ${card.color} rounded-xl shadow-xl transition-all duration-1500 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'rotate-90 translate-y-8 opacity-0'
              }`}
              style={{
                width: 'clamp(300px, 18vw, 500px)',
                height: '100%',
                minHeight: 'clamp(600px, 35vh, 800px)',
                transitionDelay: `${index * 300}ms`,
                transform: isVisible 
                  ? `rotate(${rotations[index]}deg) translateY(-${translateY}px)` 
                  : 'rotate(90deg) translateY(32px)',
                zIndex: zIndex,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundImage: card.image ? `url(${card.image})` : undefined
              }}
            >
            </div>
          );
        })}
      </div>
    </div>
  );
}
