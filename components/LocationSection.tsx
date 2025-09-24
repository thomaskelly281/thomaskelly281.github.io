'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function LocationSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [internalProgress, setInternalProgress] = useState(0); // 0 -> 1
  const [targetProgress, setTargetProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const originalBodyOverflowRef = useRef<string | null>(null);
  const progressRef = useRef(0);
  const touchYRef = useRef<number | null>(null);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastScrollYRef = useRef<number>(typeof window !== 'undefined' ? window.scrollY : 0);
  const canPinRef = useRef<boolean>(true);

  // keep ref in sync
  useEffect(() => {
    progressRef.current = internalProgress;
  }, [internalProgress]);

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

  // Detect when section center hits viewport center to engage pinning
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const sectionCenter = rect.top + rect.height / 2;
      const distance = Math.abs(sectionCenter - viewportCenter);

      const threshold = 40; // px window around center
      const releaseThreshold = threshold * 2.5; // hysteresis: must move away more before we allow re-pin

      // Allow pin only when permitted (hysteresis)
      if (!isPinned && canPinRef.current && distance <= threshold && progressRef.current < 1) {
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > lastScrollYRef.current;
        // Start pinning
        originalBodyOverflowRef.current = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        // Initialize direction: if entering while scrolling down, start at 0; if scrolling up, start at 1
        const startProgress = scrollingDown ? 0 : 1;
        setInternalProgress(startProgress);
        setTargetProgress(startProgress);
        progressRef.current = startProgress;
        targetRef.current = startProgress;
        setIsPinned(true);
        lastScrollYRef.current = currentScrollY;
      }

      // Track last scroll for direction detection
      lastScrollYRef.current = window.scrollY;

      // If we've moved far enough from center, re-enable pinning for the next pass
      if (!isPinned && distance > releaseThreshold) {
        canPinRef.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isPinned]);

  // While pinned, consume wheel/touch to drive internal progress and unpin at ends
  useEffect(() => {
    if (!isPinned) return;

    const getRequiredPixels = () => {
      // Amount of wheel delta to fully traverse the internal animation
      if (!sectionRef.current) return window.innerHeight;
      return sectionRef.current.getBoundingClientRect().height; // one viewport worth feels natural
    };

    const unpin = () => {
      setIsPinned(false);
      // restore body overflow
      if (originalBodyOverflowRef.current !== null) {
        document.body.style.overflow = originalBodyOverflowRef.current;
      } else {
        document.body.style.overflow = '';
      }
      // prevent immediate re-pin until user moves past hysteresis distance
      canPinRef.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const required = getRequiredPixels();
      const delta = e.deltaY;
      // Reduce sensitivity for smoother scrolling
      let nextTarget = targetRef.current + (delta / required) * 0.6;
      nextTarget = Math.max(0, Math.min(1, nextTarget));
      setTargetProgress(nextTarget);
      targetRef.current = nextTarget;

      // If finished and user continues in same direction, unpin to resume page scroll
      if ((nextTarget === 1 && delta > 0) || (nextTarget === 0 && delta < 0)) {
        unpin();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchYRef.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchYRef.current == null) return;
      e.preventDefault();
      const currentY = e.touches[0]?.clientY ?? touchYRef.current;
      const delta = touchYRef.current - currentY; // mimic wheel deltaY
      const required = getRequiredPixels();
      // Reduce sensitivity for smoother touch scrolling
      let nextTarget = targetRef.current + (delta / required) * 0.6;
      nextTarget = Math.max(0, Math.min(1, nextTarget));
      setTargetProgress(nextTarget);
      targetRef.current = nextTarget;

      if ((nextTarget === 1 && delta > 0) || (nextTarget === 0 && delta < 0)) {
        unpin();
      }
      touchYRef.current = currentY;
    };

    const onTouchEnd = () => {
      touchYRef.current = null;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isPinned]);

  // Smoothly animate internalProgress toward targetProgress while pinned
  useEffect(() => {
    if (!isPinned) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const tick = () => {
      const current = progressRef.current;
      const target = targetRef.current;
      const diff = target - current;
      if (Math.abs(diff) < 0.001) {
        if (progressRef.current !== target) {
          progressRef.current = target;
          setInternalProgress(target);
        }
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const next = current + diff * 0.08; // easing factor - reduced for smoother animation
      progressRef.current = next;
      setInternalProgress(next);
      rafRef.current = requestAnimationFrame(tick);
    };

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isPinned, targetProgress]);

  // Keep targetRef synced
  useEffect(() => {
    targetRef.current = targetProgress;
  }, [targetProgress]);

  // Background mover translate: from 100% (below) to -150% (above), i.e., travel of 250%
  const bgTranslatePercent = 100 - 250 * internalProgress;

  // Masonry-like image columns (easily replace sources)
  type GridItem = { src: string; height: number };
  const columns: GridItem[][] = [
    [
      { src: '/images/dublin-1.jpeg', height: 400 },
      { src: '/images/dublin-2.jpg', height: 480 },
      { src: '/images/dublin-3.jpg', height: 360 },
      { src: '/images/dublin-4.webp', height: 440 }
    ],
    [
      { src: '/images/dublin-5.webp', height: 360 },
      { src: '/images/dublin-6.jpg', height: 500 },
      { src: '/images/dublin-7.jpg', height: 380 },
      { src: '/images/dublin-8.jpeg', height: 440 }
    ],
    [
      { src: '/images/dublin-9.jpeg', height: 400 },
      { src: '/images/dublin-10.png', height: 420 },
      { src: '/images/dublin-11.png', height: 460 },
      { src: '/images/dublin-12.jpg', height: 380 }
    ],
    [
      { src: '/images/dublin-13.avif', height: 420 },
      { src: '/images/dublin-14.jpg', height: 480 },
      { src: '/images/dublin-15.jpg', height: 400 },
      { src: '/images/dublin-16.jpeg', height: 440 }
    ]
  ];

  return (
    <div 
      ref={sectionRef}
      className="w-full min-h-full flex items-center justify-center py-16 relative overflow-hidden"
    >
      {/* Masonry image background clipped by section */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-0 w-full"
          style={{
            top: 0,
            height: '150%',
            transform: `translateY(${bgTranslatePercent}%)`,
            willChange: 'transform'
          }}
        >
          <div className="mx-auto w-11/12 sm:w-5/6 lg:w-4/5 xl:w-3/4">
            <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 opacity-60">
              {columns.map((col, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-3 sm:gap-4">
                  {col.map((item, idx) => (
                    <div
                      key={idx}
                      className="w-full rounded-xl overflow-hidden bg-gray-200 relative"
                      style={{ height: item.height }}
                    >
                      <Image
                        src={item.src}
                        alt="Dublin"
                        fill
                        className="object-cover select-none pointer-events-none"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
              Based in Dublin
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