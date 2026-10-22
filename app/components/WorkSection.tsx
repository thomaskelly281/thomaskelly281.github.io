'use client';

import { forwardRef, useRef, useEffect, type CSSProperties } from 'react';
import Link from 'next/link';
import { useGSAP } from '../contexts/GSAPContext';
import './WorkSection.css';

const FOLDER_PURPLE = '#6E3FFF';

const PAPER_TRANSFORMS = [
  {
    restRot: '-6deg',
    x: '-26%',
    y: '-64%',
    rot: '-16deg',
    delay: '0ms',
    xTouch: '-10%',
  },
  {
    restRot: '2deg',
    x: '3%',
    y: '-80%',
    rot: '5deg',
    delay: '55ms',
    xTouch: '2%',
  },
  {
    restRot: '7deg',
    x: '28%',
    y: '-56%',
    rot: '18deg',
    delay: '95ms',
    xTouch: '12%',
  },
] as const;

interface WorkProject {
  id: string;
  href: string;
  folderColor: string;
  peekImages: readonly { src: string; alt: string }[];
  backdropImage: string;
  icon: 'blok' | 'star';
  title: string;
  description: string;
  hoverSubheading: string;
}

const WORK_PROJECTS: WorkProject[] = [
  {
    id: 'blok',
    href: '/blok',
    folderColor: FOLDER_PURPLE,
    peekImages: [
      { src: '/images/blok-home.png', alt: 'Blok home' },
      { src: '/images/blok-bloks.png', alt: 'Blok component library' },
      { src: '/images/blok-theming.png', alt: 'Blok theming' },
    ],
    backdropImage: '/thumbs/blokthumb.webp',
    icon: 'blok',
    title: 'Blok',
    description: 'Design system',
    hoverSubheading:
      'One UI for Sitecore product teams, marketplace developers, and AI tools.',
  },
  {
    id: 'agentic-studio',
    href: '/agentic-studio',
    folderColor: FOLDER_PURPLE,
    peekImages: [
      { src: '/images/agentictouchpoints.webp', alt: 'Agentic Studio touchpoints' },
      { src: '/images/agenticartifacts.webp', alt: 'Agentic Studio artifacts' },
      { src: '/images/agenticheader.webp', alt: 'Agentic Studio interface' },
    ],
    backdropImage: '/thumbs/agenticthumb.webp',
    icon: 'star',
    title: 'Agentic Studio',
    description: 'AI agents',
    hoverSubheading:
      'Agents, flows, and chat marketers can open from anywhere in SitecoreAI.',
  },
];

function FolderBack({ id }: { id: string }) {
  const fill = `${id}-back-fill`;

  return (
    <svg viewBox="0 0 200 156" fill="none" aria-hidden>
      <defs>
        <linearGradient id={fill} x1="100" y1="14" x2="100" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--folder-front)" />
          <stop offset="100%" stopColor="var(--folder)" />
        </linearGradient>
      </defs>
      <path
        d="M24 16H70C78 16 83 18 87 24C92 32 96 38 104 42H176C186 42 192 48 192 58V134C192 144 186 150 176 150H24C14 150 8 144 8 134V28C8 20 14 16 24 16Z"
        fill={`url(#${fill})`}
      />
    </svg>
  );
}

function FolderFront({ id }: { id: string }) {
  const fill = `${id}-front-fill`;
  const clip = `${id}-front-clip`;

  return (
    <svg viewBox="0 0 200 156" fill="none" aria-hidden>
      <defs>
        <linearGradient id={fill} x1="100" y1="42" x2="100" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--folder-front)" />
          <stop offset="100%" stopColor="var(--folder)" />
        </linearGradient>
        <clipPath id={clip}>
          <path d="M24 42H176C186 42 192 48 192 58V134C192 144 186 150 176 150H24C14 150 8 144 8 134V50C8 44 14 42 24 42Z" />
        </clipPath>
      </defs>
      <path
        d="M24 42H176C186 42 192 48 192 58V134C192 144 186 150 176 150H24C14 150 8 144 8 134V50C8 44 14 42 24 42Z"
        fill={`url(#${fill})`}
      />
      <g clipPath={`url(#${clip})`}>
        <rect x="8" y="42" width="184" height="12" fill="var(--folder-lip)" opacity="0.22" />
      </g>
    </svg>
  );
}

