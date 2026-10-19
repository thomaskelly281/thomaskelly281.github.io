'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const SECTION_LABEL =
  'text-sm font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary md:text-base';
const LEAD_COPY =
  'mt-6 text-xl font-[family-name:var(--font-sfpro)] font-medium leading-[1.8] text-text-secondary md:mt-8 md:text-2xl md:leading-[1.85]';
const META_LABEL =
  'text-sm font-[family-name:var(--font-sfpro)] leading-relaxed text-text-secondary/55';

export type BlokStep = {
  id: string;
  navTitle: string;
  title: string;
  lead: string;
  body: string;
  meta: string;
  color: string;
  image: {
    src: string;
    alt: string;
    variant: 'diagram' | 'message';
  };
};

function getScrollParent(element: HTMLElement | null): HTMLElement | null {
  if (!element) return null;
  let parent = element.parentElement;
  while (parent) {
    const { overflowY } = getComputedStyle(parent);
    if (
      (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') &&
      parent.scrollHeight > parent.clientHeight
    ) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
}

function PhaseHighlight({
  color,
  children,
}: {
  color: string;
  children: ReactNode;
}) {
  return (
    <span
      className="box-decoration-clone px-1 [-webkit-box-decoration-break:clone]"
      style={{
        backgroundImage: `linear-gradient(
          transparent 40%,
          color-mix(in srgb, ${color} 45%, transparent) 40%
        )`,
      }}
    >
      {children}
    </span>
  );
}

function PhaseImage({
  step,
  index,
}: {
  step: BlokStep;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  if (step.image.variant === 'message') {
    return (
      <motion.figure
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 md:mt-10"
      >
        <div
          className="flex min-h-[18rem] items-center justify-center rounded-2xl px-6 py-10 md:min-h-[22rem] md:px-12 md:py-14"
          style={{
            background: `linear-gradient(
              165deg,
              color-mix(in srgb, ${step.color} 38%, transparent) 0%,
              color-mix(in srgb, ${step.color} 16%, transparent) 100%
            )`,
          }}
        >
          <img
            src={step.image.src}
            alt={step.image.alt}
            className="mx-auto w-auto max-w-full rounded-xl bg-background shadow-[0_24px_80px_-32px_rgba(34,34,34,0.28)] md:max-w-3xl"
            decoding={index === 0 ? 'sync' : 'async'}
          />
        </div>
      </motion.figure>
    );
  }

  return (
    <motion.figure
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="mt-8 md:mt-10"
    >
      <div className="overflow-hidden rounded-2xl bg-text-secondary/[0.04] shadow-[0_24px_80px_-32px_rgba(34,34,34,0.18)]">
        <div
          aria-hidden
          className="h-1.5 w-full"
          style={{ backgroundColor: step.color }}
        />
        <img
          src={step.image.src}
          alt={step.image.alt}
          className="w-full"
          decoding={index === 0 ? 'sync' : 'async'}
        />
      </div>
    </motion.figure>
  );
}

export function BlokStepsTimeline({
  intro,
  steps,
}: {
  intro: string;
  steps: readonly BlokStep[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);
  const navButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const root = getScrollParent(section);

    const updateActive = () => {
      const rootTop = root ? root.getBoundingClientRect().top : 0;
      const rootHeight = root ? root.clientHeight : window.innerHeight;
      const target = rootTop + rootHeight * 0.28;

      let nextIndex = 0;
      let bestDistance = Infinity;

      chapterRefs.current.forEach((chapter, index) => {
        if (!chapter) return;
        const distance = Math.abs(chapter.getBoundingClientRect().top - target);
        if (distance < bestDistance) {
          bestDistance = distance;
          nextIndex = index;
        }
      });

      setActiveIndex(nextIndex);
    };

    const scrollTarget: HTMLElement | Window = root ?? window;
    scrollTarget.addEventListener('scroll', updateActive, { passive: true });
    updateActive();

    return () => {
      scrollTarget.removeEventListener('scroll', updateActive);
    };
  }, [steps]);

  useEffect(() => {
    const button = navButtonRefs.current[activeIndex];
    if (!button) return;
    const scroller = button.parentElement;
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;
    const left =
      button.offsetLeft - scroller.clientWidth / 2 + button.offsetWidth / 2;
    scroller.scrollTo({
      left: Math.max(0, left),
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [activeIndex, reduceMotion]);

  const scrollToStep = (index: number) => {
    const chapter = chapterRefs.current[index];
    const section = sectionRef.current;
    if (!chapter || !section) return;

    const root = getScrollParent(section);
    if (root) {
      const navOffset = 120;
      const nextTop =
        root.scrollTop +
        (chapter.getBoundingClientRect().top - root.getBoundingClientRect().top) -
        navOffset;
      root.scrollTo({
        top: Math.max(0, nextTop),
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
      return;
    }

    chapter.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const progress = steps.length <= 1 ? 1 : (activeIndex + 1) / steps.length;

  return (
    <section
      ref={sectionRef}
      id="steps"
      aria-label="The steps we took"
    >
      <div className="mx-auto max-w-6xl px-6 pt-24 md:px-8 md:pt-32">
        <p className={SECTION_LABEL}>The steps we took</p>
        <p className={LEAD_COPY}>{intro}</p>
      </div>

      <nav
        aria-label="Initiative phases"
        className="sticky top-0 z-10 mt-10 bg-background/90 backdrop-blur-md md:mt-12"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="relative flex gap-1 overflow-x-auto overscroll-x-contain py-3 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-0 md:overflow-visible md:py-0 [&::-webkit-scrollbar]:hidden">
            {steps.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={step.id}
                  type="button"
                  ref={(node) => {
                    navButtonRefs.current[index] = node;
                  }}
                  aria-current={isActive ? 'step' : undefined}
                  onClick={() => scrollToStep(index)}
                  className="group relative min-w-[8.5rem] flex-1 rounded-xl px-3 py-3 text-left transition-colors hover:bg-text-secondary/[0.03] md:min-w-0 md:rounded-none md:px-4 md:py-5"
                >
                  <span
                    className={`text-xs font-[family-name:var(--font-sfpro)] font-medium tabular-nums tracking-[0.08em] transition-colors ${
                      isActive ? 'text-text-secondary/70' : 'text-text-secondary/40'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`mt-1 block text-sm font-[family-name:var(--font-sfpro)] font-medium leading-snug md:text-[15px] ${
                      isActive ? 'text-text-secondary' : 'text-text-secondary/45'
                    }`}
                  >
                    {isActive ? (
                      <PhaseHighlight color={step.color}>{step.navTitle}</PhaseHighlight>
                    ) : (
                      step.navTitle
                    )}
                  </span>
                </button>
              );
            })}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-0 h-0.5 bg-text-secondary/40 transition-[width] duration-500 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </nav>

      <ol className="mx-auto max-w-6xl px-6 pb-16 pt-12 md:px-8 md:pb-24 md:pt-16">
        {steps.map((step, index) => (
          <li
            key={step.id}
            id={step.id}
            ref={(node) => {
              chapterRefs.current[index] = node;
            }}
            className={`scroll-mt-28 ${index > 0 ? 'mt-20 md:mt-28' : ''}`}
          >
            <article>
              <p
                className="font-[family-name:var(--font-georgia)] text-6xl leading-none text-text-secondary md:text-8xl"
                aria-hidden
              >
                {String(index + 1).padStart(2, '0')}
              </p>

              <h3 className="mt-6 max-w-3xl text-2xl font-[family-name:var(--font-sfpro)] font-medium leading-snug text-text-secondary md:mt-8 md:text-4xl md:leading-tight">
                {step.title}
              </h3>

              <PhaseImage step={step} index={index} />

              <div className="mt-8 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-12 md:gap-10">
                <p className="text-xl font-[family-name:var(--font-sfpro)] font-medium leading-[1.8] text-text-secondary md:col-span-5 md:text-2xl md:leading-[1.7]">
                  {step.lead}
                </p>
                <div className="md:col-span-7">
                  <p className="text-base font-[family-name:var(--font-sfpro)] leading-relaxed text-text-secondary/80 md:text-lg">
                    {step.body}
                  </p>
                  <p className={`mt-5 ${META_LABEL}`}>
                    {step.meta}
                  </p>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
