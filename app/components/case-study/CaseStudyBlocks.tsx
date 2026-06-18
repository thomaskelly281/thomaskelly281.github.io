import { ReactNode } from 'react';

export function CaseStudyProse({ children }: { children: ReactNode }) {
  return (
    <div className="case-study-prose space-y-6 text-base font-[family-name:var(--font-sfpro)] leading-[1.75] text-text-secondary md:text-lg">
      {children}
    </div>
  );
}

export function CaseStudyCallout({
  children,
  tone = 'default',
}: {
  children: ReactNode;
  tone?: 'default' | 'accent' | 'muted';
}) {
  const toneClasses = {
    default: 'bg-text-secondary/[0.03] text-text-secondary',
    accent: 'bg-accent-tertiary text-[#222222]',
    muted: 'bg-background text-text-secondary',
  };

  const fontClasses =
    tone === 'accent'
      ? 'text-base font-[family-name:var(--font-sfpro)] leading-[1.75] md:text-lg'
      : 'text-lg font-[family-name:var(--font-ppvalve)] font-medium leading-relaxed md:text-xl';

  return (
    <blockquote
      className={`rounded-2xl px-6 py-5 md:px-8 md:py-6 ${fontClasses} ${toneClasses[tone]}`}
    >
      {children}
    </blockquote>
  );
}

function getInsightGridLabel(index: number, format: 'numeric' | 'alpha') {
  if (format === 'alpha') {
    return String.fromCharCode(97 + index);
  }
  return String(index + 1).padStart(2, '0');
}

