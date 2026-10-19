'use client';

import { ReactNode, useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export type CaseStudyRevealItem = {
  title: string;
  body: string;
};

const ROW_TITLE =
  'text-xl font-[family-name:var(--font-sfpro)] font-medium leading-snug text-text-secondary md:text-2xl';
const ROW_BODY =
  'text-base font-[family-name:var(--font-sfpro)] leading-relaxed text-text-secondary/75 md:text-lg';

const BLOK_FOUNDATION = '#E5FF20';

function TitleHighlight({ children }: { children: ReactNode }) {
  return (
    <span
      className="box-decoration-clone px-1 [-webkit-box-decoration-break:clone]"
      style={{
        backgroundImage: `linear-gradient(
          transparent 40%,
          color-mix(in srgb, ${BLOK_FOUNDATION} 45%, transparent) 40%
        )`,
      }}
    >
      {children}
    </span>
  );
}

/** Triangle positions for three items: top-left, bottom-center, top-right. */
const TRIANGLE_LAYOUT = [
  'md:col-start-1 md:row-start-1',
  'md:col-start-2 md:row-start-2',
  'md:col-start-3 md:row-start-1',
] as const;

function RevealCell({
  item,
  index,
  isOpen,
  onToggle,
  className = '',
}: {
  item: CaseStudyRevealItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <li className={`flex justify-center ${className}`}>
      <div className="relative w-full max-w-[22rem] pb-4 pr-4">
        <article
          className={`rounded-2xl bg-text-secondary/[0.04] px-5 py-5 text-left transition-[box-shadow] duration-300 md:px-6 md:py-6 ${
            isOpen
              ? 'shadow-[0_24px_80px_-28px_rgba(34,34,34,0.22)]'
              : 'shadow-[0_24px_80px_-32px_rgba(34,34,34,0.14)]'
          }`}
        >
          <p
            className="font-[family-name:var(--font-georgia)] text-4xl leading-none text-text-secondary/20 md:text-5xl"
            aria-hidden
          >
            {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className={`mt-3 pr-2 ${ROW_TITLE}`}>
            <TitleHighlight>{item.title}</TitleHighlight>
          </h3>

          <AnimatePresence initial={false}>
            {isOpen ? (
              <motion.div
                key="body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className={`mt-5 ${ROW_BODY}`}>{item.body}</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </article>

        <button
          type="button"
          className={`absolute bottom-0 right-0 z-10 grid h-10 w-10 translate-x-1/4 translate-y-1/4 place-items-center rounded-full border shadow-[0_8px_24px_-8px_rgba(34,34,34,0.2)] transition-[background-color,border-color] duration-300 ${
            isOpen
              ? 'border-transparent bg-accent-tertiary text-[#222222]'
              : 'border-text-secondary/12 bg-background text-text-secondary hover:border-text-secondary/25'
          }`}
          aria-expanded={isOpen}
          aria-label={
            isOpen ? `Hide details for ${item.title}` : `Show details for ${item.title}`
          }
          onClick={onToggle}
        >
          <svg
            viewBox="0 0 24 24"
            width={16}
            height={16}
            className={`block transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
            aria-hidden
          >
            <path
              d="M12 5v14M5 12h14"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}

export function CaseStudyRevealStack({ items }: { items: CaseStudyRevealItem[] }) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(() => new Set());

  const toggle = useCallback((index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  const useTriangle = items.length === 3;

  return (
    <ul
      className={
        useTriangle
          ? 'mt-10 grid grid-cols-1 gap-12 md:mt-14 md:grid-cols-3 md:gap-x-6 md:gap-y-20'
          : 'mt-10 grid grid-cols-1 gap-12 md:mt-14 md:grid-cols-3 md:gap-8'
      }
    >
      {items.map((item, index) => (
        <RevealCell
          key={item.title}
          item={item}
          index={index}
          isOpen={openIndices.has(index)}
          onToggle={() => toggle(index)}
          className={useTriangle ? TRIANGLE_LAYOUT[index] : ''}
        />
      ))}
    </ul>
  );
}
