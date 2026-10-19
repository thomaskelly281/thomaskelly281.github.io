import Link from 'next/link';

interface CaseStudyHeroProps {
  title: string;
  subtitle: string;
  timeline?: string;
  role?: string;
  team?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageFrame?: 'default' | 'purple';
  cta?: {
    label: string;
    href: string;
  };
}

function HeroMetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-[family-name:var(--font-ppvalve)] font-medium uppercase tracking-[0.24em] text-text-secondary/45">
        {label}
      </p>
      <p className="mt-2 text-base font-[family-name:var(--font-sfpro)] leading-relaxed text-text-secondary md:text-lg">
        {value}
      </p>
    </div>
  );
}

function HeroCta({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent-tertiary px-6 py-3 text-base font-[family-name:var(--font-ppvalve)] font-medium text-[#222222] transition-opacity hover:opacity-90"
    >
      {label}
    </Link>
  );
}

export function CaseStudyHero({
  title,
  subtitle,
  timeline,
  role,
  team,
  imageSrc,
  imageAlt,
  imageFrame = 'default',
  cta,
}: CaseStudyHeroProps) {
  const hasImage = Boolean(imageSrc);

  return (
    <header>
      <div
        className={
          hasImage
            ? 'mx-auto w-full max-w-[100rem] px-6 py-24 md:px-10 md:py-32 lg:px-14 lg:py-36'
            : 'mx-auto w-full max-w-6xl px-6 pt-8 pb-16 md:px-8 md:pt-10 md:pb-20 lg:pt-12 lg:pb-24'
        }
      >
        <div
          className={
            hasImage
              ? 'grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24'
              : 'w-full space-y-8'
          }
        >
          <div className="space-y-8">
            <div
              className={
                cta
                  ? 'flex flex-col items-start gap-6 sm:flex-row sm:items-start sm:justify-between'
                  : undefined
              }
            >
              <h1 className="min-w-0 font-[family-name:var(--font-georgia)] text-6xl leading-[0.92] text-text-secondary sm:text-7xl md:text-8xl lg:text-[7.5rem]">
                {title}
              </h1>
              {cta ? <HeroCta label={cta.label} href={cta.href} /> : null}
            </div>

            <div className="space-y-6">
              <p className="max-w-2xl text-xl font-[family-name:var(--font-ppvalve)] font-medium leading-snug text-text-secondary md:text-2xl">
                {subtitle}
              </p>
              {role || team ? (
                <div className="grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
                  {role ? <HeroMetaItem label="Role" value={role} /> : null}
                  {team ? <HeroMetaItem label="Team" value={team} /> : null}
                  {timeline ? <HeroMetaItem label="Timeline" value={timeline} /> : null}
                </div>
              ) : timeline ? (
                <p className="text-base font-[family-name:var(--font-sfpro)] leading-relaxed text-text-secondary/65 md:text-lg">
                  {timeline}
                </p>
              ) : null}
            </div>
          </div>

          {hasImage ? (
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
          ) : null}
        </div>
      </div>
    </header>
  );
}
