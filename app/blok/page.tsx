'use client';

import { useEffect, useRef } from 'react';
import { useGSAP } from '../contexts/GSAPContext';
import { Footer } from '../components/Footer';

export default function BlokPage() {
  const decisionSectionRef = useRef<HTMLDivElement>(null);
  const decisionCardsRef = useRef<HTMLDivElement>(null);
  const card1ContentRef = useRef<HTMLDivElement>(null);
  const card2ContentRef = useRef<HTMLDivElement>(null);
  const card3ContentRef = useRef<HTMLDivElement>(null);
  const outcomesBgRef = useRef<HTMLDivElement>(null);
  const problemsSectionRef = useRef<HTMLElement>(null);
  const problem1Ref = useRef<HTMLDivElement>(null);
  const problem2Ref = useRef<HTMLDivElement>(null);
  const problem3Ref = useRef<HTMLDivElement>(null);
  const executionSectionRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const execution1Ref = useRef<HTMLDivElement>(null);
  const execution2Ref = useRef<HTMLDivElement>(null);
  const execution3Ref = useRef<HTMLDivElement>(null);
  const execution4Ref = useRef<HTMLDivElement>(null);
  const { gsap, ScrollTrigger } = useGSAP();

  // Outcomes section fill animation
  useEffect(() => {
    if (!ScrollTrigger || !outcomesBgRef.current) return;

    // Outcomes section fill animation
    gsap.fromTo(
      outcomesBgRef.current,
      { scaleX: 0, transformOrigin: 'right center' },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: outcomesBgRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [gsap, ScrollTrigger]);

  // Strategic Decision cards scroll animation (accordion style)
  useEffect(() => {
    if (!gsap || !ScrollTrigger || !decisionCardsRef.current) return;

    const card1Content = card1ContentRef.current;
    const card2Content = card2ContentRef.current;
    const card3Content = card3ContentRef.current;

    if (!card1Content || !card2Content || !card3Content) return;

    let tl: gsap.core.Timeline | null = null;

    const rafId = requestAnimationFrame(() => {
      // Get natural heights
      const card1Height = card1Content.scrollHeight;
      const card2Height = card2Content.scrollHeight;
      const card3Height = card3Content.scrollHeight;

      // Set initial states - Card 1 content open, others closed
      gsap.set(card1Content, {
        height: card1Height,
        overflow: 'hidden',
      });

      gsap.set(card2Content, {
        height: 0,
        overflow: 'hidden',
      });

      gsap.set(card3Content, {
        height: 0,
        overflow: 'hidden',
      });

      // Create scroll timeline
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: decisionCardsRef.current,
          start: 'center center',
          end: '+=150%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1: Card 1 content open (0 to 0.3 = hold)
      // Phase 2: Card 1 closes, Card 2 opens (0.3 to 0.5)
      tl.to(card1Content, {
        height: 0,
        ease: 'power2.inOut',
        duration: 0.2,
      }, 0.3)
      .to(card2Content, {
        height: card2Height,
        ease: 'power2.inOut',
        duration: 0.2,
      }, 0.3)
      // Phase 3: Card 2 stays open (0.5 to 0.7 = hold)
      .to({}, { duration: 0.2 }, 0.5)
      // Phase 4: Card 2 closes, Card 3 opens (0.7 to 0.9)
      .to(card2Content, {
        height: 0,
        ease: 'power2.inOut',
        duration: 0.2,
      }, 0.7)
      .to(card3Content, {
        height: card3Height,
        ease: 'power2.inOut',
        duration: 0.2,
      }, 0.7)
      // Phase 5: Card 3 stays open (0.9 to 1.0 = final hold)
      .to({}, { duration: 0.1 }, 0.9);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (tl) {
        tl.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === decisionCardsRef.current) {
          trigger.kill();
        }
      });
      };
    }, [gsap, ScrollTrigger]);

  // Execution timeline animation
  useEffect(() => {
    if (!gsap || !ScrollTrigger || !executionSectionRef.current || !timelineLineRef.current) return;

    const timelineLine = timelineLineRef.current;
    const execution1 = execution1Ref.current;
    const execution2 = execution2Ref.current;
    const execution3 = execution3Ref.current;
    const execution4 = execution4Ref.current;

    if (!execution1 || !execution2 || !execution3 || !execution4) return;

    let tl: gsap.core.Timeline | null = null;

    const rafId = requestAnimationFrame(() => {
      // Set initial states
      gsap.set(timelineLine, {
        scaleY: 0,
        transformOrigin: 'top center',
      });

      gsap.set([execution1, execution2, execution3, execution4], {
        opacity: 0,
        y: 30,
      });

      // Create scroll timeline
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: executionSectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate timeline line growing
      tl.to(timelineLine, {
        scaleY: 1,
        ease: 'none',
        duration: 1,
      }, 0);

      // Stagger in each execution subsection
      tl.to(execution1, {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        duration: 0.3,
      }, 0.1)
      .to(execution2, {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        duration: 0.3,
      }, 0.35)
      .to(execution3, {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        duration: 0.3,
      }, 0.6)
      .to(execution4, {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        duration: 0.3,
      }, 0.85);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (tl) {
        tl.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === executionSectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [gsap, ScrollTrigger]);
  
    // All content animations removed per user request - keeping only background fills

  // Problem section scrolling animation (like testimonials) - 2 transitions
  useEffect(() => {
    if (!gsap || !ScrollTrigger || !problemsSectionRef.current) return;

    const problem1 = problem1Ref.current;
    const problem2 = problem2Ref.current;
    const problem3 = problem3Ref.current;

    if (!problem1 || !problem2 || !problem3) return;

    let tl: gsap.core.Timeline | null = null;

    const rafId = requestAnimationFrame(() => {
      const textHeight = problem1.offsetHeight || 300;
      const offset = Math.min(textHeight * 0.5, 150);

      // Set initial states - Problem 1 visible by default
      gsap.set(problem1, {
        y: 0,
        opacity: 1,
        zIndex: 2,
      });

      gsap.set(problem2, {
        y: offset,
        opacity: 0,
        zIndex: 1,
      });

      gsap.set(problem3, {
        y: offset,
        opacity: 0,
        zIndex: 1,
      });

      // Create scroll timeline with 2 transitions
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: problemsSectionRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1: Problem 1 visible (0 to 0.3 = hold)
      // Phase 2: Problem 1 folds up, Problem 2 unfolds (0.3 to 0.5)
      tl.to(problem1, {
        opacity: 0,
        zIndex: 0,
        ease: 'power2.in',
        duration: 0.1,
      }, 0.3)
      .to(problem1, {
        y: -offset,
        ease: 'power2.inOut',
        duration: 0.2,
      }, 0.3)
      .to(problem2, {
        y: 0,
        opacity: 1,
        zIndex: 2,
        ease: 'power2.inOut',
      }, 0.3)
      // Phase 3: Problem 2 stays (0.5 to 0.7 = hold)
      .to({}, { duration: 0.2 }, 0.5)
      // Phase 4: Problem 2 folds up, Problem 3 unfolds (0.7 to 0.9)
      .to(problem2, {
        opacity: 0,
        zIndex: 0,
        ease: 'power2.in',
        duration: 0.1,
      }, 0.7)
      .to(problem2, {
        y: -offset,
        ease: 'power2.inOut',
        duration: 0.2,
      }, 0.7)
      .to(problem3, {
        y: 0,
        opacity: 1,
        zIndex: 2,
        ease: 'power2.inOut',
      }, 0.7)
      // Phase 5: Problem 3 stays (0.9 to 1.0 = final hold)
      .to({}, { duration: 0.1 }, 0.9);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (tl) {
        tl.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === problemsSectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [gsap, ScrollTrigger]);

  return (
    <main className="bg-background min-h-screen">
      {/* Hero Section - Full width layout */}
      <div className="relative min-h-screen flex items-center overflow-hidden">
        <div className="w-full py-32 pl-8 sm:pl-12 lg:pl-16 pr-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-start">
              {/* Left column - Text content */}
              <div className="space-y-8 z-10 -ml-4 sm:-ml-8 lg:-ml-12">
                <h1 
                  className="text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-[family-name:var(--font-georgia)] text-text-secondary leading-[0.9]"
                >
              Blok
            </h1>
                
                <p 
                  className="text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary opacity-70 max-w-2xl"
                >
                  Rebuilding Sitecore's Design System for Scale, Governance, and AI
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 max-w-2xl">
                  <div>
                    <h3 className="text-sm font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary opacity-50 mb-3">
                      Role
                    </h3>
                    <p className="text-lg font-[family-name:var(--font-sfpro)] text-text-secondary">
                      Product Designer (Design Lead for Blok)<br />
                      Acting Product Manager (interim PM)
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary opacity-50 mb-3">
                      Timeline
                    </h3>
                    <p className="text-lg font-[family-name:var(--font-sfpro)] text-text-secondary">
                      April 2025 - December 2025
                    </p>
                  </div>
                </div>

                <div className="pt-8">
                  <a 
                    href="https://blok.sitecore.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent-tertiary text-[#222222] px-6 py-3 rounded-lg font-[family-name:var(--font-ppvalve)] font-medium text-base hover:opacity-90 transition-opacity"
                  >
                    Visit Blok site
                  </a>
                </div>
              </div>

              {/* Right column - Image positioned to overlap */}
              <div className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[45%] z-0">
                <div 
                  className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden"
                >
              <img
                src="/thumbs/blokthumb.webp"
                alt="Blok Design System"
                className="w-full h-full object-cover"
              />
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="min-h-screen flex items-center py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-16">
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
              Executive Summary
            </h2>
            
            <div className="space-y-8 text-lg md:text-xl font-[family-name:var(--font-sfpro)] text-text-secondary max-w-5xl leading-relaxed">
              <p>
                Blok is Sitecore's design system: a shared design language that powers consistent experiences across Sitecore's products and marketplace applications.
              </p>
              <p>
                Although my formal title was Product Designer, I acted as <strong>design lead and custodian</strong> of Blok. I led the initiative to rebuild the design system from the ground up, spanning architecture, governance, documentation, adoption, and AI enablement.
              </p>
              <p>
                What began as a UI library evolved into a <strong>foundational platform</strong> used by designers, engineers, product managers, and executives to rapidly prototype, align, and ship ideas, particularly within AI-driven workflows.
              </p>
            </div>

            <div className="mt-20 rounded-2xl overflow-hidden">
              <div className="aspect-video bg-gray-300 dark:bg-gray-700">
                <div className="w-full h-full flex items-center justify-center text-text-secondary opacity-50 text-xl">
                  [Placeholder: Design system component showcase]
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Problem - Scrolling section like testimonials */}
      <section
        ref={problemsSectionRef}
        className="relative w-full h-screen flex items-center justify-center bg-background mb-32"
      >
        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 mb-12">
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
              The Problem
            </h2>
            <p className="text-lg md:text-xl font-[family-name:var(--font-sfpro)] text-text-secondary max-w-4xl leading-relaxed">
              Blok existed, but it was no longer fit for the organisation Sitecore had become.
            </p>
          </div>

          {/* Problems Container */}
          <div className="relative w-full" style={{ minHeight: '500px' }}>
            {/* Spacer to maintain container height (invisible) */}
            <div className="invisible">
              <div className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                  1. Governance had broken down
                </h3>
              </div>
            </div>

            {/* Problem 1 - Governance (visible by default) */}
            <div
              ref={problem1Ref}
              className="absolute top-0 left-0 w-full"
              style={{ 
                willChange: 'transform, opacity',
                opacity: 1,
                transform: 'translateY(0)',
                zIndex: 2
              }}
            >
              <div className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                  1. Governance had broken down
                </h3>
                
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className="flex-1 space-y-6 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
                    <p>
                      Blok was built on Chakra UI v2. While effective for early velocity, it created a structural problem:
                    </p>
                    <ul className="list-disc pl-8 space-y-3">
                      <li>Any design deviation required editing core components</li>
                      <li>Editing core components blocked future updates</li>
                      <li>Teams either froze on old versions or forked styles</li>
                    </ul>
                    <p>
                      <strong>Result:</strong> visual drift, fragile upgrades, and no enforceable design governance.
                    </p>
                  </div>

                  <div className="w-full lg:w-80 flex-shrink-0">
                    <div className="rounded-2xl overflow-hidden">
                      <div className="aspect-video bg-gray-300 dark:bg-gray-700">
                        <div className="w-full h-full flex items-center justify-center text-text-secondary opacity-50 text-xs">
                          [Placeholder]
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Problem 2 - Multiple Frameworks */}
            <div
              ref={problem2Ref}
              className="absolute top-0 left-0 w-full"
              style={{ 
                willChange: 'transform, opacity',
                pointerEvents: 'none',
                zIndex: 1,
                opacity: 0,
                transform: 'translateY(150px)'
              }}
            >
              <div className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                  2. The system couldn't support multiple frameworks
                </h3>
                
                <div className="space-y-6 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary max-w-4xl leading-relaxed">
                  <p>
                    With the launch of the Sitecore Marketplace, external teams began building extensions using different React frameworks.
                  </p>
                  <p>
                    Chakra was:
                  </p>
                  <ul className="list-disc pl-8 space-y-3">
                    <li>Opinionated</li>
                    <li>Framework-specific</li>
                    <li>Not suitable for external developers we didn't control</li>
                  </ul>
                  <p>
                    We needed a system that could <strong>travel across teams without imposing a stack</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Problem 3 - AI */}
            <div
              ref={problem3Ref}
              className="absolute top-0 left-0 w-full"
              style={{ 
                willChange: 'transform, opacity',
                pointerEvents: 'none',
                zIndex: 1,
                opacity: 0,
                transform: 'translateY(150px)'
              }}
            >
              <div className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                  3. Blok was not AI-friendly
                </h3>
                
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className="flex-1 space-y-6 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
                    <p>
                      As AI coding tools (Cursor, Copilot, v0) became central to how teams prototyped, Blok became a bottleneck:
                    </p>
                    <ul className="list-disc pl-8 space-y-3">
                      <li>Heavily customised code</li>
                      <li>Minimal inline documentation</li>
                      <li>Poor AI comprehension</li>
                    </ul>
                    <p>
                      <strong>AI tools struggled to generate on-brand, usable UI</strong>, undermining speed and consistency.
                    </p>
                  </div>

                  <div className="w-full lg:w-80 flex-shrink-0">
                    <div className="rounded-2xl overflow-hidden">
                      <div className="aspect-video bg-gray-300 dark:bg-gray-700">
                        <div className="w-full h-full flex items-center justify-center text-text-secondary opacity-50 text-xs">
                          [Placeholder]
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Strategic Decision - Cards with scroll animation */}
      <div ref={decisionSectionRef} className="relative min-h-screen py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Sticky Heading */}
          <div className="sticky top-8 z-20 bg-background pb-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
              The Strategic Decision: Rebuilding on Shadcn
            </h2>

            <div className="space-y-6 text-lg md:text-xl font-[family-name:var(--font-sfpro)] text-text-secondary max-w-5xl leading-relaxed mt-8">
              <p>
                As the sole designer on the initiative, partnered with two senior solutions architects, I led the evaluation of alternatives.
              </p>
              <p>
                We chose to rebuild Blok on <strong>Shadcn</strong>, not as a UI kit, but as an <strong>architecture</strong>.
              </p>
            </div>
          </div>

          {/* Cards Container */}
          <div ref={decisionCardsRef} className="relative space-y-4">
            {/* Card 1 - Governance by design */}
            <div className="bg-accent-tertiary rounded-2xl overflow-hidden">
              <div className="p-8">
                <h3 className="text-xl md:text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-[#222222] mb-6">
                  Governance by design
                </h3>
                <div
                  ref={card1ContentRef}
                  className="space-y-4 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-[#222222] leading-relaxed"
                  style={{ willChange: 'height' }}
                >
                  <p>
                    Shadcn's registry-based model allowed us to:
                  </p>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>Publish stable core components</li>
                    <li>Enable extension without modification</li>
                    <li>Update safely without breaking downstream work</li>
                  </ul>
                  <p className="italic">
                    This single decision restored long-term governance.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 - Framework-friendly */}
            <div className="bg-accent-tertiary rounded-2xl overflow-hidden">
              <div className="p-8">
                <h3 className="text-xl md:text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-[#222222] mb-6">
                  Framework-friendly
                </h3>
                <div
                  ref={card2ContentRef}
                  className="space-y-4 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-[#222222] leading-relaxed"
                  style={{ willChange: 'height' }}
                >
                  <p>
                    A fully framework-agnostic system was explored—but rejected due to team size, maintenance overhead, and delivery timelines.
                  </p>
                  <p>
                    Shadcn struck the right balance:
                  </p>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>Compatible with major React frameworks</li>
                    <li>Unopinionated foundations (Radix + Tailwind)</li>
                    <li>Allowed us to layer Sitecore's design language on top</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 3 - AI-native by default */}
            <div className="bg-accent-tertiary rounded-2xl overflow-hidden">
              <div className="p-8">
                <h3 className="text-xl md:text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-[#222222] mb-6">
                  AI-native by default
                </h3>
                <div
                  ref={card3ContentRef}
                  className="space-y-4 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-[#222222] leading-relaxed"
                  style={{ willChange: 'height' }}
                >
                  <p>
                    Shadcn is:
                  </p>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>Widely documented</li>
                    <li>Commonly used in AI training data</li>
                    <li>Natively supported by tools like Vercel v0</li>
                  </ul>
                  <p className="italic">
                    This made Blok legible to AI, unlocking a new class of on-brand prototyping workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Execution */}
      <div ref={executionSectionRef} className="min-h-screen flex items-center py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-20">
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
              Execution
            </h2>

            {/* Timeline Container */}
            <div className="relative">
              {/* Timeline Line */}
              <div 
                ref={timelineLineRef}
                className="absolute left-4 top-0 bottom-0 w-0.5 bg-accent-tertiary"
                style={{ willChange: 'transform' }}
              />

              <div className="space-y-24 pl-12">
                {/* Component Strategy */}
                <div ref={execution1Ref} className="relative space-y-8" style={{ willChange: 'transform, opacity' }}>
                  {/* Timeline Marker */}
                  <div className="absolute -left-[2.6rem] top-2 w-6 h-6 rounded-full bg-accent-tertiary border-4 border-background flex items-center justify-center">
                    <span className="text-[#222222] font-[family-name:var(--font-ppvalve)] font-medium text-xs">1</span>
                  </div>
                <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                  Component strategy
                </h3>
                
                <div className="space-y-6 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary max-w-5xl leading-relaxed">
                  <p>
                    I audited both:
                  </p>
                  <ul className="list-disc pl-8 space-y-3">
                    <li>Existing Blok components</li>
                    <li>Shadcn's baseline library</li>
                  </ul>
                  <p>
                    From this, I:
                  </p>
                  <ul className="list-disc pl-8 space-y-3">
                    <li>Defined what to keep, adapt, or retire</li>
                    <li>Prioritised components against active product roadmaps</li>
                    <li>Created a tracked component roadmap in Jira</li>
                    <li>Authored build guidance for consistency</li>
                  </ul>
                  <p>
                    Development became a <strong>community effort</strong>, with engineers joining from teams already adopting Shadcn.
                  </p>
                </div>

                <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="aspect-square bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 flex items-center justify-center">
                    <div className="text-center text-text-secondary opacity-50 text-lg">
                      [Component A]
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 flex items-center justify-center">
                    <div className="text-center text-text-secondary opacity-50 text-lg">
                      [Component B]
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 flex items-center justify-center">
                    <div className="text-center text-text-secondary opacity-50 text-lg">
                      [Component C]
                    </div>
                  </div>
                </div>
                </div>

                {/* Documentation & AI */}
                <div ref={execution2Ref} className="relative space-y-8" style={{ willChange: 'transform, opacity' }}>
                  {/* Timeline Marker */}
                  <div className="absolute -left-[2.6rem] top-2 w-6 h-6 rounded-full bg-accent-tertiary border-4 border-background flex items-center justify-center">
                    <span className="text-[#222222] font-[family-name:var(--font-ppvalve)] font-medium text-xs">2</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                    Documentation & AI enablement
                  </h3>
                
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                  <div className="flex-1 space-y-6 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
                    <p>
                      After the first component wave, I:
                    </p>
                    <ul className="list-disc pl-8 space-y-3">
                      <li>Interviewed designers and developers on how they actually used Blok</li>
                      <li>Designed the documentation experience around real workflows</li>
                      <li>Embedded AI-readable rules directly into component code</li>
                      <li>Enabled AI tools to generate compliant, on-brand UI by default</li>
                    </ul>
                  </div>

                  <div className="w-full lg:w-[45%] flex-shrink-0 rounded-2xl overflow-hidden">
                    <div className="aspect-[21/9] bg-gray-300 dark:bg-gray-700">
                      <div className="w-full h-full flex items-center justify-center text-text-secondary opacity-50 text-xl">
                        [Placeholder: Documentation interface]
                      </div>
                    </div>
                  </div>
                </div>
                </div>

                {/* Adoption */}
                <div ref={execution3Ref} className="relative space-y-8" style={{ willChange: 'transform, opacity' }}>
                  {/* Timeline Marker */}
                  <div className="absolute -left-[2.6rem] top-2 w-6 h-6 rounded-full bg-accent-tertiary border-4 border-background flex items-center justify-center">
                    <span className="text-[#222222] font-[family-name:var(--font-ppvalve)] font-medium text-xs">3</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                    Adoption & internal GTM
                  </h3>
                
                <div className="space-y-6 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary max-w-5xl leading-relaxed">
                  <p>
                    Blok initially struggled with adoption.
                  </p>
                  <p>
                    To fix this, I:
                  </p>
                  <ul className="list-disc pl-8 space-y-3">
                    <li>Proactively intercepted new projects and onboarded teams</li>
                    <li>Presented Blok at an R&D town hall (150+ attendees)</li>
                    <li>Framed Blok as an <strong>AI acceleration tool</strong>, not a design asset</li>
                  </ul>
                  <p>
                    This shifted perception—and adoption followed.
                  </p>
                </div>
                </div>

                {/* Shipping */}
                <div ref={execution4Ref} className="relative space-y-8" style={{ willChange: 'transform, opacity' }}>
                  {/* Timeline Marker */}
                  <div className="absolute -left-[2.6rem] top-2 w-6 h-6 rounded-full bg-accent-tertiary border-4 border-background flex items-center justify-center">
                    <span className="text-[#222222] font-[family-name:var(--font-ppvalve)] font-medium text-xs">4</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                    Shipping under constraint
                  </h3>
                
                <div className="space-y-6 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary max-w-5xl leading-relaxed">
                  <p>
                    Ahead of Symposium 2025, the docs site was not ready due to delayed hiring.
                  </p>
                  <p>
                    I made the call to:
                  </p>
                  <ul className="list-disc pl-8 space-y-3">
                    <li>Release the registry as a <strong>Beta</strong></li>
                    <li>Provide temporary, in-context documentation</li>
                    <li>Collect real-world feedback before final release</li>
                  </ul>
                  <p>
                    Post-Symposium, we incorporated feedback and shipped the official release weeks later.
                  </p>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Outcomes & Impact - Dashboard Style */}
      <div className="relative min-h-screen flex items-center py-32">        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
            Outcomes & Impact
          </h2>

          <div className="space-y-8">
            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-text-secondary/10 rounded-xl p-8">
              <div 
                className="text-5xl md:text-6xl font-[family-name:var(--font-ppvalve)] font-medium text-accent-tertiary mb-3"
              >
                ~10k
              </div>
              <div className="text-sm md:text-base font-[family-name:var(--font-sfpro)] text-text-secondary opacity-60 uppercase tracking-wide">
                Estimated monthly installs via registry
              </div>
            </div>
            
            <div className="border border-text-secondary/10 rounded-xl p-8">
              <div 
                className="text-5xl md:text-6xl font-[family-name:var(--font-ppvalve)] font-medium text-accent-tertiary mb-3"
              >
                100%
              </div>
              <div className="text-sm md:text-base font-[family-name:var(--font-sfpro)] text-text-secondary opacity-60 uppercase tracking-wide">
                Adoption in new marketplace extensions
              </div>
            </div>
            
            <div className="border border-text-secondary/10 rounded-xl p-8">
              <div 
                className="text-5xl md:text-6xl font-[family-name:var(--font-ppvalve)] font-medium text-accent-tertiary mb-3"
              >
                3+
              </div>
              <div className="text-sm md:text-base font-[family-name:var(--font-sfpro)] text-text-secondary opacity-60 uppercase tracking-wide">
                Teams fully migrated
              </div>
            </div>
          </div>

          {/* Impact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Organizational Impact Card */}
            <div className="border border-text-secondary/10 rounded-xl p-8 space-y-6">
              <h3 className="text-xl md:text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                Organisational impact
              </h3>
              
              <div className="space-y-4 text-base font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                  <p>Blok is now the <strong>default UI foundation</strong> for Sitecore Marketplace apps</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                  <p>3 teams fully migrated; all others have Blok on their 2026 roadmap</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                  <p>Blok is used across design, engineering, product, and executive prototyping</p>
                </div>
              </div>
            </div>

            {/* AI-SDLC Validation Card */}
            <div className="border border-text-secondary/10 rounded-xl p-8 space-y-6">
              <h3 className="text-xl md:text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                AI-SDLC validation
              </h3>
              
              <div className="space-y-4 text-base font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
                <p>
                  During an internal AI-SDLC workshop, I enabled every participant to prototype using Blok. The resulting demos:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                    <p>Looked cohesive</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                    <p>Were on-brand</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                    <p>Required minimal design input</p>
                  </div>
                </div>
                <p className="pt-2">
                  These were presented to the CPO and CTO, who explicitly praised the <strong>quality and refinement</strong> enabled by Blok.
                </p>
              </div>
            </div>
          </div>
          </div>

          {/* Full Width Visual Card */}
          <div className="border border-text-secondary/10 rounded-xl overflow-hidden">
            <div className="aspect-video bg-text-secondary/5">
              <div className="w-full h-full flex items-center justify-center text-text-secondary opacity-30 text-lg">
                [Placeholder: Impact visualization or dashboard]
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reflection */}
      <div className="min-h-screen flex items-center py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-16">
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
              Reflection & Learning
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* What I would change */}
              <div className="border border-text-secondary/10 rounded-xl p-8 space-y-6">
                <h3 className="text-xl md:text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                  What I would change
                </h3>
                
                <div className="space-y-5 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
                  <p>
                    We initially over-customised components to preserve legacy visual behaviour. This came at a cost:
                  </p>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                      <span>We overwrote parts of Radix's native structure</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                      <span>AI tools performed worse as a result</span>
                    </li>
                  </ul>
                  <p className="pt-2">
                    In hindsight, we should have accepted more behavioural change in favour of <strong>AI and architectural alignment</strong>.
                  </p>
                </div>
              </div>

              {/* What this taught me */}
              <div className="border border-text-secondary/10 rounded-xl p-8 space-y-6">
                <h3 className="text-xl md:text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                  What this taught me
                </h3>
                
                <div className="space-y-5 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
                  <p>
                    This was my first end-to-end platform initiative with:
                  </p>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                      <span>Roadmap ownership</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                      <span>Executive visibility</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                      <span>Cross-org dependency management</span>
                    </li>
                  </ul>
                  <p className="pt-2">
                    I learned how to:
                  </p>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                      <span>Balance design purity with system leverage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                      <span>Drive adoption through narrative, not mandate</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                      <span>Operate comfortably between designer, PM, and technical partner roles</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-10 md:p-14 bg-accent-tertiary rounded-2xl">
              <p className="text-lg md:text-xl font-[family-name:var(--font-ppvalve)] font-medium text-[#222222] leading-relaxed">
                Blok fundamentally changed how Sitecore builds, prototypes, and aligns, and reshaped how I think about design systems as <strong>organisational infrastructure</strong>, not UI libraries.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
