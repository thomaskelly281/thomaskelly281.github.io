'use client';

import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export type CaseStudyRevealItem = {
  title: string;
  body: string;
};

const headingClassName =
  'text-xl font-[family-name:var(--font-sfpro)] font-medium leading-[1.8] text-text-secondary md:text-2xl md:leading-[1.85]';

/** Triangle positions for three items: top-left, bottom-center, top-right. */
const TRIANGLE_LAYOUT = [
  'md:col-start-1 md:row-start-1',
  'md:col-start-2 md:row-start-2',
  'md:col-start-3 md:row-start-1',
] as const;

function RevealCell({
  item,
  isOpen,
  onToggle,
  className = '',
}: {
  item: CaseStudyRevealItem;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <li className={`flex flex-col items-center text-center ${className}`}>
      <h3 className={`max-w-xs ${headingClassName}`}>
        <span
          className={
            isOpen
              ? 'box-decoration-clone px-0.5 [-webkit-box-decoration-break:clone] [background-image:linear-gradient(transparent_40%,var(--accent-tertiary-muted)_40%)]'
              : undefined
          }
        >
          {item.title}
        </span>
      </h3>

      <button
        type="button"
        className={`group mt-5 grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-[background-color,border-color] duration-300 ${
          isOpen
            ? 'border-transparent bg-accent-tertiary text-[#222222]'
            : 'border-text-secondary/12 bg-background text-text-secondary hover:border-text-secondary/25'
        }`}
        aria-expanded={isOpen}
        aria-label={isOpen ? `Hide details for ${item.title}` : `Show details for ${item.title}`}
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

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-sm overflow-hidden"
          >
            <p className="mt-5 text-base font-[family-name:var(--font-sfpro)] leading-relaxed text-text-secondary/72 md:text-lg">
              {item.body}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
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
          isOpen={openIndices.has(index)}
          onToggle={() => toggle(index)}
          className={useTriangle ? TRIANGLE_LAYOUT[index] : ''}
        />
      ))}
    </ul>
  );
}
