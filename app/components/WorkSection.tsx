'use client';

import { forwardRef, useRef, useEffect } from 'react';
import { useGSAP } from '../contexts/GSAPContext';

// Stock images from Unsplash - same as header
const WORK_IMAGES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&h=750&fit=crop', // Project 1
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop', // Project 2
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=450&fit=crop', // Project 3
];

export const WorkSection = forwardRef<HTMLElement>((props, ref) => {
  const { gsap, ScrollTrigger } = useGSAP();
  const internalRef = useRef<HTMLElement>(null);
  const sectionRef = (ref as React.RefObject<HTMLElement>) || internalRef;
  const project1Ref = useRef<HTMLDivElement>(null);
  const project2Ref = useRef<HTMLDivElement>(null);
  const project3Ref = useRef<HTMLDivElement>(null);

  // Scroll animation for work section entrance
  useEffect(() => {
    if (!gsap || !ScrollTrigger || !sectionRef.current) return;

    const element = sectionRef.current;
    const project1 = project1Ref.current;
    const project2 = project2Ref.current;
    const project3 = project3Ref.current;

    // Set initial states
    if (project1) {
      const image1 = project1.querySelector('[data-project-1-image]');
      const text1 = project1.querySelector('[data-project-1-text]');
      if (image1) gsap.set(image1, { opacity: 0, x: 100, scale: 0.9 });
      if (text1) gsap.set(text1, { opacity: 0, y: 30 });
    }

    if (project2) {
      const image2 = project2.querySelector('[data-project-2-image]');
      const text2 = project2.querySelector('[data-project-2-text]');
      if (image2) gsap.set(image2, { opacity: 0, x: -100, scale: 0.9 });
      if (text2) gsap.set(text2, { opacity: 0, y: 30 });
    }

    if (project3) {
      const image3 = project3.querySelector('[data-project-3-image]');
      const text3 = project3.querySelector('[data-project-3-text]');
      if (image3) gsap.set(image3, { opacity: 0, x: 100, scale: 0.9 });
      if (text3) gsap.set(text3, { opacity: 0, x: -30 });
    }

    // Create timeline for coordinated animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
        once: true,
      },
    });

    // Animate first project (right side, large)
    if (project1) {
      const image1 = project1.querySelector('[data-project-1-image]');
      const text1 = project1.querySelector('[data-project-1-text]');
      
      if (image1) {
        tl.to(
          image1,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
          },
          0
        );
      }
      
      if (text1) {
        tl.to(
          text1,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          0.2
        );
      }
    }

    // Animate second project (left side, medium)
    if (project2) {
      const image2 = project2.querySelector('[data-project-2-image]');
      const text2 = project2.querySelector('[data-project-2-text]');
      
      if (image2) {
        tl.to(
          image2,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
          },
          0.4
        );
      }
      
      if (text2) {
        tl.to(
          text2,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          0.6
        );
      }
    }

    // Animate third project (right side, small)
    if (project3) {
      const image3 = project3.querySelector('[data-project-3-image]');
      const text3 = project3.querySelector('[data-project-3-text]');
      
      if (image3) {
        tl.to(
          image3,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
          },
          0.8
        );
      }
      
      if (text3) {
        tl.to(
          text3,
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          1.0
        );
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [gsap, ScrollTrigger, sectionRef]);

  // Bounce animation for Blok icon with squish effect
  useEffect(() => {
    if (!gsap) return;

    const blokIcon = document.querySelector('[data-blok-icon]');
    if (!blokIcon) return;

    // Create a timeline for bounce with squish on landing
    const bounceTimeline = gsap.timeline({ repeat: -1 });
    
    // Bounce up
    bounceTimeline.to(blokIcon, {
      y: -8,
      scaleY: 1.1,
      scaleX: 0.95,
      duration: 0.3,
      ease: 'power2.out',
    });
    
    // Bounce down with squish
    bounceTimeline.to(blokIcon, {
      y: 0,
      scaleY: 0.9,
      scaleX: 1.05,
      duration: 0.3,
      ease: 'power2.in',
    });
    
    // Return to normal
    bounceTimeline.to(blokIcon, {
      scaleY: 1,
      scaleX: 1,
      duration: 0.1,
      ease: 'power2.out',
    });

    return () => {
      bounceTimeline.kill();
    };
  }, [gsap]);

  // Twirl animation for Star icon (y-axis rotation - pirouette)
  useEffect(() => {
    if (!gsap) return;

    const starIcon = document.querySelector('[data-star-icon]');
    if (!starIcon) return;

    // Create a continuous y-axis rotation animation with pirouette effect
    const twirlAnimation = gsap.to(starIcon, {
      rotationY: 360,
      duration: 2.5,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
    });

    return () => {
      twirlAnimation.kill();
    };
  }, [gsap]);


  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center bg-background overflow-hidden"
    >
      <div className="max-w-[95vw] mx-auto w-full py-20">
        <div className="relative w-full space-y-[32rem]">
          {/* Project 1 - Large, Right Side */}
          <div ref={project1Ref} className="relative w-full flex justify-end">
            <div className="flex flex-col items-end w-full max-w-[90vw]">
              <div
                data-project-1-image
                data-work-image
                className="relative w-full max-w-[1000px] aspect-[4/3] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-6 cursor-pointer"
              >
                <img
                  src={WORK_IMAGES[0]}
                  alt="Blok Design System"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative w-full max-w-[1000px]">
                <img
                  data-blok-icon
                  src="/SVGs/blok.svg"
                  alt="Blok icon"
                  className="absolute"
                  style={{ left: '-64px', top: '5px' }}
                  width={42}
                  height={32}
                />
                <div data-project-1-text className="text-left">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary mb-2">
                    Blok
                  </h3>
                  <p className="text-lg sm:text-xl font-[family-name:var(--font-sfpro)] text-text-secondary opacity-70">
                    Design system
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Project 2 - Medium, Left Side */}
          <div ref={project2Ref} className="relative w-full flex justify-start">
            <div className="flex flex-row items-center gap-6 w-full max-w-[85vw]">
              <div
                data-project-2-image
                data-work-image
                className="relative w-full max-w-[800px] aspect-[4/3] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
              >
                <img
                  src={WORK_IMAGES[1]}
                  alt="Agentic Studio"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative flex-shrink-0">
                <img
                  data-star-icon
                  src="/SVGs/star.svg"
                  alt="Star icon"
                  className="absolute"
                  style={{ right: '-72px', top: '-6px', transformStyle: 'preserve-3d' }}
                  width={56}
                  height={56}
                />
                <div data-project-2-text className="text-left">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary mb-2">
                    Agentic Studio
                  </h3>
                  <p className="text-lg sm:text-xl font-[family-name:var(--font-sfpro)] text-text-secondary opacity-70">
                    AI agents
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Project 3 - Small, Right Side */}
          <div ref={project3Ref} className="relative w-full flex justify-end">
            <div className="flex flex-row items-center gap-6 w-full max-w-[50vw] ml-auto">
              <div data-project-3-text className="text-right flex-shrink-0">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary mb-2">
                  Agentic Studio
                </h3>
                <p className="text-lg sm:text-xl font-[family-name:var(--font-sfpro)] text-text-secondary opacity-70">
                  AI agents
                </p>
              </div>
              <div
                data-project-3-image
                data-work-image
                className="relative w-full max-w-[900px] aspect-[4/3] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
              >
                <img
                  src={WORK_IMAGES[2]}
                  alt="Agentic Studio"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

WorkSection.displayName = 'WorkSection';
