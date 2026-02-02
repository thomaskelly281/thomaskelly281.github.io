'use client';

import { useEffect, useRef } from 'react';
import { useGSAP } from '../contexts/GSAPContext';

export default function BlokPage() {
  const decisionBgRef = useRef<HTMLDivElement>(null);
  const outcomesBgRef = useRef<HTMLDivElement>(null);
  const { gsap, ScrollTrigger } = useGSAP();

  // Full-width section background fill animations
  useEffect(() => {
    if (!ScrollTrigger || !decisionBgRef.current || !outcomesBgRef.current) return;

    // Decision section fill animation
    gsap.fromTo(
      decisionBgRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: decisionBgRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    );

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

  // All content animations removed per user request - keeping only background fills

  return (
    <main className="bg-background min-h-screen">
      {/* Hero Section - Full width layout */}
      <div className="relative min-h-screen flex items-center overflow-hidden">
        <div className="w-full py-32 pl-8 sm:pl-12 lg:pl-16 pr-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
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
              </div>

              {/* Right column - Image positioned to overlap */}
              <div className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[55%] z-0">
                <div 
                  className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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

            <div className="mt-20 rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gray-300 dark:bg-gray-700">
                <div className="w-full h-full flex items-center justify-center text-text-secondary opacity-50 text-xl">
                  [Placeholder: Design system component showcase]
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Problem */}
      <div className="min-h-screen flex items-center py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-20">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                The Problem
              </h2>

              <div className="space-y-6 text-lg md:text-xl font-[family-name:var(--font-sfpro)] text-text-secondary max-w-5xl leading-relaxed">
                <p>
                  Blok existed, but it was no longer fit for the organisation Sitecore had become.
                </p>
              </div>
            </div>

            {/* Problem 1 */}
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                1. Governance had broken down
              </h3>
              
              <div className="space-y-6 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary max-w-5xl leading-relaxed">
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

              <div className="mt-12 rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-[16/9] bg-gray-300 dark:bg-gray-700">
                  <div className="w-full h-full flex items-center justify-center text-text-secondary opacity-50 text-xl">
                    [Placeholder: Visual showing governance breakdown]
                  </div>
                </div>
              </div>
            </div>

            {/* Problem 2 */}
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                2. The system couldn't support multiple frameworks
              </h3>
              
              <div className="space-y-6 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary max-w-5xl leading-relaxed">
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

            {/* Problem 3 */}
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                3. Blok was not AI-friendly
              </h3>
              
              <div className="space-y-6 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary max-w-5xl leading-relaxed">
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

              <div className="mt-12 rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-[16/9] bg-gray-300 dark:bg-gray-700">
                  <div className="w-full h-full flex items-center justify-center text-text-secondary opacity-50 text-xl">
                    [Placeholder: AI tools struggling with old system]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Strategic Decision - Full width with fill animation */}
      <div className="relative min-h-screen flex items-center py-32 overflow-hidden">
        {/* Animated background */}
        <div 
          ref={decisionBgRef}
          className="absolute inset-0 bg-accent-tertiary/5 dark:bg-accent-tertiary/10"
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-20">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
              The Strategic Decision: Rebuilding on Shadcn
            </h2>

            <div className="space-y-6 text-lg md:text-xl font-[family-name:var(--font-sfpro)] text-text-secondary max-w-5xl leading-relaxed">
              <p>
                As the sole designer on the initiative, partnered with two senior solutions architects, I led the evaluation of alternatives.
              </p>
              <p>
                We chose to rebuild Blok on <strong>Shadcn</strong>, not as a UI kit, but as an <strong>architecture</strong>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="bg-accent-tertiary rounded-2xl p-8">
                <h3 className="text-xl md:text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-[#222222]">
                  Governance by design
                </h3>
              </div>
              <div className="space-y-4 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
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

            <div className="space-y-6">
              <div className="bg-accent-tertiary rounded-2xl p-8">
                <h3 className="text-xl md:text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-[#222222]">
                  Framework-friendly
                </h3>
              </div>
              <div className="space-y-4 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
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

            <div className="space-y-6">
              <div className="bg-accent-tertiary rounded-2xl p-8">
                <h3 className="text-xl md:text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-[#222222]">
                  AI-native by default
                </h3>
              </div>
              <div className="space-y-4 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
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

          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-video bg-gray-300 dark:bg-gray-700">
              <div className="w-full h-full flex items-center justify-center text-text-secondary opacity-50 text-xl">
                [Placeholder: Shadcn architecture diagram]
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Execution */}
      <div className="min-h-screen flex items-center py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-20">
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
              Execution
            </h2>

            <div className="space-y-24">
              {/* Component Strategy */}
              <div className="space-y-8">
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
                  <div className="aspect-square bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 flex items-center justify-center shadow-lg">
                    <div className="text-center text-text-secondary opacity-50 text-lg">
                      [Component A]
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 flex items-center justify-center shadow-lg">
                    <div className="text-center text-text-secondary opacity-50 text-lg">
                      [Component B]
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 flex items-center justify-center shadow-lg">
                    <div className="text-center text-text-secondary opacity-50 text-lg">
                      [Component C]
                    </div>
                  </div>
                </div>
              </div>

              {/* Documentation & AI */}
              <div className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                  Documentation & AI enablement
                </h3>
                
                <div className="space-y-6 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary max-w-5xl leading-relaxed">
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

                <div className="mt-12 rounded-2xl overflow-hidden shadow-xl">
                  <div className="aspect-[21/9] bg-gray-300 dark:bg-gray-700">
                    <div className="w-full h-full flex items-center justify-center text-text-secondary opacity-50 text-xl">
                      [Placeholder: Documentation interface]
                    </div>
                  </div>
                </div>
              </div>

              {/* Adoption */}
              <div className="space-y-8">
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
              <div className="space-y-8">
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

      {/* Outcomes & Impact - Full width with fill animation */}
      <div className="relative min-h-screen flex items-center py-32 overflow-hidden">
        {/* Animated background */}
        <div 
          ref={outcomesBgRef}
          className="absolute inset-0 bg-accent-tertiary/5 dark:bg-accent-tertiary/10"
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-20">
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
            Outcomes & Impact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Organizational Impact */}
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                Organisational impact
              </h3>
              
              <div className="space-y-6 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
                <ul className="list-disc pl-8 space-y-4">
                  <li>Blok is now the <strong>default UI foundation</strong> for Sitecore Marketplace apps</li>
                  <li>3 teams fully migrated; all others have Blok on their 2026 roadmap</li>
                  <li>Blok is used across design, engineering, product, and executive prototyping</li>
                </ul>
              </div>
            </div>

            {/* AI-SDLC Validation */}
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                AI-SDLC validation
              </h3>
              
              <div className="space-y-6 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
                <p>
                  During an internal AI-SDLC workshop, I enabled every participant to prototype using Blok.
                </p>
                <p>
                  The resulting demos:
                </p>
                <ul className="list-disc pl-8 space-y-3">
                  <li>Looked cohesive</li>
                  <li>Were on-brand</li>
                  <li>Required minimal design input</li>
                </ul>
                <p>
                  These were presented to the CPO and CTO, who explicitly praised the <strong>quality and refinement</strong> enabled by Blok.
                </p>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-white dark:bg-gray-900 p-12">
              <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary mb-12">
                Metrics (directional)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="text-center">
                  <div 
                    className="text-5xl md:text-6xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary mb-4"
                  >
                    ~10k
                  </div>
                  <div className="text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary opacity-70">
                    Estimated monthly installs via registry
                  </div>
                </div>
                <div className="text-center">
                  <div 
                    className="text-5xl md:text-6xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary mb-4"
                  >
                    100%
                  </div>
                  <div className="text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary opacity-70">
                    Adoption in new marketplace extensions
                  </div>
                </div>
                <div className="text-center">
                  <div 
                    className="text-5xl md:text-6xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary mb-4"
                  >
                    3+
                  </div>
                  <div className="text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary opacity-70">
                    Teams fully migrated
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-video bg-gray-300 dark:bg-gray-700">
              <div className="w-full h-full flex items-center justify-center text-text-secondary opacity-50 text-xl">
                [Placeholder: Impact visualization or dashboard]
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reflection */}
      <div className="min-h-screen flex items-center py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-20">
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
              Reflection & Learning
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* What I would change */}
              <div className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                  What I would change
                </h3>
                
                <div className="space-y-6 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
                  <p>
                    We initially over-customised components to preserve legacy visual behaviour. This came at a cost:
                  </p>
                  <ul className="list-disc pl-8 space-y-3">
                    <li>We overwrote parts of Radix's native structure</li>
                    <li>AI tools performed worse as a result</li>
                  </ul>
                  <p>
                    In hindsight, we should have accepted more behavioural change in favour of <strong>AI and architectural alignment</strong>.
                  </p>
                </div>
              </div>

              {/* What this taught me */}
              <div className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                  What this taught me
                </h3>
                
                <div className="space-y-6 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
                  <p>
                    This was my first end-to-end platform initiative with:
                  </p>
                  <ul className="list-disc pl-8 space-y-3">
                    <li>Roadmap ownership</li>
                    <li>Executive visibility</li>
                    <li>Cross-org dependency management</li>
                  </ul>
                  <p>
                    I learned how to:
                  </p>
                  <ul className="list-disc pl-8 space-y-3">
                    <li>Balance design purity with system leverage</li>
                    <li>Drive adoption through narrative, not mandate</li>
                    <li>Operate comfortably between designer, PM, and technical partner roles</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-12 md:p-16 bg-accent-tertiary rounded-2xl shadow-2xl">
              <p className="text-xl md:text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-[#222222] leading-relaxed">
                Blok fundamentally changed how Sitecore builds, prototypes, and aligns, and reshaped how I think about design systems as <strong>organisational infrastructure</strong>, not UI libraries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
