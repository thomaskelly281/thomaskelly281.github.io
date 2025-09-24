'use client';

import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = [
    { emoji: '🤖', label: 'AI Design', detail: 'I make AI feel intuitive, trustworthy, and useful for real work.' },
    { emoji: '🧩', label: 'Design Systems', detail: 'Lead system tokens, patterns, and accessibility for velocity.' },
    { emoji: '👨‍💻', label: 'Programming', detail: 'Prototype in React/Next.js; automate with TypeScript.' },
    { emoji: '🎓', label: 'Education', detail: 'Interaction Design (NCAD) + Higher Diploma in AI Applications (CCT).' },
    { emoji: '💻', label: 'SaaS', detail: 'Build and ship small tools; learn by launching.' },
    { emoji: '🚗', label: 'Cars', detail: 'Engine rebuilds and bodywork; long-term goal: homebuilt race car.' },
    { emoji: '🏸', label: 'Sports', detail: 'Badminton, running, golf — keeps me balanced.' }
  ];

  const quickFacts = [
    { label: 'Currently', value: 'Designing AI experiences at Sitecore' },
    { label: 'Focus', value: 'AI, agents, and design systems' },
    { label: 'Beyond work', value: 'SaaS products, cars, sport' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
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
          <div className="w-full flex justify-center relative z-10">
            <div className="w-full">
              <h2
                className={`text-4xl font-medium text-black leading-[1.5] transition-all duration-1000 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  fontFamily:
                    'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
              >
                But who is Thomas really?
              </h2>
              
              {/* Content Section */}
              <div
                className={`mt-8 transition-all duration-1000 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
              >
                {/* Intro */}
                <p
                  className="text-lg text-gray-800 leading-relaxed"
                  style={{
                    fontFamily:
                      'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}
                >
                  Thomas blends product design with applied AI. He cares about clarity, pace, and
                  building things that ship. Today he shapes agentic experiences and design systems;
                  after hours he experiments, restores cars, and keeps moving.
                </p>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {tags.map((t, i) => (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => setActiveTag(activeTag === t.label ? null : t.label)}
                      aria-pressed={activeTag === t.label}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-black/20 ${
                        activeTag === t.label ? 'bg-black text-white' : 'bg-gray-100 text-black/80 hover:bg-gray-200'
                      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                      style={{ transitionDelay: isVisible ? `${240 + i * 60}ms` : '0ms' }}
                    >
                      <span aria-hidden className="select-none">{t.emoji}</span>
                      <span
                        style={{
                          fontFamily:
                            'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                        }}
                      >
                        {t.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Active pill panel */}
                <div className={`transition-all duration-500 ${activeTag ? 'max-h-72 mt-4 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                  {activeTag && (
                    <div className="rounded-xl bg-gray-50 border border-black/5 p-5">
                      {tags
                        .filter((t) => t.label === activeTag)
                        .map((t) => (
                          <div key={t.label} className="flex items-start gap-3">
                            <div className="text-2xl select-none" aria-hidden>{t.emoji}</div>
                            <div>
                              <div className="text-sm tracking-wider uppercase text-black/40">{t.label}</div>
                              <div className="mt-1 text-black" style={{
                                fontFamily:
                                  'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                              }}>
                                {t.detail}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* Quick facts */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {quickFacts.map((q, i) => (
                    <div
                      key={q.label}
                      className={`rounded-xl bg-gray-50 p-5 transition-all ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                      }`}
                      style={{ transitionDelay: isVisible ? `${300 + i * 80}ms` : '0ms' }}
                    >
                      <div className="text-xs tracking-wider uppercase text-black/40">{q.label}</div>
                      <div
                        className="mt-2 text-black"
                        style={{
                          fontFamily:
                            'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                        }}
                      >
                        {q.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
