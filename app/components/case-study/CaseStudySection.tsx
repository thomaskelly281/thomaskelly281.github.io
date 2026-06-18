import { ReactNode } from 'react';

interface CaseStudySectionProps {
  number: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'muted' | 'accent';
  layout?: 'sidebar' | 'stacked';
}

export function CaseStudySection({
  number,
  title,
  intro,
  children,
  className = '',
  variant = 'default',
  layout = 'sidebar',
}: CaseStudySectionProps) {
  const variantClasses = {
    default: 'bg-background',
    muted: 'bg-text-secondary/[0.02]',
    accent: 'bg-accent-tertiary text-[#222222]',
  };

  const header = (
    <>
      <p
        className={`mb-4 text-xs font-[family-name:var(--font-ppvalve)] font-medium uppercase tracking-[0.24em] ${
          variant === 'accent' ? 'text-[#222222]/45' : 'text-text-secondary/45'
        }`}
      >
        {number}
      </p>
      <h2
        className={`text-3xl font-[family-name:var(--font-ppvalve)] font-medium leading-tight md:text-4xl ${
          variant === 'accent' ? 'text-[#222222]' : 'text-text-secondary'
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-5 text-base font-[family-name:var(--font-sfpro)] leading-relaxed md:text-lg ${
            variant === 'accent' ? 'text-[#222222]/75' : 'text-text-secondary/70'
          }`}
        >
          {intro}
        </p>
      ) : null}
    </>
  );

  if (layout === 'stacked') {
    return (
      <section className={`${variantClasses[variant]} ${className}`}>
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
          <div className="max-w-3xl">{header}</div>
          <div className="mt-14">{children}</div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${variantClasses[variant]} ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            {header}
          </div>

          <div className="lg:col-span-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
