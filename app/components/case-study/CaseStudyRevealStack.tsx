import { ReactNode } from 'react';

export type CaseStudyRevealItem = {
  title: string;
  body: ReactNode;
};

const ROW_TITLE =
  'text-xl font-[family-name:var(--font-sfpro)] font-medium leading-snug text-text-secondary md:text-2xl';
const ROW_BODY =
  'text-base font-[family-name:var(--font-sfpro)] leading-relaxed text-text-secondary/90 md:text-lg';

const BLOK_FOUNDATION = '#E5FF20';

function TitleHighlight({ children }: { children: ReactNode }) {
  return (
    <span
      className="box-decoration-clone px-1 [-webkit-box-decoration-break:clone]"
      style={{
        backgroundImage: `linear-gradient(
          transparent 40%,
          color-mix(in srgb, ${BLOK_FOUNDATION} 22%, transparent) 40%
        )`,
      }}
    >
      {children}
    </span>
  );
}

/** Triangle: two top cards at half width, bottom card full width for readable line length. */
const TRIANGLE_LAYOUT = [
  'md:col-start-1 md:row-start-1',
  'md:col-span-2 md:row-start-2',
  'md:col-start-2 md:row-start-1',
] as const;

function RevealCell({
  item,
  index,
  className = '',
}: {
  item: CaseStudyRevealItem;
  index: number;
  className?: string;
}) {
  return (
    <li className={`min-w-0 w-full ${className}`}>
      <article
        className="rounded-2xl bg-text-secondary/[0.04] px-5 py-5 text-left shadow-[0_24px_80px_-28px_rgba(34,34,34,0.22)] md:px-6 md:py-6"
      >
        <p
          className="font-[family-name:var(--font-georgia)] text-4xl leading-none text-text-secondary/20 md:text-5xl"
          aria-hidden
        >
          {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className={`mt-3 ${ROW_TITLE}`}>
          <TitleHighlight>{item.title}</TitleHighlight>
        </h3>
        <div className={`mt-5 space-y-4 ${ROW_BODY}`}>{item.body}</div>
      </article>
    </li>
  );
}

export function CaseStudyRevealStack({
  items,
}: {
  items: CaseStudyRevealItem[];
}) {
  const useTriangle = items.length === 3;

  return (
    <ul
      className={
        useTriangle
          ? 'mt-10 grid w-full grid-cols-1 gap-12 md:mt-14 md:grid-cols-2 md:gap-x-10 md:gap-y-16 lg:gap-x-14'
          : 'mt-10 grid w-full grid-cols-1 gap-12 md:mt-14 md:grid-cols-3 md:gap-x-8 md:gap-8'
      }
    >
      {items.map((item, index) => (
        <RevealCell
          key={item.title}
          item={item}
          index={index}
          className={useTriangle ? TRIANGLE_LAYOUT[index] : ''}
        />
      ))}
    </ul>
  );
}
