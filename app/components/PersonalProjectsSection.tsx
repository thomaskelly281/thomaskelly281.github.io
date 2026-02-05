'use client';

import { forwardRef, useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useGSAP } from '../contexts/GSAPContext';
import { MoveRight } from '@/components/animate-ui/icons/move-right';
import { SquareArrowOutUpRight } from '@/components/animate-ui/icons/square-arrow-out-up-right';

interface Project {
  id: string;
  title: string;
  description: string;
  svgPath: string;
  href: string;
  isExternal: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 'Willitbreakdown',
    title: 'Willitbreakdown.com',
    description: 'Car reliability prediction platform',
    svgPath: '/SVGs/wibdlogo.svg',
    href: '/willitbreakdown',
    isExternal: false,
  },
  {
    id: 'Littlerecordplayer',
    title: 'Littlerecordplayer.com',
    description: 'A lofi music app which sparks joy',
    svgPath: '/SVGs/lrplogo.svg',
    href: 'https://littlerecordplayer.com',
    isExternal: true,
  },
  {
    id: 'rheotric',
    title: 'Rhetoric-ds',
    description: 'An AI-agent friendly design system, made in a weekend',
    svgPath: '/SVGs/dslogo.svg',
    href: 'https://rhetoric-ds.vercel.app',
    isExternal: true,
  },
  {
    id: 'recite',
    title: 'Recite (2023)',
    description: 'Public speaking self-confidence improvement app',
    svgPath: '/SVGs/recitelogo.svg',
    href: 'https://recite.space/case_study',
    isExternal: true,
  },
];

