'use client';

import { forwardRef, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useGSAP } from '../contexts/GSAPContext';

const WORK_IMAGES = [
  '/thumbs/blokthumb.webp',
  '/thumbs/agenticthumb.webp',
];

interface WorkProject {
  id: string;
  href: string;
  image: string;
  imageAlt: string;
  icon: string;
  iconAlt: string;
  iconWidth: number;
  iconHeight: number;
  iconDataAttr: 'data-blok-icon' | 'data-star-icon';
  title: string;
  description: string;
}

const WORK_PROJECTS: WorkProject[] = [
  {
    id: 'blok',
    href: '/blok',
    image: WORK_IMAGES[0],
    imageAlt: 'Blok Design System',
    icon: '/SVGs/blok.svg',
    iconAlt: 'Blok icon',
    iconWidth: 42,
    iconHeight: 32,
    iconDataAttr: 'data-blok-icon',
    title: 'Blok',
    description: 'Design system',
  },
  {
    id: 'agentic-studio',
    href: '/agentic-studio',
    image: WORK_IMAGES[1],
    imageAlt: 'Agentic Studio',
    icon: '/SVGs/star.svg',
    iconAlt: 'Star icon',
    iconWidth: 40,
    iconHeight: 40,
    iconDataAttr: 'data-star-icon',
    title: 'Agentic Studio',
    description: 'AI agents',
  },
];

export const WorkSection = forwardRef<HTMLElement>((props, ref) => {
  const { gsap, ScrollTrigger } = useGSAP();
  const internalRef = useRef<HTMLElement>(null);
  const sectionRef = (ref as React.RefObject<HTMLElement>) || internalRef;
  const project1Ref = useRef<HTMLAnchorElement>(null);
  const project2Ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!gsap || !ScrollTrigger || !sectionRef.current) return;

    const projectRefs = [project1Ref.current, project2Ref.current];
    const triggers: ScrollTrigger[] = [];

    projectRefs.forEach((projectEl, index) => {
      if (!projectEl) return;

      const image = projectEl.querySelector(`[data-project-${index + 1}-image]`);
      const text = projectEl.querySelector(`[data-project-${index + 1}-text]`);

      if (image) {
        gsap.set(image, { opacity: 0, y: 30 });
        const imageAnimation = gsap.fromTo(
          image,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: 'power3.out' }
        );

        triggers.push(
          ScrollTrigger.create({
            trigger: image,
            start: 'top 85%',
            end: 'top 20%',
            animation: imageAnimation,
            scrub: 1,
          })
        );
      }

      if (text) {
        gsap.set(text, { opacity: 1, y: 16 });
        const textAnimation = gsap.fromTo(
          text,
          { y: 16 },
          { y: 0, ease: 'power2.out' }
        );

        triggers.push(
          ScrollTrigger.create({
            trigger: text,
            start: 'top 90%',
            end: 'top 55%',
            animation: textAnimation,
            scrub: 0.5,
          })
        );
      }
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [gsap, ScrollTrigger, sectionRef]);

  useEffect(() => {
    if (!gsap) return;

    const animations: gsap.core.Timeline[] = [];
    let timeoutId: NodeJS.Timeout | null = null;

    const initAnimation = () => {
      const blokIcons = document.querySelectorAll('[data-blok-icon]');
      if (blokIcons.length === 0) {
        timeoutId = setTimeout(initAnimation, 100);
        return;
      }

      blokIcons.forEach((blokIcon) => {
        const bounceTimeline = gsap.timeline({ repeat: -1 });

        bounceTimeline
          .to(blokIcon, {
            y: -8,
            scaleY: 1.1,
            scaleX: 0.95,
            duration: 0.3,
            ease: 'power2.out',
          })
          .to(blokIcon, {
            y: 0,
            scaleY: 0.9,
            scaleX: 1.05,
            duration: 0.3,
            ease: 'power2.in',
          })
          .to(blokIcon, {
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
      animations.forEach((anim) => anim.kill());
    };
  }, [gsap]);

  useEffect(() => {
    if (!gsap) return;

    const animations: gsap.core.Tween[] = [];
    let timeoutId: NodeJS.Timeout | null = null;

    const initAnimation = () => {
      const starIcons = document.querySelectorAll('[data-star-icon]');
      if (starIcons.length === 0) {
        timeoutId = setTimeout(initAnimation, 100);
        return;
      }

      starIcons.forEach((starIcon) => {
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
      animations.forEach((anim) => anim.kill());
    };
  }, [gsap]);

  const projectRefs = [project1Ref, project2Ref];

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full px-4 sm:px-6 lg:px-8 py-20 md:py-32 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {WORK_PROJECTS.map((project, index) => (
            <Link
              key={project.id}
              ref={projectRefs[index]}
              href={project.href}
              className="group flex flex-col cursor-pointer"
            >
              <div
                data-work-image
                data-project-image
                {...{ [`data-project-${index + 1}-image`]: true }}
                className="relative w-full aspect-[4/3] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden transition-opacity group-hover:opacity-90"
              >
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div
                {...{ [`data-project-${index + 1}-text`]: true }}
                className="mt-5 md:mt-6 flex flex-col gap-4"
              >
                <div className="accent-icon-bg w-14 h-14 md:w-16 md:h-16 p-2.5">
                  <img
                    {...{ [project.iconDataAttr]: true }}
                    src={project.icon}
                    alt={project.iconAlt}
                    width={project.iconWidth}
                    height={project.iconHeight}
                    className="max-w-full max-h-full object-contain"
                    style={
                      project.iconDataAttr === 'data-star-icon'
                        ? { transformStyle: 'preserve-3d' }
                        : undefined
                    }
                  />
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary mb-1.5">
                    {project.title}
                  </h3>
                  <p className="text-lg md:text-xl font-[family-name:var(--font-sfpro)] text-text-secondary opacity-90">
                    {project.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
});

WorkSection.displayName = 'WorkSection';