export function CaseStudyInsightGrid({
  items,
  labelFormat = 'numeric',
}: {
  items: Array<{ title: string; body: ReactNode; result?: string }>;
  labelFormat?: 'numeric' | 'alpha';
}) {
  return (
    <div className="space-y-16 md:space-y-20">
      {items.map((item, index) => (
        <article key={item.title} className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <p
              className={`mb-3 text-xs font-[family-name:var(--font-ppvalve)] font-medium tracking-[0.18em] text-text-secondary/40 ${labelFormat === 'numeric' ? 'uppercase' : ''}`}
            >
              {getInsightGridLabel(index, labelFormat)}
            </p>
            <h3 className="text-2xl font-[family-name:var(--font-ppvalve)] font-medium leading-snug text-text-secondary md:text-[1.75rem]">
              {item.title}
            </h3>
          </div>

          <div className="space-y-5 md:col-span-8">
            <div className="space-y-5 text-base font-[family-name:var(--font-sfpro)] leading-[1.75] text-text-secondary md:text-lg">
              {item.body}
            </div>
            {item.result ? (
              <p className="rounded-xl bg-accent-tertiary px-5 py-4 text-base font-[family-name:var(--font-sfpro)] leading-relaxed text-[#222222] md:text-lg">
                <span className="font-semibold">Result: </span>
                {item.result}
              </p>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

export function CaseStudySubsections({
  items,
}: {
  items: Array<{ title: string; body: ReactNode; media?: ReactNode }>;
}) {
  return (
    <div className="space-y-16 md:space-y-20">
      {items.map((item) => (
        <article key={item.title} className="space-y-5">
          <h3 className="text-2xl font-[family-name:var(--font-ppvalve)] font-medium leading-snug text-text-secondary md:text-[1.75rem]">
            {item.title}
          </h3>
          <div className="space-y-5 text-base font-[family-name:var(--font-sfpro)] leading-[1.75] text-text-secondary md:text-lg">
            {item.body}
          </div>
          {item.media}
        </article>
      ))}
    </div>
  );
}

export function CaseStudyFeatureCards({
  items,
}: {
  items: Array<{
    title: string;
    body: ReactNode;
    image?: { src: string; alt: string; href?: string };
  }>;
}) {
  return (
    <div className="space-y-5">
      {items.map((item, index) => (
        <article
          key={item.title}
          className="overflow-hidden rounded-2xl bg-accent-tertiary"
        >
          {item.image ? (
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="space-y-4 p-6 md:p-8 lg:col-span-7">
                <p className="text-xs font-[family-name:var(--font-ppvalve)] font-medium uppercase tracking-[0.18em] text-[#222222]/45">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-[#222222]">
                  {item.title}
                </h3>
                <div className="space-y-4 text-sm font-[family-name:var(--font-sfpro)] leading-relaxed text-[#222222]/85 md:text-base">
                  {item.body}
                </div>
              </div>

              <div className="flex items-center bg-[#6E3FFF] p-4 md:p-6 lg:col-span-5">
                {item.image.href ? (
                  <a
                    href={item.image.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full overflow-hidden rounded-xl shadow-lg"
                  >
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      className="w-full object-cover"
                    />
                  </a>
                ) : (
                  <div className="w-full overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      className="w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4 p-6 md:p-8">
              <p className="text-xs font-[family-name:var(--font-ppvalve)] font-medium uppercase tracking-[0.18em] text-[#222222]/45">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-[#222222]">
                {item.title}
              </h3>
              <div className="space-y-4 text-sm font-[family-name:var(--font-sfpro)] leading-relaxed text-[#222222]/85 md:text-base">
                {item.body}
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

export function CaseStudyTimeline({
  items,
}: {
  items: Array<{
    title: string;
    body: ReactNode;
    media?: ReactNode;
  }>;
}) {
  return (
    <div className="relative space-y-12 before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-px before:bg-text-secondary/10 md:space-y-16">
      {items.map((item, index) => (
        <article key={item.title} className="relative pl-10 md:pl-12">
          <div className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-text-secondary/15 bg-background">
            <span className="text-[10px] font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
              {index + 1}
            </span>
          </div>

          <div className="space-y-5">
            <h3 className="text-2xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary md:text-[1.75rem]">
              {item.title}
            </h3>
            <div className="space-y-5 text-sm font-[family-name:var(--font-sfpro)] leading-relaxed text-text-secondary md:text-base">
              {item.body}
            </div>
            {item.media}
          </div>
        </article>
      ))}
    </div>
  );
}

export function CaseStudyMetricGrid({
  metrics,
}: {
  metrics: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-2xl bg-accent-tertiary px-6 py-7 md:px-7"
        >
          <p className="mb-2 text-4xl font-[family-name:var(--font-ppvalve)] font-medium text-[#222222] md:text-5xl">
            {metric.value}
          </p>
          <p className="text-sm font-[family-name:var(--font-sfpro)] leading-snug text-[#222222]/70 md:text-base">
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function CaseStudyImageFrame({
  src,
  alt,
  href,
  className = '',
}: {
  src: string;
  alt: string;
  href?: string;
  className?: string;
}) {
  const linkHref = href ?? src;

  return (
    <a
      href={linkHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`block ${className}`}
    >
      <div className="overflow-hidden rounded-2xl bg-[#6E3FFF] p-4">
        <img src={src} alt={alt} className="w-full rounded-xl object-cover shadow-lg" />
      </div>
    </a>
  );
}

export function CaseStudyVideoFrame({
  src,
  href,
  className = '',
}: {
  src: string;
  href?: string;
  className?: string;
}) {
  const linkHref = href ?? src;

  return (
    <a
      href={linkHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`block ${className}`}
    >
      <div className="overflow-hidden rounded-2xl bg-[#6E3FFF] p-4">
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="w-full rounded-xl shadow-lg"
        />
      </div>
    </a>
  );
}

export function CaseStudyDetailList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-sm font-[family-name:var(--font-sfpro)] leading-relaxed text-text-secondary/85 md:text-base"
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-tertiary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CaseStudySplitCards({
  items,
}: {
  items: Array<{ title: string; body: ReactNode }>;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-2xl bg-text-secondary/[0.03] p-6 md:p-8"
        >
          <h3 className="mb-5 text-xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary md:text-2xl">
            {item.title}
          </h3>
          <div className="space-y-4 text-sm font-[family-name:var(--font-sfpro)] leading-relaxed text-text-secondary md:text-base">
            {item.body}
          </div>
        </article>
      ))}
    </div>
  );
}
