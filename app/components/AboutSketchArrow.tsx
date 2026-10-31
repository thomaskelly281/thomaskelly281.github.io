'use client';

type AboutSketchArrowProps = {
  /** Which way the arrowhead points — toward the photo */
  direction: 'up' | 'down';
  /** Picks a slightly different hand-drawn curve */
  variant?: 0 | 1;
  className?: string;
};

const ARROWS = {
  up: [
    {
      shaft: 'M86 86 C82 58, 48 44, 62 14',
      head: 'M62 14 L50 26 M62 14 L72 24',
    },
    {
      shaft: 'M58 88 C70 64, 96 42, 74 12',
      head: 'M74 12 L62 22 M74 12 L82 26',
    },
  ],
  down: [
    {
      shaft: 'M52 10 C58 34, 92 48, 70 84',
      head: 'M70 84 L58 72 M70 84 L80 72',
    },
    {
      shaft: 'M84 12 C78 36, 46 50, 60 86',
      head: 'M60 86 L48 74 M60 86 L70 74',
    },
  ],
} as const;

export function AboutSketchArrow({
  direction,
  variant = 0,
  className = '',
}: AboutSketchArrowProps) {
  const { shaft, head } = ARROWS[direction][variant];

  return (
    <svg
      viewBox="0 0 140 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={`h-16 w-28 shrink-0 text-[#222222] dark:text-white md:h-[4.5rem] md:w-32 ${className}`}
    >
      <path
        d={shaft}
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={head}
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