function FolderGlyph({ icon }: { icon: WorkProject['icon'] }) {
  return (
    <div className="work-folder-icon">
      {icon === 'blok' ? (
        <svg viewBox="0 0 36 32" className="work-folder-icon-glyph" aria-hidden>
          <rect y="10" width="36" height="22" fill="currentColor" />
          <rect width="14" height="8" fill="currentColor" />
          <rect x="22" width="14" height="8" fill="currentColor" />
        </svg>
      ) : (
        <svg viewBox="0 0 36 36" className="work-folder-icon-glyph" aria-hidden>
          <path
            d="M18 0L22.8616 13.1384L36 18L22.8616 22.8616L18 36L13.1384 22.8616L0 18L13.1384 13.1384L18 0Z"
            fill="currentColor"
          />
        </svg>
      )}
    </div>
  );
}

function WorkFolderTile({
  project,
  index,
}: {
  project: WorkProject;
  index: number;
}) {
  const style = {
    '--folder': project.folderColor,
  } as CSSProperties;

  return (
    <Link
      href={project.href}
      className="work-folder-tile is-live"
      style={style}
      data-work-image
    >
      <div
        data-project-image
        {...{ [`data-project-${index + 1}-image`]: true }}
        className="work-folder-stage"
      >
        <div className="work-folder-bob">
          <div className="work-folder-backdrop" aria-hidden>
            <img
              src={project.backdropImage}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="work-folder-scene">
            <div className="work-folder-back">
              <FolderBack id={project.id} />
            </div>

            <div className="work-folder-papers" aria-hidden>
              {project.peekImages.map((image, paperIndex) => {
                const paper = PAPER_TRANSFORMS[paperIndex];
                if (!paper) return null;
                return (
                  <div
                    key={image.src}
                    className="work-folder-paper"
                    style={
                      {
                        '--rest-rot': paper.restRot,
                        '--x': paper.x,
                        '--y': paper.y,
                        '--rot': paper.rot,
                        '--delay': paper.delay,
                        '--x-touch': paper.xTouch,
                        zIndex: paperIndex + 1,
                      } as CSSProperties
                    }
                  >
                    <img
                      src={image.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                );
              })}
            </div>

            <div className="work-folder-front">
              <FolderFront id={project.id} />
            </div>

            <FolderGlyph icon={project.icon} />
          </div>
        </div>
      </div>

      <div
        {...{ [`data-project-${index + 1}-text`]: true }}
        className="work-folder-caption"
      >
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary mb-1.5">
          {project.title}
        </h3>
        <div className="work-folder-caption-subtitle">
          <p className="work-folder-caption-label">{project.description}</p>
          <p className="work-folder-caption-hover" aria-hidden>
            {project.hoverSubheading}
          </p>
        </div>
      </div>
    </Link>
  );
}

export const WorkSection = forwardRef<HTMLElement>((props, ref) => {
  const { gsap, ScrollTrigger } = useGSAP();
  const internalRef = useRef<HTMLElement>(null);
  const sectionRef = (ref as React.RefObject<HTMLElement>) || internalRef;
  const projectRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!gsap || !ScrollTrigger || !sectionRef.current) return;

    const triggers: ScrollTrigger[] = [];

    projectRefs.current.forEach((projectEl, index) => {
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

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full overflow-clip px-4 pt-12 pb-20 sm:px-6 md:pt-20 md:pb-32 lg:px-8 bg-background"
    >
      <div className="mx-auto w-full max-w-5xl space-y-12 md:space-y-16">
        <h2
          data-work-title
          className="work-section-title text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary"
        >
          Work
        </h2>

        <div
          data-work-content
          className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-16 lg:gap-x-20"
        >
          {WORK_PROJECTS.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                projectRefs.current[index] = el;
              }}
            >
              <WorkFolderTile project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

WorkSection.displayName = 'WorkSection';
