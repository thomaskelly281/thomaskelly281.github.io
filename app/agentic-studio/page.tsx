'use client';

import { useEffect, useRef } from 'react';
import { useGSAP } from '../contexts/GSAPContext';
import { Footer } from '../components/Footer';

export default function AgenticStudioPage() {
  const principlesRef = useRef<HTMLDivElement>(null);
  const principle1Ref = useRef<HTMLDivElement>(null);
  const principle2Ref = useRef<HTMLDivElement>(null);
  const principle3Ref = useRef<HTMLDivElement>(null);
  const principle4Ref = useRef<HTMLDivElement>(null);
  const { gsap, ScrollTrigger } = useGSAP();

  // Design Principles staggered animation
  useEffect(() => {
    if (!gsap || !ScrollTrigger || !principlesRef.current) return;

    const principles = [
      principle1Ref.current,
      principle2Ref.current,
      principle3Ref.current,
      principle4Ref.current,
    ].filter(Boolean);

    if (principles.length === 0) return;

    gsap.fromTo(
      principles,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: principlesRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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
                  className="text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] font-[family-name:var(--font-georgia)] text-text-secondary leading-[0.9]"
                >
                  Agentic Studio
                </h1>
                
                <p 
                  className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary max-w-2xl"
                >
                  Designing pioneer marketer workflows through AI enablement
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 max-w-2xl">
                  <div>
                    <h3 className="text-sm font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary opacity-50 mb-3">
                      Role
                    </h3>
                    <p className="text-lg font-[family-name:var(--font-sfpro)] text-text-secondary">
                      Product Designer
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary opacity-50 mb-3">
                      Timeline
                    </h3>
                    <p className="text-lg font-[family-name:var(--font-sfpro)] text-text-secondary">
                      August 2025 - January 2026
                    </p>
                  </div>
                </div>
              </div>

              {/* Right column - Image positioned to overlap */}
              <div className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[45%] lg:mr-8 z-0">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="/images/agenticheader.webp"
                    alt="Agentic Studio Interface"
                    className="w-full h-auto object-contain"
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
                Sitecore Agentic Studio was the productisation of rapid, experimental AI work emerging from Sitecore AI Innovation Labs into a scalable, enterprise-ready platform. Its goal was to enable AI agents, flows, and a universal chat experience that could be embedded across SitecoreAI without slowing down complex marketer workflows or locking the product into brittle UI patterns.
              </p>
              <p>
                As the Product Designer, I was responsible for translating fast-moving, demo-driven Innovation Labs concepts into production-ready experiences that could scale across unknown future agentic use cases. The core challenge was not just visual design, but <strong>systems design</strong>: creating UI structures that could support non-linear workflows, deep customisation, collaboration, and governance while still offering the familiarity and speed of chat.
              </p>
              <p>
                This case study focuses on three intertwined problems:
              </p>
              <ul className="list-disc pl-8 space-y-3 list-accent-bullets">
                <li>Designing scalable, highly customisable UIs for agents and flows</li>
                <li>Integrating chat as a first-class but non-dominant interaction model</li>
                <li>Bridging experimentation and enterprise readiness through cross-team communication</li>
              </ul>
            </div>

            {/* Video Walkthrough */}
            <div className="mt-12 rounded-lg overflow-hidden">
              <div className="w-full rounded-lg p-4" style={{ backgroundColor: '#6E3FFF' }}>
                <div className="rounded-lg overflow-hidden">
                  <video
                    src="/videos/agenticwalkthrough.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Context & Problem Space */}
      <div className="min-h-screen flex items-center py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-16">
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
              Context & Problem Space
            </h2>
            
            <div className="space-y-12">
              <div className="space-y-8 text-lg md:text-xl font-[family-name:var(--font-sfpro)] text-text-secondary max-w-5xl leading-relaxed">
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                    Company & Product Context
                  </h3>
                  <p>
                    Agentic Studio was the bridge between Sitecore AI Innovation Labs and SitecoreAI, forming the foundation for how AI would be delivered across the product suite. Strategically, this work supported Sitecore's shift from a composable product portfolio to a consolidated AI-first platform, in response to increasing competitive pressure.
                  </p>
                  <p>
                    Agentic Studio introduced:
                  </p>
                  <ul className="list-disc pl-8 space-y-3 list-accent-bullets">
                    <li>AI agents and flows that could be configured and reused</li>
                    <li>A universal chat experience accessible from anywhere in SitecoreAI</li>
                    <li>Purpose-built UIs for agentic workflows beyond chat</li>
                  </ul>
                  <p>
                    Agents and flows could be triggered from dashboards, managed centrally in the Agentic area, or interacted with through chat, creating a uniquely complex set of touchpoints.
                  </p>

                  {/* Visual: Touchpoint Complexity */}
                  <div className="mt-8 rounded-lg overflow-hidden">
                    <div className="w-full rounded-lg p-4" style={{ backgroundColor: '#6E3FFF' }}>
                      <div className="rounded-lg overflow-hidden">
                        <img
                          src="/images/agentictouchpoints.webp"
                          alt="Multiple touchpoint diagram showing dashboard, central Agentic area, and chat panel"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-8">
                  <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                    Why This Was Not a "Normal" Design Project
                  </h3>
                  <p>
                    This was not a single feature, but a new product surface being embedded into an existing enterprise ecosystem. The project faced extreme ambiguity due to the pace of AI innovation, with a constant inflow of new requirements from customers and industry changes. We worked under tight timelines (approximately three months to early customer access), and I collaborated directly with a VP who was also the primary engineer. Design decisions had long-term architectural implications, often affecting how all future AI features would be built.
                  </p>
                </div>

                <div className="space-y-6 pt-12 mt-12 border-t border-text-secondary/10">
                  <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                    My Role in Practice
                  </h3>
                  <p>
                    Officially, my role was Product Designer. In practice, I:
                  </p>
                  <ul className="list-disc pl-8 space-y-3 list-accent-bullets">
                    <li>Designed all Agentic Studio and chat experiences in Figma or prototyped them using code</li>
                    <li>Led interaction and systems thinking for agents, flows, and chat</li>
                    <li>Conducted competitor and industry research (e.g. Opal, Google and Microsoft AI tooling)</li>
                    <li>Acted as the design bridge between Innovation Labs and SitecoreAI</li>
                    <li>Owned handover quality, design sign-off, and implementation reviews</li>
                  </ul>
                  <p>
                    I worked most closely with the VP of AI & Innovation, my Design Lead, and Product Design Manager. Decision-making was highly collaborative but fast. I often had to propose a direction based on previous knowledge from Innovation Labs, test it quickly through design, and use that artefact to drive alignment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core UX Problems */}
      <div className="min-h-screen flex items-center py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-16">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                Core UX Problems
              </h2>
              <p className="text-lg md:text-xl font-[family-name:var(--font-sfpro)] text-text-secondary max-w-4xl leading-relaxed">
                Rather than framing this as a list of features, the work revolved around several fundamental UX problems.
              </p>
            </div>

            <div className="space-y-12">
              {/* Problem 1 */}
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                  1. How Do You Represent Agents and Flows?
                </h3>
                <div className="space-y-6 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
                  <p>
                    Early on, we struggled with a binary choice: chat or custom UI. Chat offered speed and flexibility, but broke down for complex, non-linear workflows. Custom UIs offered clarity, but risked being brittle and expensive to maintain.
                  </p>
                  <p>
                    The key insight was that <strong>we did not need to choose</strong>.
                  </p>
                  <p>
                    By designing from small UI modules mapped to agent and flow configurations, we could:
                  </p>
                  <ul className="list-disc pl-8 space-y-3 list-accent-bullets">
                    <li>Render the same agent in chat or full UI</li>
                    <li>Avoid duplicating logic</li>
                    <li>Support future, unknown configurations without rebuilding UIs</li>
                  </ul>

                  {/* Video: Flow Walkthrough */}
                  <div className="mt-8 rounded-lg overflow-hidden">
                    <div className="w-full rounded-lg p-4" style={{ backgroundColor: '#6E3FFF' }}>
                      <div className="rounded-lg overflow-hidden">
                        <video
                          src="/videos/flowwalkthrough.mp4"
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Problem 2 */}
              <div className="space-y-6 pt-8">
                <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                  2. How Do You Handle Non-Linear Workflows?
                </h3>
                <div className="space-y-6 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
                  <p>
                    Unlike chat, agent workflows are not inherently linear. Users could:
                  </p>
                  <ul className="list-disc pl-8 space-y-3 list-accent-bullets">
                    <li>Skip steps</li>
                    <li>Return later</li>
                    <li>Collaborate asynchronously</li>
                  </ul>
                  <p>
                    A purely chat-based model created temporal problems and broke mental models. We addressed this by introducing <strong>Spaces</strong>, an abstraction layer where:
                  </p>
                  <ul className="list-disc pl-8 space-y-3 list-accent-bullets">
                    <li>Chat remained linear and familiar</li>
                    <li>Full agent UIs could be non-linear</li>
                    <li>Collaboration, reviews, and history lived outside chat</li>
                  </ul>
                  <p>
                    This preserved the simplicity of chat while enabling enterprise workflows.
                  </p>

                  {/* Visual: Spaces Concept */}
                  <div className="mt-8 rounded-lg overflow-hidden">
                    <div className="w-full rounded-lg p-4" style={{ backgroundColor: '#6E3FFF' }}>
                      <div className="rounded-lg overflow-hidden">
                        <img
                          src="/images/agenticworkflow.webp"
                          alt="Spaces: Non-linear workflow interface showing chat panel, main work area, and collaboration features"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Problem 3 */}
              <div className="space-y-6 pt-8">
                <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                  3. How Do You Represent Enterprise Content?
                </h3>
                <div className="space-y-6 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
                  <p>
                    Sitecore users work with structured content types (sites, collections, media), not just text. Traditional AI chats do not handle this well.
                  </p>
                  <p>
                    We introduced <strong>Artifacts</strong>: a flexible abstraction capable of representing any generated content type with tailored editing experiences. Artifacts could be grouped, reviewed, and approved consistently, then promoted into SitecoreAI as first-class content.
                  </p>

                  {/* Visual: Artifacts System */}
                  <div className="mt-8 rounded-lg overflow-hidden">
                    <div className="w-full rounded-lg p-4" style={{ backgroundColor: '#6E3FFF' }}>
                      <div className="rounded-lg overflow-hidden">
                        <img
                          src="/images/agenticartifacts.webp"
                          alt="Artifacts: Structured content representation showing different content types with status indicators and workflow"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Traditional Patterns Failed */}
              <div className="p-10 md:p-14 bg-accent-tertiary rounded-2xl mt-12">
                <div className="space-y-6">
                  <h3 className="text-xl md:text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-[#222222]">
                    Why Traditional Patterns Failed
                  </h3>
                  <p className="text-base md:text-lg font-[family-name:var(--font-sfpro)] text-[#222222] leading-relaxed">
                    Standard workflow and chat patterns broke down under:
                  </p>
                  <ul className="list-disc pl-6 space-y-3 text-base md:text-lg font-[family-name:var(--font-sfpro)] text-[#222222]">
                    <li>Non-linear temporality</li>
                    <li>Role-based permissions and visibility</li>
                    <li>Parallel agent execution</li>
                    <li>High output volume (hundreds of artifacts)</li>
                  </ul>
                  <p className="text-base md:text-lg font-[family-name:var(--font-sfpro)] text-[#222222] leading-relaxed">
                    Relying solely on chat would have created an opaque, fragile system that slowed users down. The solution required combining chat familiarity with explicit, purpose-built interfaces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Design Principles */}
      <div className="min-h-screen flex items-center py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-16">
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
              Design Principles
            </h2>
            
            <div ref={principlesRef} className="flex flex-col md:flex-row gap-6">
              <div ref={principle1Ref} className="bg-accent-tertiary rounded-xl p-8 space-y-4 flex-1" style={{ opacity: 0 }}>
                <h3 className="text-xl md:text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-[#222222]">
                  Design for UI first, translate to chat later
                </h3>
                <p className="text-base font-[family-name:var(--font-sfpro)] text-[#222222] leading-relaxed">
                  Optimal workflows should not be constrained by chat metaphors.
                </p>
              </div>

              <div ref={principle2Ref} className="border border-text-secondary/10 rounded-xl p-8 space-y-4 flex-1" style={{ opacity: 0 }}>
                <h3 className="text-xl md:text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                  Atomic over bespoke
                </h3>
                <p className="text-base font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
                  Components must scale combinatorially without UI rewrites.
                </p>
              </div>

              <div ref={principle3Ref} className="bg-accent-tertiary rounded-xl p-8 space-y-4 flex-1" style={{ opacity: 0 }}>
                <h3 className="text-xl md:text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-[#222222]">
                  Linear chat, non-linear spaces
                </h3>
                <p className="text-base font-[family-name:var(--font-sfpro)] text-[#222222] leading-relaxed">
                  Preserve mental models while enabling complexity.
                </p>
              </div>

              <div ref={principle4Ref} className="border border-text-secondary/10 rounded-xl p-8 space-y-4 flex-1" style={{ opacity: 0 }}>
                <h3 className="text-xl md:text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                  Progressive disclosure
                </h3>
                <p className="text-base font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
                  Reduce cognitive load when dealing with high output volume.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Designing for Scalability */}
      <div className="min-h-screen flex items-center py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-16">
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
              Designing for Scalability & Customisation
            </h2>
            
            <div className="space-y-12">
              <div className="space-y-8 text-lg md:text-xl font-[family-name:var(--font-sfpro)] text-text-secondary max-w-5xl leading-relaxed">
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                    Early Mental Models and Why They Changed
                  </h3>
                  <p>
                    Initially, agents and flows were treated as the same concept. This broke down once we introduced collaboration and handovers. A flow could orchestrate agents; an agent could not contain other agents. While technical, this distinction had real UX consequences, especially in builder experiences.
                  </p>
                </div>

                <div className="space-y-6 pt-8">
                  <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                    Managing Customisation Risk
                  </h3>
                  <p>
                    Every customisation option multiplied design and technical debt. To control this, we:
                  </p>
                  <ul className="list-disc pl-8 space-y-3 list-accent-bullets">
                    <li>Designed from atomic components</li>
                    <li>Created shared status signifiers and states</li>
                    <li>Avoided one-off UI variants</li>
                  </ul>
                  <p>
                    This allowed us to support complex configurations without exponential complexity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivering the Chat Experience */}
      <div className="min-h-screen flex items-center py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-16">
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
              Delivering the Chat Experience
            </h2>
            
            <div className="space-y-12">
              <div className="space-y-8 text-lg md:text-xl font-[family-name:var(--font-sfpro)] text-text-secondary max-w-5xl leading-relaxed">
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                    Why Chat Was Essential
                  </h3>
                  <p>
                    Chat was not a nice-to-have. It provided:
                  </p>
                  <ul className="list-disc pl-8 space-y-3 list-accent-bullets">
                    <li>A safe baseline for unknown future use cases</li>
                    <li>A way for users to add rich context beyond forms</li>
                    <li>Familiarity in a fast-moving AI landscape</li>
                  </ul>
                </div>

                <div className="space-y-6 pt-8">
                  <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                    Embedding Chat into an Enterprise Product
                  </h3>
                  <p>
                    We designed:
                  </p>
                  <ul className="list-disc pl-8 space-y-3 list-accent-bullets">
                    <li>A universal chat, accessible via the top navigation</li>
                    <li>A contextual prompt bar, scoped to Agentic work</li>
                  </ul>
                  <p>
                    Key decisions included:
                  </p>
                  <ul className="list-disc pl-8 space-y-3 list-accent-bullets">
                    <li>Push-in side panel vs overlay</li>
                    <li>Undocking chat on builder pages</li>
                    <li>Redirecting actionable work into Spaces for review</li>
                  </ul>
                  <p>
                    This prevented chat from becoming a black box while preserving traceability and collaboration.
                  </p>

                  {/* Visual: Chat Integration */}
                  <div className="mt-12 rounded-lg overflow-hidden">
                    <div className="w-full rounded-lg p-4" style={{ backgroundColor: '#6E3FFF' }}>
                      <div className="rounded-lg overflow-hidden">
                        <img
                          src="/images/agenticchat.webp"
                          alt="Chat integration in enterprise context showing universal chat, contextual prompt bar, and redirect to Space"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-Team Communication */}
      <div className="min-h-screen flex items-center py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-16">
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
              Cross-Team Communication & Influence
            </h2>
            
            <div className="space-y-8 text-lg md:text-xl font-[family-name:var(--font-sfpro)] text-text-secondary max-w-5xl leading-relaxed">
              <p>
                A major part of my role was translating between two modes of working:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-10 md:p-14 bg-accent-tertiary rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#222222" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-[#222222] mb-2">
                        Innovation Labs
                      </h3>
                      <p className="text-base md:text-lg font-[family-name:var(--font-sfpro)] text-[#222222] leading-relaxed">
                        Rapid, demo-driven, minimal constraints
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-10 md:p-14 bg-accent-tertiary rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#222222" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-[#222222] mb-2">
                        Core Product
                      </h3>
                      <p className="text-base md:text-lg font-[family-name:var(--font-sfpro)] text-[#222222] leading-relaxed">
                        Governed, consistent, enterprise-ready
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <p>
                To align teams, I relied heavily on:
              </p>
              <ul className="list-disc pl-8 space-y-3 list-accent-bullets">
                <li>Interactive prototypes for narrative alignment</li>
                <li>Annotated handovers with walkthrough videos</li>
                <li>Follow-up sessions to surface ambiguity early</li>
              </ul>
              <p>
                Pushback, especially from product leadership, was common and healthy. Decisions around chat and agent interaction patterns had platform-wide implications, requiring clear rationale and iteration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Outcomes & Impact */}
      <div className="min-h-screen flex items-center py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-16">
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
              Outcomes & Impact
            </h2>

            <div className="space-y-8">
            {/* Impact Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Impact Card */}
              <div className="border border-text-secondary/10 rounded-xl p-8 space-y-6">
                <h3 className="text-xl md:text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                  Product Impact
                </h3>
                
                <div className="space-y-4 text-base font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                    <p>Established Agentic Studio as the foundation for AI across SitecoreAI</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                    <p>Enabled customers to build and scale their own AI agents</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                    <p>Early partners built 100+ agents within weeks of release</p>
                  </div>
                </div>
              </div>

              {/* Organizational Impact Card */}
              <div className="border border-text-secondary/10 rounded-xl p-8 space-y-6">
                <h3 className="text-xl md:text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                  Organisational Impact
                </h3>
                
                <div className="space-y-4 text-base font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                    <p>Centralised AI ownership within Agentic</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                    <p>Reduced duplicated AI efforts across product teams</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                    <p>Created a reusable system for future AI features</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trade-offs */}
            <div className="border border-text-secondary/10 rounded-xl p-8 space-y-6">
              <h3 className="text-xl md:text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
                Trade-offs Accepted
              </h3>
              
              <div className="space-y-4 text-base font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                  <p>Prioritised UI-based workflows over refining chat for initial release</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-tertiary mt-2 flex-shrink-0"></div>
                  <p>Accepted that chat required further iteration post-launch</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reflection */}
      <div className="min-h-screen flex items-center py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-16">
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
              Reflection
            </h2>

            <div className="space-y-8 text-lg md:text-xl font-[family-name:var(--font-sfpro)] text-text-secondary max-w-5xl leading-relaxed">
              <p>
                This project reinforced several lessons:
              </p>
              <ul className="list-disc pl-8 space-y-3 list-accent-bullets">
                <li>Designing AI systems means designing for uncertainty</li>
                <li>Technical constraints should follow user flows, not the reverse</li>
                <li>Simplicity is harder than complexity, especially in AI</li>
              </ul>
              <p>
                If starting again, I would invest earlier in identifying the most common agent use cases to ground atomic design decisions in concrete scenarios.
              </p>
            </div>

            <div className="p-10 md:p-14 bg-accent-tertiary rounded-2xl">
              <p className="text-lg md:text-xl font-[family-name:var(--font-ppvalve)] font-medium text-[#222222] leading-relaxed">
                This project demonstrates my ability to design scalable systems under extreme ambiguity, translate experimental AI concepts into enterprise UX, and influence cross-functional teams through design thinking. It actively challenges the misconception that AI UX is just chat, and shows how thoughtful systems design can unlock AI's real value in complex products.
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
