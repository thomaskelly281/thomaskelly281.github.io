import Link from 'next/link';

interface CaseStudyHeroProps {
  title: string;
  subtitle: string;
  timeline?: string;
  imageSrc: string;
  imageAlt: string;
  imageFrame?: 'default' | 'purple';
  cta?: {
    label: string;
    href: string;
  };
}

export function CaseStudyHero({
  title,
  subtitle,
  timeline,
  imageSrc,
  imageAlt,
  imageFrame = 'default',
  cta,
}: CaseStudyHeroProps) {
  return (
    <header>
      <div className="mx-auto w-full max-w-[100rem] px-6 py-24 md:px-10 md:py-32 lg:px-14 lg:py-36">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div className="space-y-8">
            <h1 className="font-[family-name:var(--font-georgia)] text-6xl leading-[0.92] text-text-secondary sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              {title}
            </h1>

            <div className="max-w-2xl space-y-3">
              <p className="text-xl font-[family-name:var(--font-ppvalve)] font-medium leading-snug text-text-secondary md:text-2xl">
                {subtitle}
              </p>
              {timeline ? (
                <p className="text-base font-[family-name:var(--font-sfpro)] leading-relaxed text-text-secondary/55 md:text-lg">
                  {timeline}
                </p>
              ) : null}
            </div>

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
            {imageFrame === 'purple' ? (
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#6E3FFF] p-4 md:p-6">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="h-full w-full rounded-xl object-cover shadow-lg"
                />
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl bg-text-secondary/[0.03] shadow-[0_24px_80px_-32px_rgba(34,34,34,0.18)]">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
