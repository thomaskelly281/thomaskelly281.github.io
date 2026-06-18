import Link from 'next/link';

interface MetaItem {
  label: string;
  value: string;
}

interface CaseStudyHeroProps {
  title: string;
  subtitle: string;
  meta: MetaItem[];
  imageSrc: string;
  imageAlt: string;
  cta?: {
    label: string;
    href: string;
  };
}

export function CaseStudyHero({
  title,
  subtitle,
  meta,
  imageSrc,
  imageAlt,
  cta,
}: CaseStudyHeroProps) {
  return (
    <header>
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32 lg:py-36">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="space-y-8">
            <p className="text-xs font-[family-name:var(--font-ppvalve)] font-medium uppercase tracking-[0.24em] text-text-secondary/45">
              Case Study
            </p>

            <h1 className="font-[family-name:var(--font-georgia)] text-6xl leading-[0.92] text-text-secondary sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              {title}
            </h1>

            <p className="max-w-xl text-xl font-[family-name:var(--font-ppvalve)] font-medium leading-snug text-text-secondary md:text-2xl">
              {subtitle}
            </p>

            <dl className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2">
              {meta.map((item) => (
                <div key={item.label} className="space-y-2">
                  <dt className="text-xs font-[family-name:var(--font-ppvalve)] font-medium uppercase tracking-[0.18em] text-text-secondary/45">
                    {item.label}
                  </dt>
                  <dd className="text-base font-[family-name:var(--font-sfpro)] leading-relaxed text-text-secondary md:text-lg">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            {cta ? (
              <div className="pt-2">
                <Link
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent-tertiary px-6 py-3 text-base font-[family-name:var(--font-ppvalve)] font-medium text-[#222222] transition-opacity hover:opacity-90"
                >
                  {cta.label}
                </Link>
              </div>
            ) : null}
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl bg-text-secondary/[0.03] shadow-[0_24px_80px_-32px_rgba(34,34,34,0.18)]">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
