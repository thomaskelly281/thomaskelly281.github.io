'use client';

import { ReactNode } from 'react';
import { Footer } from '../Footer';
import { CaseStudyHero } from './CaseStudyHero';
import { CaseStudyCarousel } from './CaseStudyCarousel';
import { CaseStudyRevealStack } from './CaseStudyRevealStack';

const GOAL_COLORS = {
  foundation: '#E5FF20',
  efficiency: '#7CFFCB',
  ai: '#82C7FF',
  marketplace: '#FF9FCF',
} as const;

const SECTION_SHELL =
  'mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24';
const SECTION_LABEL =
  'text-xs font-[family-name:var(--font-ppvalve)] font-medium uppercase tracking-[0.24em] text-text-secondary/45';
const LEAD_COPY =
  'mt-8 text-xl font-[family-name:var(--font-sfpro)] font-medium leading-[1.8] text-text-secondary md:mt-10 md:text-2xl md:leading-[1.85]';
const ROW_TITLE =
  'text-xl font-[family-name:var(--font-sfpro)] font-medium leading-snug text-text-secondary md:text-2xl';
const ROW_BODY =
  'text-base font-[family-name:var(--font-sfpro)] leading-relaxed md:text-lg';

function GoalPhrase({
  children,
  color,
}: {
  children: ReactNode;
  color: string;
}) {
  return (
    <span
      className="box-decoration-clone px-1 [-webkit-box-decoration-break:clone]"
      style={{
        backgroundImage: `linear-gradient(
          transparent 40%,
          color-mix(in srgb, ${color} 45%, transparent) 40%
        )`,
      }}
    >
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className={SECTION_LABEL}>{children}</p>;
}

function EditorialRows({
  items,
}: {
  items: Array<{ title: ReactNode; body: ReactNode }>;
}) {
  return (
    <ul className="mt-10 space-y-0 md:mt-12">
      {items.map((item, index) => (
        <li
          key={index}
          className="grid grid-cols-1 gap-3 border-t border-text-secondary/10 py-7 md:grid-cols-12 md:gap-8 md:py-8"
        >
          <div className="md:col-span-5">
            <p className={ROW_TITLE}>{item.title}</p>
          </div>
          <div className="md:col-span-7">
            <div className={`space-y-4 ${ROW_BODY}`}>{item.body}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

const RESULTS = [
  {
    color: GOAL_COLORS.foundation,
    metric: '100% NPD adoption',
    body: 'All Sitecore new product developments are committed to be built using Blok as its primary component library. This will ensure a consistent design language across all products and reduce future technical debt',
  },
  {
    color: GOAL_COLORS.foundation,
    metric: '+4 product migrations',
    body: '4 existing products have completed migrations to Blok, and more are undertaking the process. This will reduce our future maintenance and upgrade costs.',
  },
  {
    color: GOAL_COLORS.efficiency,
    metric: '29% bug ticket reduction',
    body: 'Jira tickets related to component issues decreased by 29% vs the previous 6 month period, meaning developers spent more time building and less time fixing.',
  },
  {
    color: GOAL_COLORS.ai,
    metric: 'Visible increase in AI initiatives',
    body: 'Across Sitecore product, sakles, and marketing teams there was a visible increase in the push for AI-driven prototyping initiatives. The majority of which have been setup by architects to use Blok.',
  },
  {
    color: GOAL_COLORS.ai,
    metric: 'Automated distribution',
    body: 'Blok is now automatically distributed across Sitecore repositories as part of our AI product context. All AI-developed products use Blok natively, which helps reduce design system deviations, technical debt, and poor user experiences, while speeding up adoption.',
  },
  {
    color: GOAL_COLORS.marketplace,
    metric: '+60% usage',
    body: 'Over 60% of Sitecore Marketplace applications are using Blok. Providing Blok lowered the barrier to entry for developers to get their applications approved during the UX review stage of the approval process as Blok adheres to Sitecore UX standards.',
  },
] as const;

const DESIGN_DECISIONS = [
  {
    color: GOAL_COLORS.foundation,
    title: 'Governance by design',
    body: (
      <>
        <p>
          Shadcn&apos;s registry-based model let us publish stable core components
          individually, extend them without editing the core, and update safely
          without breaking downstream work.
        </p>
        <p>This single decision restored long-term governance.</p>
      </>
    ),
  },
  {
    color: GOAL_COLORS.efficiency,
    title: 'Framework-friendly',
    body: (
      <>
        <p>
          A fully framework-agnostic system was explored, then rejected for team
          size, maintenance overhead, and delivery timelines.
        </p>
        <p>
          Shadcn struck the right balance: compatible with major React
          frameworks, minimally opinionated foundations in Radix and Tailwind,
          and room to layer Sitecore&apos;s design language on top.
        </p>
      </>
    ),
  },
  {
    color: GOAL_COLORS.ai,
    title: 'AI-native by default',
    body: (
      <p>
        Shadcn is widely documented, commonly used in AI training data, and
        natively supported by tools like Vercel v0. That made Blok legible to
        AI, unlocking a new class of on-brand prototyping workflows.
      </p>
    ),
  },
] as const;

const STEPS = [
  {
    title: 'Migrating components',
    body: 'I audited existing Blok components against Shadcn’s baseline, decided what to keep, adapt, or retire, and tracked the work in Jira. Development started as a community effort, with engineers from adopting teams and me reviewing PRs.',
  },
  {
    title: 'Building a better developer experience',
    body: 'I interviewed designers and developers on how they actually used Blok, documented Sitecore patterns as rules in each component file, and caught issues early with teams implementing the new components.',
  },
  {
    title: 'Adoption & internal GTM',
    body: 'Blok was under-publicised, so I intercepted new projects, presented to 150+ at an R&D town hall, and framed it as an acceleration tool rather than a design asset. Leadership followed, and more initiatives started on Blok.',
  },
  {
    title: 'Getting a team',
    body: 'Once we had budget, I onboarded the new team on Blok’s history, philosophy, and roadmap, wrote their first tickets, and reviewed PRs in grooming and sprint planning until the feedback loop ran itself.',
  },
  {
    title: 'Shipping under constraint',
    body: 'Docs were not ready for Symposium 2025, so we shipped the registry as a Beta with in-file documentation rather than delay the release. Marketplace workshops surfaced pain points firsthand; the official release followed weeks later.',
  },
] as const;

const REFLECTIONS = [
  {
    color: GOAL_COLORS.marketplace,
    title: 'What I would change',
    body: (
      <>
        <p>
          We initially over-customised components to preserve legacy visual
          behaviour from the Chakra v2 version of Blok. That overwrote parts of
          Radix&apos;s native structure, and AI tools performed worse as a result.
        </p>
        <p>
          In hindsight, we should have accepted more behavioural change in favour
          of AI and architectural alignment.
        </p>
      </>
    ),
  },
  {
    color: GOAL_COLORS.ai,
    title: 'What this taught me',
    body: (
      <p>
        This was my first zero-to-one platform initiative as a solo designer and
        acting product manager. I got hands-on with roadmap ownership, executive
        visibility, and cross-org dependency management — learning to balance
        design purity with system leverage, drive adoption through narrative
        rather than mandate, and operate between designer, PM, and technical
        partner.
      </p>
    ),
  },
] as const;

export function BlokCaseStudy() {
  return (
    <div className="min-h-screen bg-background">
      <CaseStudyCarousel
        images={[
          {
            src: '/images/blokcasestudymock.webp',
            alt: 'Blok design system component showcase',
          },
          {
            src: '/images/blokcasestudyheader.webp',
            alt: 'Blok design system',
          },
          {
            src: '/images/blokcasestudyarchitecture.webp',
            alt: 'Blok architecture',
          },
        ]}
      />

      <CaseStudyHero
        title="Blok"
        subtitle="Building Sitecore's Design System for Scale, Governance, and AI"
        timeline="April 2025 - December 2025"
        cta={{ label: 'Visit Blok site', href: 'https://blok.sitecore.com' }}
      />

      <section aria-label="My Role" className="bg-text-secondary/[0.02]">
        <div className={SECTION_SHELL}>
          <SectionLabel>My Role</SectionLabel>
          <div className={`${LEAD_COPY} space-y-6`}>
            <p>
              I was the{' '}
              <GoalPhrase color={GOAL_COLORS.foundation}>
                only product designer on Blok
              </GoalPhrase>
              . I started the initiative with two senior solution architects, we
              then expanded to get a full team of front-end developers and a PM
              for GTM.
            </p>
            <p>
              My responsibilities included setting the roadmap, creating Jira
              tickets, designing the documentation site, creating a community of
              practice, reviewing PRs, and ensuring adoption.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="The goal" className="bg-background">
        <div className={SECTION_SHELL}>
          <SectionLabel>The goal</SectionLabel>
          <p className={LEAD_COPY}>
            Create a design system that{' '}
            <GoalPhrase color={GOAL_COLORS.foundation}>
              affords every Sitecore product a consistent front-end stack
            </GoalPhrase>
            ,{' '}
            <GoalPhrase color={GOAL_COLORS.efficiency}>
              reduces time spent building and maintaining components
            </GoalPhrase>
            , and{' '}
            <GoalPhrase color={GOAL_COLORS.ai}>enables AI-driven development</GoalPhrase>. In the
            shorter term, Blok also needed to{' '}
            <GoalPhrase color={GOAL_COLORS.marketplace}>
              enable Marketplace developers to build on-brand applications
            </GoalPhrase>
            .
          </p>
        </div>
      </section>

      <section aria-label="Why build Blok?" className="bg-text-secondary/[0.02]">
        <div className={SECTION_SHELL}>
          <p className={`text-center ${SECTION_LABEL}`}>Why build Blok?</p>
          <CaseStudyRevealStack
            items={[
              {
                title: 'Governance had broken down',
                body:
                  'Built on Chakra UI v2, any styling deviation meant editing core components — blocking upgrades. Teams froze on old versions or forked styles. Visual drift became the norm, with no enforceable design governance.',
              },
              {
                title: "Couldn't support multiple frameworks",
                body:
                  'Marketplace teams were building on different React stacks. Chakra was opinionated and framework-specific — not a system we could hand to external developers we did not control.',
              },
              {
                title: 'Blok was not AI-friendly',
                body:
                  'Heavily customised, undocumented code made Blok illegible to tools like Cursor, Copilot, and v0. AI could not generate on-brand UI, undermining the speed those tools were supposed to create.',
              },
            ]}
          />
        </div>
      </section>

      <section aria-label="The solution" className="bg-background">
        <div className={SECTION_SHELL}>
          <SectionLabel>The solution</SectionLabel>
          <p className={LEAD_COPY}>
            Rebuild Blok, our design system, on Shadcn UI. This would make it
            framework friendly, afford better governance, and be AI-friendly by
            default.
          </p>
        </div>
      </section>

      <section aria-label="The results" className="bg-text-secondary/[0.02]">
        <div className={SECTION_SHELL}>
          <SectionLabel>The results</SectionLabel>
          <EditorialRows
            items={RESULTS.map((result) => ({
              title: (
                <GoalPhrase color={result.color}>{result.metric}</GoalPhrase>
              ),
              body: <p>{result.body}</p>,
            }))}
          />
        </div>
      </section>

      <section aria-label="Design decisions" className="bg-background">
        <div className={SECTION_SHELL}>
          <SectionLabel>Design decisions</SectionLabel>
          <p className={LEAD_COPY}>
            As the sole designer, partnered with two senior solutions architects,
            I helped evaluate alternative platforms. We chose to rebuild Blok on{' '}
            <GoalPhrase color={GOAL_COLORS.foundation}>Shadcn</GoalPhrase>, not as
            a UI kit, but as an{' '}
            <GoalPhrase color={GOAL_COLORS.ai}>architecture</GoalPhrase>.
          </p>

          <EditorialRows
            items={DESIGN_DECISIONS.map((decision) => ({
              title: (
                <GoalPhrase color={decision.color}>{decision.title}</GoalPhrase>
              ),
              body: decision.body,
            }))}
          />
        </div>
      </section>

      <section aria-label="The steps we took" className="bg-text-secondary/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
          <SectionLabel>The steps we took</SectionLabel>
          <ol className="relative mt-8 border-l border-text-secondary/10 md:mt-10">
            {STEPS.map((step, index) => (
              <li key={step.title} className="relative py-4 pl-8 md:py-5 md:pl-10">
                <span
                  aria-hidden
                  className="absolute left-0 top-[1.35rem] h-2 w-2 -translate-x-1/2 rounded-full bg-text-secondary/25"
                />
                <p className="text-[11px] font-[family-name:var(--font-ppvalve)] font-medium uppercase tracking-[0.18em] text-text-secondary/40">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-1 text-base font-[family-name:var(--font-sfpro)] font-medium text-text-secondary/80 md:text-lg">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm font-[family-name:var(--font-sfpro)] leading-relaxed text-text-secondary/55 md:text-[15px]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-label="Reflection and learning" className="bg-background">
        <div className={SECTION_SHELL}>
          <SectionLabel>Reflection & learning</SectionLabel>
          <p className={LEAD_COPY}>
            Blok fundamentally changed how Sitecore builds, prototypes, and
            aligns, and reshaped how I think about design systems as{' '}
            <GoalPhrase color={GOAL_COLORS.foundation}>
              organisational infrastructure
            </GoalPhrase>
            , not UI libraries.
          </p>

          <EditorialRows
            items={REFLECTIONS.map((item) => ({
              title: <GoalPhrase color={item.color}>{item.title}</GoalPhrase>,
              body: item.body,
            }))}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
