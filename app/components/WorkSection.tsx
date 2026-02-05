'use client';

import { forwardRef, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useGSAP } from '../contexts/GSAPContext';

// Stock images from Unsplash - same as header
const WORK_IMAGES = [
  '/thumbs/blokthumb.webp', // Project 1 - Blok
  '/thumbs/agenticthumb.webp', // Project 2 - Agentic Studio
  '/thumbs/bathumb.webp', // Project 3 - Brand Assistant
];

export const WorkSection = forwardRef<HTMLElement>((props, ref) => {
  const { gsap, ScrollTrigger } = useGSAP();
  const internalRef = useRef<HTMLElement>(null);
  const sectionRef = (ref as React.RefObject<HTMLElement>) || internalRef;
  const project1Ref = useRef<HTMLDivElement>(null);
  const project2Ref = useRef<HTMLDivElement>(null);
  // const project3Ref = useRef<HTMLDivElement>(null);

  // Scroll animation for work section - individual animations for each image and title
  useEffect(() => {
    if (!gsap || !ScrollTrigger || !sectionRef.current) return;

    const project1 = project1Ref.current;
    const project2 = project2Ref.current;
    // const project3 = project3Ref.current;

    const triggers: ScrollTrigger[] = [];

    // Project 1 - Image animation
    if (project1) {
      const image1 = project1.querySelector('[data-project-1-image]');
      const text1 = project1.querySelector('[data-project-1-text]');
      
      if (image1) {
        gsap.set(image1, { opacity: 0, y: 30 });
        const imageAnimation = gsap.fromTo(
          image1,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: 'power3.out',
          }
        );
        
        const imageTrigger = ScrollTrigger.create({
          trigger: image1,
          start: 'top 85%',
          end: 'top 20%',
          animation: imageAnimation,
          scrub: 1,
        });
        triggers.push(imageTrigger);
      }
      
      if (text1) {
        gsap.set(text1, { opacity: 0, y: 30 });
        const textAnimation = gsap.fromTo(
          text1,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
          }
        );
        
        const textTrigger = ScrollTrigger.create({
          trigger: text1,
          start: 'top 85%',
          end: 'top 20%',
          animation: textAnimation,
          scrub: 1,
        });
        triggers.push(textTrigger);
      }
    }

    // Project 2 - Image animation
    if (project2) {
      const image2 = project2.querySelector('[data-project-2-image]');
      const text2 = project2.querySelector('[data-project-2-text]');
      
      if (image2) {
        gsap.set(image2, { opacity: 0, y: 30 });
        const imageAnimation = gsap.fromTo(
          image2,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: 'power3.out',
          }
        );
        
        const imageTrigger = ScrollTrigger.create({
          trigger: image2,
          start: 'top 85%',
          end: 'top 20%',
          animation: imageAnimation,
          scrub: 1,
        });
        triggers.push(imageTrigger);
      }
      
      if (text2) {
        gsap.set(text2, { opacity: 0, y: 30 });
        const textAnimation = gsap.fromTo(
          text2,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
          }
        );
        
        const textTrigger = ScrollTrigger.create({
          trigger: text2,
          start: 'top 85%',
          end: 'top 20%',
          animation: textAnimation,
          scrub: 1,
        });
        triggers.push(textTrigger);
      }
    }

    // Project 3 - Image animation
    // if (project3) {
    //   const image3 = project3.querySelector('[data-project-3-image]');
    //   const text3 = project3.querySelector('[data-project-3-text]');
    //   
    //   if (image3) {
    //     gsap.set(image3, { opacity: 0, y: 30 });
    //     const imageAnimation = gsap.fromTo(
    //       image3,
    //       { opacity: 0, y: 30 },
    //       {
    //         opacity: 1,
    //         y: 0,
    //         ease: 'power3.out',
    //       }
    //     );
    //     
    //     const imageTrigger = ScrollTrigger.create({
    //       trigger: image3,
    //       start: 'top 85%',
    //       end: 'top 20%',
    //       animation: imageAnimation,
    //       scrub: 1,
    //     });
    //     triggers.push(imageTrigger);
    //   }
    //   
    //   if (text3) {
    //     gsap.set(text3, { opacity: 0, y: 30 });
    //     const textAnimation = gsap.fromTo(
    //       text3,
    //       { opacity: 0, y: 30 },
    //       {
    //         opacity: 1,
    //         y: 0,
    //         ease: 'power2.out',
    //       }
    //     );
    //     
    //     const textTrigger = ScrollTrigger.create({
    //       trigger: text3,
    //       start: 'top 85%',
    //       end: 'top 20%',
    //       animation: textAnimation,
    //       scrub: 1,
    //     });
    //     triggers.push(textTrigger);
    //   }
    // }

    // Refresh ScrollTrigger to ensure proper initial states
    ScrollTrigger.refresh();

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, [gsap, ScrollTrigger, sectionRef]);

  // Bounce animation for Blok icon with squish effect
  useEffect(() => {
    if (!gsap) return;

    const animations: gsap.core.Timeline[] = [];
    let timeoutId: NodeJS.Timeout | null = null;

    // Wait for elements to be available
    const initAnimation = () => {
      const blokIcons = document.querySelectorAll('[data-blok-icon]');
      if (blokIcons.length === 0) {
        timeoutId = setTimeout(initAnimation, 100);
        return;
      }

      // Animate all Blok icons (mobile and desktop)
      blokIcons.forEach((blokIcon) => {
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

        animations.push(bounceTimeline);
      });
    };

    initAnimation();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      animations.forEach(anim => anim.kill());
    };
  }, [gsap]);

  // Twirl animation for Star icon (y-axis rotation - pirouette)
  useEffect(() => {
    if (!gsap) return;

    const animations: gsap.core.Tween[] = [];
    let timeoutId: NodeJS.Timeout | null = null;

    // Wait for elements to be available
    const initAnimation = () => {
      const starIcons = document.querySelectorAll('[data-star-icon]');
      if (starIcons.length === 0) {
        timeoutId = setTimeout(initAnimation, 100);
        return;
      }

      // Animate all Star icons (mobile and desktop)
      starIcons.forEach((starIcon) => {
        // Create a continuous y-axis rotation animation with pirouette effect
        const twirlAnimation = gsap.to(starIcon, {
          rotationY: 360,
          duration: 2.5,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: -1,
        });

        animations.push(twirlAnimation);
      });
    };

    initAnimation();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      animations.forEach(anim => anim.kill());
    };
  }, [gsap]);


  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center bg-background overflow-hidden"
    >
      <div className="max-w-[95vw] mx-auto w-full py-20">
        <div className="relative w-full space-y-16 sm:space-y-24 md:space-y-32 lg:space-y-[32rem]">
          {/* Project 1 - Large, Right Side */}
          <div ref={project1Ref} className="relative w-full flex justify-center md:justify-end">
            <div className="flex flex-col items-start md:items-end w-full max-w-full md:max-w-[90vw] lg:max-w-none">
              <Link
                href="/blok"
                data-project-1-image
                data-work-image
                className="relative w-[90vw] md:w-full lg:max-w-[45vw] aspect-[4/3] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-4 md:mb-6 cursor-pointer block"
              >
                <img
                  src={WORK_IMAGES[0]}
                  alt="Blok Design System"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </Link>
              <div className="relative w-[90vw] md:w-full lg:max-w-[45vw]">
                {/* Mobile/Tablet: Inline SVG */}
                <div className="flex items-start gap-3 md:hidden">
                  <img
                    data-blok-icon
                    src="/SVGs/blok.svg"
                    alt="Blok icon"
                    className="flex-shrink-0 mt-1"
                    width={42}
                    height={32}
                  />
                  <div data-project-1-text className="text-left flex-1 min-w-0">
                    <h3 className="text-2xl sm:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary mb-2 break-words">
                      Blok
                    </h3>
                    <p className="text-base sm:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary opacity-70 break-words">
                      Design system
                    </p>
                  </div>
                </div>
                {/* Desktop: Absolute positioned SVG */}
                <div className="hidden md:block">
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
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary mb-2">
                      Blok
                    </h3>
                    <p className="text-lg md:text-xl font-[family-name:var(--font-sfpro)] text-text-secondary opacity-70">
                      Design system
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project 2 - Medium, Left Side */}
          <div ref={project2Ref} className="relative w-full flex justify-center md:justify-start">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 w-full max-w-full md:max-w-[85vw]">
              <Link
                href="/agentic-studio"
                data-project-2-image
                data-work-image
                className="relative w-[90vw] md:w-full lg:max-w-[45vw] aspect-[4/3] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer block"
              >
                <img
                  src={WORK_IMAGES[1]}
                  alt="Agentic Studio"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </Link>
              <div className="relative w-[90vw] md:w-auto">
                {/* Mobile/Tablet: Inline SVG */}
                <div className="flex items-start gap-3 md:hidden">
                  <img
                    data-star-icon
                    src="/SVGs/star.svg"
                    alt="Star icon"
                    className="flex-shrink-0 mt-1"
                    style={{ transformStyle: 'preserve-3d' }}
                    width={56}
                    height={56}
                  />
                  <div data-project-2-text className="text-left flex-1 min-w-0">
                    <h3 className="text-2xl sm:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary mb-2 break-words">
                      Agentic Studio
                    </h3>
                    <p className="text-base sm:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary opacity-70 break-words">
                      AI agents
                    </p>
                  </div>
                </div>
                {/* Desktop: Absolute positioned SVG */}
                <div className="hidden md:block">
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
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary mb-2">
                      Agentic Studio
                    </h3>
                    <p className="text-lg md:text-xl font-[family-name:var(--font-sfpro)] text-text-secondary opacity-70">
                      AI agents
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project 3 - Small, Right Side */}
          {/* <div ref={project3Ref} className="relative w-full flex justify-center md:justify-center">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 w-full max-w-full md:max-w-[40vw] md:ml-[20%]">
              <div
                data-project-3-image
                data-work-image
                className="relative w-[80vw] md:w-full lg:max-w-[35vw] aspect-[4/3] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer order-1 md:order-2"
              >
                <img
                  src={WORK_IMAGES[2]}
                  alt="Brand Assistant"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative w-[80vw] md:w-auto flex items-start gap-3 md:gap-4 order-2 md:order-1">
                <div data-project-3-text className="text-left flex-1 min-w-0">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary mb-2 break-words">
                    Brand Assistant
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-sfpro)] text-text-secondary opacity-70 break-words">
                    Brand aware chat
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
});

WorkSection.displayName = 'WorkSection';
