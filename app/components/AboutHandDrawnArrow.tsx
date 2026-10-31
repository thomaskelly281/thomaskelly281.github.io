type AboutHandDrawnArrowProps = {
  direction: 'up' | 'down';
  variant?: 0 | 1;
  className?: string;
};

const STROKES: Record<
  'up' | 'down',
  { shaft: string; head: string }[]
> = {
  down: [
    {
      shaft: 'M24 6 C30 28, 62 18, 48 42 C38 60, 68 66, 52 92',
      head: 'M52 92 L38 80 M52 92 L64 78',
    },
    {
      shaft: 'M46 4 C22 22, 70 34, 38 54 C20 66, 50 80, 40 102',
      head: 'M40 102 L28 90 M40 102 L54 92',
    },
  ],
  up: [
    {
      shaft: 'M52 100 C46 78, 16 88, 30 64 C40 46, 14 40, 32 14',
      head: 'M32 14 L20 26 M32 14 L44 24',
    },
    {
      shaft: 'M34 106 C56 88, 14 74, 42 52 C58 38, 26 26, 36 8',
      head: 'M36 8 L24 20 M36 8 L48 18',
    },
  ],
};

export function AboutHandDrawnArrow({
  direction,
  variant = 0,
  className = '',
}: AboutHandDrawnArrowProps) {
  const stroke = STROKES[direction][variant];

  return (
    <svg
      viewBox="0 0 80 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`h-16 w-14 shrink-0 text-text-secondary md:h-20 md:w-16 ${className}`}
    >
      <path
        d={stroke.shaft}
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={stroke.head}
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
