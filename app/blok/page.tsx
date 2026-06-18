'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '../contexts/GSAPContext';
import { Footer } from '../components/Footer';
import { CaseStudyHero } from '../components/case-study/CaseStudyHero';
import { CaseStudySection } from '../components/case-study/CaseStudySection';
import {
  CaseStudyCallout,
  CaseStudyDetailList,
  CaseStudyFeatureCards,
  CaseStudyImageFrame,
  CaseStudyInsightGrid,
  CaseStudyMetricGrid,
  CaseStudyProse,
  CaseStudySplitCards,
  CaseStudyTimeline,
} from '../components/case-study/CaseStudyBlocks';

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

  // Wait for page to fully load (including images) before refreshing ScrollTrigger
  useEffect(() => {
    if (!ScrollTrigger || typeof window === 'undefined') return;

    // Wait for React hydration to complete before manipulating scroll
    const scrollToTop = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    });

    const refreshScrollTrigger = () => {
      // Wait for layout to settle with double RAF
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    };

    // Wait for all images to load
    const waitForImages = () => {
      const images = document.querySelectorAll('img');
      if (images.length === 0) {
        refreshScrollTrigger();
        return;
      }

      let loadedCount = 0;
      const totalImages = images.length;

      const checkComplete = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          refreshScrollTrigger();
        }
      };

      images.forEach((img) => {
        if ((img as HTMLImageElement).complete) {
          checkComplete();
        } else {
          img.addEventListener('load', checkComplete, { once: true });
          img.addEventListener('error', checkComplete, { once: true });
        }
      });
    };

    // If page is already loaded, check images immediately
    if (document.readyState === 'complete') {
      waitForImages();
    } else {
      // Wait for window load event (includes images)
      window.addEventListener('load', waitForImages, { once: true });
      
      // Also refresh after a delay as fallback
      const timeoutId = setTimeout(() => {
        refreshScrollTrigger();
      }, 1000);

      return () => {
        cancelAnimationFrame(scrollToTop);
        window.removeEventListener('load', waitForImages);
        clearTimeout(timeoutId);
      };
    }

    return () => {
      cancelAnimationFrame(scrollToTop);
    };
  }, [ScrollTrigger]);

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

  // Final refresh after all animations are set up to ensure correct viewport calculations
  useEffect(() => {
    if (!ScrollTrigger) return;

    // Refresh after all animations have been initialized
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimer);
    };
  }, [ScrollTrigger]);

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
                  className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary max-w-2xl"
                >
                  Rebuilding Sitecore's Design System for Scale, Governance, and AI
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 max-w-2xl">
                  <div>
                    <h3 className="text-sm font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary opacity-50 mb-3">
                      Role
                    </h3>
                    <p className="text-lg font-[family-name:var(--font-sfpro)] text-text-secondary">
                    Product Designer — Design Systems Lead for Blok
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
              <div className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[45%] lg:mr-8 z-0">
                <div 
                  className="h-[600px] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden"
                >
              <Image
                src="/images/blokcasestudyheader.webp"
                alt="Blok Design System"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                priority
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
                Although my formal title was Product Designer, I acted as <strong>design lead and acting product manager</strong> of Blok. I helped lead the initiative to rebuild the design system from the ground up, spanning architecture, design, adoption, documentation, and AI enablement.
              </p>
              <p>
                What started as a UI library became a <strong>foundational platform</strong> used by designers, internal and external engineers, product managers, and executives to rapidly prototype, align, and ship ideas, especially within AI-driven workflows.
              </p>
            </div>

            <div className="mt-20 rounded-lg overflow-hidden relative aspect-video">
              <Image
                src="/images/blokcasestudymock.webp"
                alt="Blok design system component showcase"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                quality={90}
              />
            </div>
          </div>
        </div>
      </div>

      {/* The Problem - Scrolling section like testimonials */}
      <section
        ref={problemsSectionRef}
        className="relative w-full h-screen flex items-center justify-center bg-background"
      >
        <div className="space-y-10">
          <CaseStudyProse>
            <p>
              Blok is Sitecore&apos;s design system: a shared design language that powers
              consistent experiences across Sitecore&apos;s products and marketplace applications.
            </p>
            <p>
              Although my formal title was Product Designer, I acted as{' '}
              <strong>design lead and acting product manager</strong> of Blok. I helped lead the
              initiative to rebuild the design system from the ground up, spanning architecture,
              design, adoption, documentation, and AI enablement.
            </p>
          </CaseStudyProse>

          <CaseStudyCallout tone="accent">
            What started as a UI library became a <strong>foundational platform</strong> used by
            designers, internal and external engineers, product managers, and executives to rapidly
            prototype, align, and ship ideas, especially within AI-driven workflows.
          </CaseStudyCallout>

          <div className="overflow-hidden rounded-2xl">
            <img
              src="/images/blokcasestudymock.webp"
              alt="Blok design system component showcase"
              className="w-full object-cover"
            />
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="02"
        title="The Problem"
        intro="Blok existed, but it was no longer fit for the organisation Sitecore had become."
        variant="muted"
        layout="stacked"
      >
        <CaseStudyInsightGrid
          labelFormat="alpha"
          items={[
            {
              title: 'Governance had broken down',
              body: (
                <>
                  <p>
                    Blok was originally built on Chakra UI v2 back in 2020. While effective for
                    early velocity, it created a structural problem: any deviation in styling
                    required editing core components, which blocked future updates or forced
                    re-implementation on upgrade.
                  </p>
                  <CaseStudyDetailList
                    items={[
                      'Teams either froze on old versions or forked styles',
                      'Visual drift became the norm across products',
                      'There was no enforceable design governance',
                    ]}
                  />
                </>
              ),
              result:
                'Visual drift, fragile upgrades, and no enforceable design governance.',
            },
            {
              title: "The system couldn't support multiple frameworks",
              body: (
                <>
                  <p>
                    With the launch of the Sitecore Marketplace, external teams began building
                    extensions using different React frameworks.
                  </p>
                  <CaseStudyDetailList
                    items={[
                      'Chakra was opinionated and framework-specific',
                      'It was not suitable for external developers we did not control',
                      'We needed a system that could travel across teams without imposing a stack',
                    ]}
                  />
                </>
              ),
            },
            {
              title: 'Blok was not AI-friendly',
              body: (
                <>
                  <p>
                    As AI coding tools (Cursor, Copilot, v0) became central to how teams
                    prototyped, Blok became a bottleneck.
                  </p>
                  <CaseStudyDetailList
                    items={[
                      'Heavily customised code',
                      'Minimal inline documentation',
                      'Poor AI comprehension of component structure',
                    ]}
                  />
                </>
              ),
              result:
                'AI tools struggled to generate on-brand, usable UI, undermining speed and consistency.',
            },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection
        number="03"
        title="The Strategic Decision"
        intro="As the sole designer on the initiative, partnered with two senior solutions architects, I helped closely with the evaluation of alternative platforms."
      >
        <div className="space-y-10">
          <CaseStudyProse>
            <p>
              We chose to rebuild Blok on <strong>Shadcn</strong>, not as a UI kit, but as an{' '}
              <strong>architecture</strong>.
            </p>
          </CaseStudyProse>

          <CaseStudyFeatureCards
            items={[
              {
                title: 'Governance by design',
                body: (
                  <>
                    <p>Shadcn&apos;s registry-based model allowed us to:</p>
                    <CaseStudyDetailList
                      items={[
                        'Publish stable core components individually, instead of in a single package',
                        'Enable extension without modification. Each component could be built on top of without editing the core',
                        'Update safely without breaking downstream work',
                      ]}
                    />
                    <p className="italic">
                      This single decision restored long-term governance.
                    </p>
                  </>
                ),
                image: {
                  src: '/images/blokcasestudyarchitecture.webp',
                  alt: 'Blok architecture',
                  href: '/images/blokcasestudyarchitecture.webp',
                },
              },
              {
                title: 'Framework-friendly',
                body: (
                  <>
                    <p>
                      A fully framework-agnostic system was explored, but we eventually rejected
                      it due to team size, maintenance overhead, and delivery timelines.
                    </p>
                    <p>Shadcn struck the right balance:</p>
                    <CaseStudyDetailList
                      items={[
                        'Compatible with major React frameworks',
                        'Minimally opinionated foundations (Radix + Tailwind)',
                        "Allowed us to layer Sitecore's design language on top",
                      ]}
                    />
                  </>
                ),
              },
              {
                title: 'AI-native by default',
                body: (
                  <>
                    <p>Shadcn is widely documented, commonly used in AI training data, and natively supported by tools like Vercel v0.</p>
                    <p className="italic">
                      This made Blok legible to AI, unlocking a new class of on-brand prototyping
                      workflows.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </div>
      </CaseStudySection>

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
                As the sole designer on the initiative, partnered with two senior solutions architects, I helped closedly with the evaluation of alternatives platforms.
              </p>
              <p>
                We chose to rebuild Blok on <strong>Shadcn</strong>, not as a UI kit, but as an <strong>architecture</strong>.
              </p>
            </div>
          </div>

          {/* Cards Container */}
          <div ref={decisionCardsRef} className="relative space-y-4">
          <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
            Why Shadcn?                 
          </h3>
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
                  <div className="flex flex-col lg:flex-row gap-6 items-start">
                    <div className="flex-1 space-y-4">
                      <p>
                        Shadcn's registry-based model allowed us to:
                      </p>
                      <ul className="list-disc pl-6 space-y-3">
                        <li>Publish stable core components individually, instead of in a single package</li>
                        <li>Enable extension without modification. Each component could be built on top of without editing the core component</li>
                        <li>Update safely without breaking downstream work</li>
                      </ul>
                      <p className="italic">
                        This single decision restored long-term governance.
                      </p>
                    </div>
                    <div className="w-full lg:w-[40%] flex-shrink-0 rounded-lg p-4" style={{ backgroundColor: '#6E3FFF' }}>
                      <a
                        href="/images/blokcasestudyarchitecture.webp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg overflow-hidden cursor-pointer shadow-lg block"
                      >
                        <Image
                          src="/images/blokcasestudyarchitecture.webp"
                          alt="Blok architecture"
                          width={800}
                          height={600}
                          className="w-full h-auto object-cover rounded-lg"
                          sizes="(max-width: 768px) 100vw, 800px"
                          quality={85}
                        />
                      </a>
                    </div>
                  </div>
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
                    A fully framework-agnostic system was explored—but we eventually rejected it due to team size, maintenance overhead, and delivery timelines.
                  </p>
                  <p>
                    Moving from Chakra v2 to Shadcn, I audited both existing Blok components and
                    Shadcn&apos;s baseline library. From this, I defined what to keep, adapt, or
                    retire; prioritised components against active product roadmaps; created a
                    tracked component roadmap in Jira; and authored build guidance for consistency.
                  </p>
                  <p>
                    Development initially became a <strong>community effort</strong>, with engineers
                    joining from teams already adopting Shadcn and myself chasing down developers
                    to help review PRs.
                  </p>
                </>
              ),
              media: (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {[
                    { src: '/images/blokcasestudycollab1.png', alt: 'Blok collaboration 1' },
                    { src: '/images/blokcasestudycollab2.png', alt: 'Blok collaboration 2' },
                    { src: '/images/blokcasestudycollab3.png', alt: 'Blok collaboration 3' },
                  ].map((image) => (
                    <CaseStudyImageFrame
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      href={image.src}
                    />
                  ))}
                </div>
              ),
            },
            {
              title: 'Building a better developer experience',
              body: (
                <>
                  <p>
                    After the first wave of components were built by myself and contributing
                    developers, I interviewed designers and developers about how they actually used
                    Blok, broke down Sitecore design patterns into rules documented in each
                    component file, and interviewed developers implementing the new components to
                    find problems early.
                  </p>
                </>
              ),
            },
            {
              title: 'Adoption & internal GTM',
              body: (
                <>
                  <p>
                    Blok initially struggled with adoption as it was not majorly publicised or
                    advocated for. To fix this, I proactively intercepted new projects, presented
                    Blok at an R&D town hall (150+ attendees), and framed Blok as an{' '}
                    <strong>acceleration tool</strong>, not a design asset.
                  </p>
                  <p>
                    This shifted perception and adoption followed. R&D leadership pushed more
                    projects to use Blok and we started to see more initiatives being built from
                    Blok.
                  </p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="rounded-lg p-4" style={{ backgroundColor: '#6E3FFF' }}>
                    <a
                      href="/images/blokcasestudycollab1.png"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg overflow-hidden cursor-pointer shadow-lg block"
                    >
                      <Image
                        src="/images/blokcasestudycollab1.png"
                        alt="Blok collaboration 1"
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, 600px"
                        quality={85}
                      />
                    </a>
                  </div>
                  <div className="rounded-lg p-4" style={{ backgroundColor: '#6E3FFF' }}>
                    <a
                      href="/images/blokcasestudycollab2.png"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg overflow-hidden cursor-pointer shadow-lg block"
                    >
                      <Image
                        src="/images/blokcasestudycollab2.png"
                        alt="Blok collaboration 2"
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, 600px"
                        quality={85}
                      />
                    </a>
                  </div>
                  <div className="rounded-lg p-4" style={{ backgroundColor: '#6E3FFF' }}>
                    <a
                      href="/images/blokcasestudycollab3.png"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg overflow-hidden cursor-pointer shadow-lg block"
                    >
                      <Image
                        src="/images/blokcasestudycollab3.png"
                        alt="Blok collaboration 3"
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, 600px"
                        quality={85}
                      />
                    </a>
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
Building a better developer experience
                  </h3>
                
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                  <div className="flex-1 space-y-6 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
                    <p>
                      After the first wave of components were built by myself and the contributing developers, I:
                    </p>
                    <ul className="list-disc pl-8 space-y-3 list-accent-bullets">
                      <li>Interviewed designers and developers about how they actually used Blok, to inform how we design the site and documentation</li>
                      <li>Broke down patterns in how Sitecore designs are made and our components are used into rules that were documented in each component file</li>
                      <li>Interviewed developers implemented the new components to find any problems early</li>
                    </ul>
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
                    As the initiative grew traction, we were allocated budget to hire a team to get
                    Blok into production for Sitecore Marketplace and continue growing its scope.
                  </p>
                  <p>
                    Once the team was hired, I onboarded them with presentations on Blok&apos;s
                    history, philosophy, and roadmap; created their first Jira tickets to guide
                    which components and docs pages to build; and reviewed PRs with feedback in
                    grooming calls and sprint planning.
                  </p>
                  <p>
                    After a few months the review feedback became fewer and the team were fully
                    set up for building out greater projects within Blok.
                  </p>
                </>
              ),
              media: (
                <div className="cursor-confetti">
                  <CaseStudyImageFrame
                    src="/images/blokcasestudyteam.png"
                    alt="Blok team"
                  />
                </div>
                </div>


{/* Getting a team */}
<div ref={execution3Ref} className="relative space-y-8" style={{ willChange: 'transform, opacity' }}>
                  {/* Timeline Marker */}
                  <div className="absolute -left-[2.6rem] top-2 w-6 h-6 rounded-full bg-accent-tertiary border-4 border-background flex items-center justify-center">
                    <span className="text-[#222222] font-[family-name:var(--font-ppvalve)] font-medium text-xs">4</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                    Getting a team
                  </h3>
                
                <div className="space-y-8">
                  <div className="space-y-6 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed max-w-5xl">
                    <p>
As the initiative grew traction, we were allocated budget to hire a team to get Blok into production for Sitecore Marketplace and continue the initiative to grow its scope.                   </p>
                    <p>
                      Once the team was hired, I:
                    </p>
                    <ul className="list-disc pl-8 space-y-3 list-accent-bullets">
                      <li>Helped onboard the team by giving presentations on the history, philosohpy and roadmap of the future of Blok</li>
                      <li>Created their first Jira tickets to build guide them on which components and pages of the docs site to build</li>
                      <li>Reviewed all of their PRs and provided feedback in grooming calls and sprint planning</li>
                    </ul>
                    <p>
After a few months the review feedback became fewer and the team were fully set-up for building out greater projects within Blok                  </p>
                  </div>

                  <div className="w-full max-w-4xl rounded-lg p-4 cursor-confetti" style={{ backgroundColor: '#6E3FFF' }}>
                    <div className="rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src="/images/blokcasestudyteam.png"
                        alt="Blok team"
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, 800px"
                        quality={85}
                      />
                    </div>
                  </div>
                </div>
                </div>


                {/* Shipping */}
                <div ref={execution4Ref} className="relative space-y-8" style={{ willChange: 'transform, opacity' }}>
                  {/* Timeline Marker */}
                  <div className="absolute -left-[2.6rem] top-2 w-6 h-6 rounded-full bg-accent-tertiary border-4 border-background flex items-center justify-center">
                    <span className="text-[#222222] font-[family-name:var(--font-ppvalve)] font-medium text-xs">5</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                    Shipping under constraint
                  </h3>
                
                <div className="space-y-6 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary max-w-5xl leading-relaxed">
                  <p>
                    Ahead of Symposium 2025, where Blok was to be announced as released, the docs
                    site was not ready due to delayed hiring of the team.
                  </p>
                  <p>
                    I made the decision to release the registry as a Beta, without a docs site,
                    rather than delaying the whole release:
                  </p>
                  <CaseStudyDetailList
                    items={[
                      'Teams could start using Blok internally and externally, enabling early feedback',
                      'We provided temporary in-file documentation so developers could get started without visuals',
                      'During Sitecore Marketplace workshops, internal developers helped external devs use Blok while observing pain points firsthand',
                    ]}
                  />
                  <p>
                    Post-Symposium, we incorporated feedback and shipped the official release weeks
                    later.
                  </p>
                </>
              ),
            },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection number="05" title="Outcomes & Impact">
        <div className="space-y-10">
          <CaseStudyMetricGrid
            metrics={[
              {
                value: '~10k',
                label: 'Estimated monthly installs via registry',
              },
              {
                value: '100%',
                label: 'Adoption in new marketplace applications',
              },
              {
                value: '3+',
                label: 'Internal teams fully migrated',
              },
            ]}
          />

          <CaseStudySplitCards
            items={[
              {
                title: 'Organisational impact',
                body: (
                  <CaseStudyDetailList
                    items={[
                      'Blok is now the default UI foundation for Sitecore Marketplace apps',
                      '3 teams fully migrated; all others have Blok on their 2026 roadmap',
                      'Blok is used across design, engineering, product, and executive prototyping',
                    ]}
                  />
                ),
              },
              {
                title: 'AI-SDLC validation',
                body: (
                  <>
                    <p>
                      During an internal AI-SDLC workshop, I enabled every participant to prototype
                      using Blok. The resulting demos looked cohesive, were on-brand, and required
                      minimal design input.
                    </p>
                    <p>
                      These were presented to the CPO and CTO, who explicitly praised the{' '}
                      <strong>quality and refinement</strong> enabled by Blok.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="06"
        title="Reflection & Learning"
        variant="muted"
      >
        <div className="space-y-10">
          <CaseStudySplitCards
            items={[
              {
                title: 'What I would change',
                body: (
                  <>
                    <p>
                      We initially over-customised components to preserve legacy visual behaviour
                      from the Chakra v2 version of Blok. This came at a cost: we overwrote parts
                      of Radix&apos;s native structure, and AI tools performed worse as a result.
                    </p>
                    <p>
                      In hindsight, we should have accepted more behavioural change in favour of{' '}
                      <strong>AI and architectural alignment</strong>.
                    </p>
                  </>
                ),
              },
              {
                title: 'What this taught me',
                body: (
                  <>
                    <p>
                      This was my first zero-to-one platform initiative as a solo designer and
                      acting product manager. I got hands-on with roadmap ownership, executive
                      visibility, and cross-org dependency management.
                    </p>
                    <CaseStudyDetailList
                      items={[
                        'Balance design purity with system leverage',
                        'Drive adoption through narrative, not mandate',
                        'Operate comfortably between designer, PM, and technical partner roles',
                      ]}
                    />
                  </>
                ),
              },
            ]}
          />

          <CaseStudyCallout tone="accent">
            Blok fundamentally changed how Sitecore builds, prototypes, and aligns, and reshaped
            how I think about design systems as{' '}
            <strong>organisational infrastructure</strong>, not UI libraries.
          </CaseStudyCallout>
        </div>
      </CaseStudySection>

      <Footer />
    </main>
  );
}
