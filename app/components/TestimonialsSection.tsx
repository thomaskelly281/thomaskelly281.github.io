'use client';

import { forwardRef, useRef, useEffect } from 'react';
import { useGSAP } from '../contexts/GSAPContext';
import Image from 'next/image';

// Sample testimonial data - you can customize this
const TESTIMONIALS = [
  {
    id: 1,
    quote: "True story. The first time I heard of Thomas was via his project posters and the NCAD final year exhibition. He had built a camera based AI app that helped people improve their public speaking; ‘Actually’ built it. It looked clean and simple to use. It stood out. I thought ‘we should talk to him - this kid's got depth’. A year later we still haven't found the bottom.",
    author: "Rob Coyle,",
    role: "Head of Product",
    company: "Finch"
  },
  {
    id: 2,
    quote: "Your [Thomas] flexibility, agility, and creativity never cease to amaze me, especially your ability to deeply focus on the user journey. Looking forward to all the new and upcoming great stuff ;)",
    author: "Mo Cherif,",
    role: "VP, AI & Innovation",
    company: "Sitecore"
  },
  {
    id: 3,
    quote: "Thomas in future",
    author: "Konstantina Diamantopoulou,",
    role: "Design Manager",
    company: "Sitecore"
  }
];

export const TestimonialsSection = forwardRef<HTMLElement>((props, ref) => {
  const { gsap, ScrollTrigger } = useGSAP();
  const internalRef = useRef<HTMLElement>(null);
  const sectionRef = (ref as React.RefObject<HTMLElement>) || internalRef;
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteMarkRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gsap || !ScrollTrigger || !sectionRef.current || !containerRef.current) return;

    const text1 = text1Ref.current;
    const text2 = text2Ref.current;
    const text3 = text3Ref.current;

    if (!text1 || !text2 || !text3) return;

    let tl: gsap.core.Timeline | null = null;

    // Wait for next frame to ensure layout is calculated
    const rafId = requestAnimationFrame(() => {
      // Get the height of one text element for proper positioning
      const textHeight = text1.offsetHeight || 300;
      const offset = Math.min(textHeight * 0.5, 150); // Reduced offset - come from closer

      // Set initial states - all texts stacked vertically
      gsap.set(text1, {
        y: 0,
        opacity: 1,
        zIndex: 2, // On top initially
      });

      gsap.set(text2, {
        y: offset, // Start below viewport
        opacity: 0,
        zIndex: 1, // Ensure proper stacking
      });

      gsap.set(text3, {
        y: offset, // Start below viewport
        opacity: 0,
        zIndex: 1, // Ensure proper stacking
      });

      // Create the scroll timeline with distinct phases
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%', // Reduced for quicker animation
          scrub: 1, // Reduced scrub for snappier feel
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1: Text1 visible at start (0 to ~0.2 = hold)
      // Phase 2: Text1 folds up, Text2 unfolds (0.2 to 0.4)
      // Fade out text1 faster so it's invisible before reaching quotation mark
      tl.to(text1, {
        opacity: 0,
        zIndex: 0,
        ease: 'power2.in',
        duration: 0.1, // Fade out quickly in first half
      }, 0.2)
      .to(text1, {
        y: -offset,
        ease: 'power2.inOut',
        duration: 0.2, // Then continue moving up while invisible
      }, 0.2)
      .to(text2, {
        y: 0,
        opacity: 1,
        zIndex: 2,
        ease: 'power2.inOut',
      }, 0.2)
      // Phase 3: Text2 stays in place (0.4 to 0.6 = resistance/hold)
      .to({}, { duration: 0.2 }, 0.4) // Empty tween for pause
      // Phase 4: Text2 folds up, Text3 unfolds (0.6 to 0.8)
      // Fade out text2 faster so it's invisible before reaching quotation mark
      .to(text2, {
        opacity: 0,
        zIndex: 0,
        ease: 'power2.in',
        duration: 0.1, // Fade out quickly in first half
      }, 0.6)
      .to(text2, {
        y: -offset,
        ease: 'power2.inOut',
        duration: 0.2, // Then continue moving up while invisible
      }, 0.6)
      .to(text3, {
        y: 0,
        opacity: 1,
        zIndex: 2,
        ease: 'power2.inOut',
      }, 0.6)
      // Phase 5: Text3 stays in place (0.8 to 1.0 = final hold, then unpins)
      .to({}, { duration: 0.2 }, 0.8); // Empty tween for final pause
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (tl) {
        tl.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [gsap, ScrollTrigger, sectionRef]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full h-[100dvh] flex items-center justify-center bg-background"
    >
      <div
        ref={containerRef}
        className="relative w-full max-w-4xl mx-auto px-4 flex flex-col items-start justify-center"
      >
        {/* Fixed Quotation Mark */}
        <div
          ref={quoteMarkRef}
          className="mb-8"
        >
          <Image
            src="/SVGs/quotationMark.svg"
            alt="Quotation mark"
            width={70}
            height={61}
            className="w-12 h-auto md:w-16"
          />
        </div>

        {/* Testimonial Texts Container */}
        <div className="relative w-full max-w-2xl" style={{ minHeight: '400px' }}>
          {/* Spacer to maintain container height */}
          <div className="invisible">
            <blockquote className="text-lg md:text-xl lg:text-2xl text-text-secondary mb-6">
              {TESTIMONIALS[2].quote}
            </blockquote>
            <div className="mb-6">
              <Image
                src="/GIFs/iron-man.gif"
                alt="Iron Man"
                width={400}
                height={400}
                className="w-full max-w-md h-auto"
                unoptimized
              />
            </div>
            <div>
              <p className="font-medium text-text-secondary font-[family-name:var(--font-ppvalve)]">{TESTIMONIALS[2].author}</p>
              <p className="text-text-secondary font-[family-name:var(--font-ppvalve)]">
                {TESTIMONIALS[2].role} at {TESTIMONIALS[2].company}
              </p>
            </div>
          </div>
          
          {/* Text 1 */}
          <div
            ref={text1Ref}
            className="absolute top-0 left-0 w-full"
            style={{ 
              willChange: 'transform, opacity',
              opacity: 1,
              transform: 'translateY(0)',
              zIndex: 2
            }}
          >
            <blockquote className="text-lg md:text-xl lg:text-2xl text-text-secondary mb-6">
              {TESTIMONIALS[0].quote}
            </blockquote>
            <div>
              <p className="font-medium text-text-secondary font-[family-name:var(--font-ppvalve)]">{TESTIMONIALS[0].author}</p>
              <p className="text-text-secondary font-[family-name:var(--font-ppvalve)]">
                {TESTIMONIALS[0].role} at {TESTIMONIALS[0].company}
              </p>
            </div>
          </div>

          {/* Text 2 */}
          <div
            ref={text2Ref}
            className="absolute top-0 left-0 w-full"
            style={{ 
              willChange: 'transform, opacity', 
              pointerEvents: 'none',
              zIndex: 1,
              opacity: 0
            }}
          >
            <blockquote className="text-lg md:text-xl lg:text-2xl text-text-secondary mb-6">
              {TESTIMONIALS[1].quote}
            </blockquote>
            <div>
              <p className="font-medium text-text-secondary font-[family-name:var(--font-ppvalve)]">{TESTIMONIALS[1].author}</p>
              <p className="text-text-secondary font-[family-name:var(--font-ppvalve)]">
                {TESTIMONIALS[1].role} at {TESTIMONIALS[1].company}
              </p>
            </div>
          </div>

          {/* Text 3 */}
          <div
            ref={text3Ref}
            className="absolute top-0 left-0 w-full"
            style={{ 
              willChange: 'transform, opacity', 
              pointerEvents: 'none',
              zIndex: 1,
              opacity: 0
            }}
          >
            <blockquote className="text-lg md:text-xl lg:text-2xl text-text-secondary mb-6">
              {TESTIMONIALS[2].quote}
            </blockquote>
            <div className="mb-6">
              <Image
                src="/GIFs/iron-man.gif"
                alt="Iron Man"
                width={500}
                height={500}
                className="w-full max-w-md h-auto"
                unoptimized
              />
            </div>
            <div>
              <p className="font-medium text-text-secondary font-[family-name:var(--font-ppvalve)]">{TESTIMONIALS[2].author}</p>
              <p className="text-text-secondary font-[family-name:var(--font-ppvalve)]">
                {TESTIMONIALS[2].role} at {TESTIMONIALS[2].company}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';