export const PersonalProjectsSection = forwardRef<HTMLElement>((props, ref) => {
  const { gsap, ScrollTrigger } = useGSAP();
  const internalRef = useRef<HTMLElement>(null);
  const sectionRef = (ref as React.RefObject<HTMLElement>) || internalRef;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [isWillitbreakdownExpanded, setIsWillitbreakdownExpanded] = useState(false);

  // Scroll animation for section
  useEffect(() => {
    if (!gsap || !ScrollTrigger || !sectionRef.current) return;

    const triggers: ScrollTrigger[] = [];

    // Title animation - reveal from rectangle
    if (titleRef.current) {
      gsap.set(titleRef.current, { clipPath: 'inset(0 100% 0 0)' });
      const titleAnimation = gsap.fromTo(
        titleRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          ease: 'power3.out',
        }
      );

      const titleTrigger = ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 85%',
        end: 'top 50%',
        animation: titleAnimation,
        scrub: 1,
      });
      triggers.push(titleTrigger);
    }

    // Projects animation
    if (projectsRef.current) {
      const projectItems = projectsRef.current.querySelectorAll('[data-project-item]');
      projectItems.forEach((item, index) => {
        // Get divider elements
        const topDivider = item.querySelector('[data-divider-top]');
        const bottomDivider = item.querySelector('[data-divider-bottom]');
        const textContent = item.querySelector('[data-text-content]');

        // Animate top divider (grow from left to right)
        if (topDivider) {
          gsap.set(topDivider, { scaleX: 0, transformOrigin: 'left center' });
          const topDividerAnimation = gsap.fromTo(
            topDivider,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'power2.out',
            }
          );

          const topDividerTrigger = ScrollTrigger.create({
            trigger: item,
            start: 'top 85%',
            end: 'top 50%',
            animation: topDividerAnimation,
            scrub: 1,
          });
          triggers.push(topDividerTrigger);
        }

        // Animate bottom divider (grow from left to right)
        if (bottomDivider) {
          gsap.set(bottomDivider, { scaleX: 0, transformOrigin: 'left center' });
          const bottomDividerAnimation = gsap.fromTo(
            bottomDivider,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'power2.out',
            }
          );

          const bottomDividerTrigger = ScrollTrigger.create({
            trigger: item,
            start: 'top 85%',
            end: 'top 50%',
            animation: bottomDividerAnimation,
            scrub: 1,
          });
          triggers.push(bottomDividerTrigger);
        }

        // Animate text content (reveal from rectangle)
        if (textContent) {
          gsap.set(textContent, { clipPath: 'inset(0 100% 0 0)' });
          const textAnimation = gsap.fromTo(
            textContent,
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0% 0 0)',
              ease: 'power2.out',
            }
          );

          const textTrigger = ScrollTrigger.create({
            trigger: item,
            start: 'top 85%',
            end: 'top 50%',
            animation: textAnimation,
            scrub: 1,
          });
          triggers.push(textTrigger);
        }
      });
    }

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, [gsap, ScrollTrigger, sectionRef]);

  return (
    <section
      ref={sectionRef}
      id="personal-projects"
      className="relative w-full px-4 sm:px-6 lg:px-8 bg-background overflow-hidden mt-32 md:mt-48"
    >
      <div className="max-w-5xl mx-auto w-full pt-20 pb-8">
        <div className="space-y-12 md:space-y-16">
          {/* Heading */}
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary"
          >
            Personal Projects
          </h2>

          {/* Projects Table */}
          <div ref={projectsRef}>
            {PROJECTS.map((project, index) => {
              const isWillitbreakdown = project.id === 'Willitbreakdown';
              const isExpanded = isWillitbreakdown && isWillitbreakdownExpanded;

              const handleClick = (e: React.MouseEvent) => {
                if (isWillitbreakdown) {
                  e.preventDefault();
                  setIsWillitbreakdownExpanded(!isWillitbreakdownExpanded);
                }
              };

              const ProjectContent = (
                <div
                  data-project-item
                  className="relative"
                >
                  <div
                    className="flex items-center gap-4 md:gap-6 p-4 md:p-6 cursor-pointer"
                    onClick={isWillitbreakdown ? handleClick : undefined}
                  >
                    {/* Top Divider */}
                    {index === 0 && (
                      <div
                        data-divider-top
                        className="absolute top-0 left-0 right-0 h-[3px]"
                        style={{ backgroundColor: 'var(--text-secondary)' }}
                      />
                    )}

                    {/* Bottom Divider */}
                    <div
                      data-divider-bottom
                      className="absolute bottom-0 left-0 right-0 h-[3px]"
                      style={{ backgroundColor: 'var(--text-secondary)' }}
                    />

                    {/* SVG Image */}
                    <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16">
                      <img
                        src={project.svgPath}
                        alt={project.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Title and Description */}
                    <div data-text-content className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary mb-1 md:mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm md:text-base lg:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary opacity-70">
                        {project.description}
                      </p>
                    </div>

                    {/* Icon */}
                    <div className="flex-shrink-0 text-text-secondary opacity-60">
                      {project.isExternal ? (
                        <SquareArrowOutUpRight
                          size={24}
                          className="md:w-6 md:h-6"
                        />
                      ) : isWillitbreakdown ? (
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`md:w-6 md:h-6 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
                        >
                          <path d="M9 18L15 12L9 6" />
                        </svg>
                      ) : (
                        <MoveRight
                          size={24}
                          className="md:w-6 md:h-6"
                        />
                      )}
                    </div>
                  </div>

                  {/* Expandable Content for Willitbreakdown */}
                  {isWillitbreakdown && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-4 md:px-6 pb-4 md:pb-6 pl-20 md:pl-28 space-y-4">
                        <p className="text-sm md:text-base lg:text-lg font-[family-name:var(--font-sfpro)] text-text-secondary leading-relaxed">
                          Willitbreakdown.com is a car reliability prediction I created and ran during 2025. Users could input a car model, or paste a URL to a car sale listing and Willitbreakdown.com would create a report on the likely future reliability of the vehicle based on breakdown data, owner sentiment and common failure points of the car's internals. <br /> I took Willitbreakdown.com down for maintenance in December 2025 after starting to undertake a full redesign and rewrite of its codebase.
                        </p>
                        <div className="mt-4">
                          <img
                            src="/images/wibd.webp"
                            alt="Willitbreakdown.com interface"
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );

              if (project.isExternal) {
                return (
                  <a
                    key={project.id}
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {ProjectContent}
                  </a>
                );
              }

              if (isWillitbreakdown) {
                return (
                  <div key={project.id}>
                    {ProjectContent}
                  </div>
                );
              }

              return (
                <Link key={project.id} href={project.href} className="block">
                  {ProjectContent}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

PersonalProjectsSection.displayName = 'PersonalProjectsSection';
