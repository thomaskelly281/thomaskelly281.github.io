'use client';

import { ReactNode } from 'react';
import { CaseStudyFooter } from './CaseStudyFooter';
import { CaseStudyHero } from './CaseStudyHero';
import { CaseStudyCarousel } from './CaseStudyCarousel';
import { CaseStudyRevealStack } from './CaseStudyRevealStack';
import { BlokStep, BlokStepsTimeline } from './BlokStepsTimeline';

const GOAL_COLORS = {
  foundation: '#E5FF20',
  efficiency: '#7CFFCB',
  ai: '#82C7FF',
  marketplace: '#FF9FCF',
} as const;

const SECTION_SHELL =
  'mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32';
const SECTION_LABEL =
  'text-sm font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary md:text-base';
const SECTION_BODY =
  'text-base font-[family-name:var(--font-sfpro)] leading-relaxed text-text-secondary/90 md:text-lg';
const LEAD_COPY = `mt-6 md:mt-8 ${SECTION_BODY}`;
const ROW_TITLE =
  'text-xl font-[family-name:var(--font-sfpro)] font-medium leading-snug text-text-secondary md:text-2xl';
const ROW_BODY = SECTION_BODY;

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
          color-mix(in srgb, ${color} 22%, transparent) 40%
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
    <ul className="mt-10 divide-y divide-text-secondary/[0.07] md:mt-12">
      {items.map((item, index) => (
        <li key={index}>
          <div className="grid grid-cols-1 gap-3 py-10 md:grid-cols-12 md:gap-10 md:py-12">
            <div className="md:col-span-5">
              <p className={ROW_TITLE}>{item.title}</p>
            </div>
            <div className="md:col-span-7">
              <div className={`space-y-4 ${ROW_BODY}`}>{item.body}</div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Gap({ children }: { children: ReactNode }) {
  return (
    <span className="font-medium" style={{ color: '#FF0000' }}>
      {children}
    </span>
  );
}

function GapBlock({ children }: { children: ReactNode }) {
  return (
    <p className="font-medium" style={{ color: '#FF0000' }}>
      {children}
    </p>
  );
}

function GapImage({ label }: { label: string }) {
  return (
    <figure className="mt-10 md:mt-12">
      <div className="flex min-h-[16rem] items-center justify-center rounded-2xl bg-[#FF0000] px-6 py-10 md:min-h-[22rem] md:px-12">
        <p className="max-w-lg text-center text-base font-[family-name:var(--font-sfpro)] font-medium leading-relaxed text-white md:text-lg">
          {label}
        </p>
      </div>
    </figure>
  );
}

const WHY = [
  {
    title: 'Governance had broken down',
    body: (
      <>
        <p>
          Blok sat on Chakra UI v2. If a team needed a component to look or function differently, they edited the core component.
          Teams often got stuck on old versions due to local updates as once a change was made, dependencies were broken. This drift scaled.
        </p>
      </>
    ),
  },
  {
    title: 'Marketplace teams needed flexibility of tech stack',
    body: (
      <>
        <p>
          With Sitecore Marketplace, developers needed to use their own tech stacks, so we were expected to support that. Chakra, what Blok was built on, did not. So we needed a more framework-friendly solution.
        </p>
      </>
    ),
  },
  {
    title: 'AI tools could not read it',
    body: (
      <>
        <p>
          Cursor, Copilot, and v0 were already how teams prototyped. Blok was
          heavily customised and barely documented, so the tools generated UI
          that was not ours. The speed those tools were supposed to give us
          turned into cleanup.
        </p>
      </>
    ),
  },
] as const;

const GOALS = [
  {
    title: 'The long term goal',
    body: (
      <>
        <p>
          <GoalPhrase color={GOAL_COLORS.foundation}>
            One front-end stack for Sitecore products.
          </GoalPhrase>{' '}
          Less time spent building and patching components. AI tools that
          could generate something which already looked like Sitecore.
        </p>
        <p>
          For completion of this goal we required that new product development defaulted
          to Blok. A secondary win was a reduction in Jira tickets related to component-based blockers with product teams stuck on old component versions.
        </p>
      </>
    ),
  },
  {
    title: 'The short term goal',
    body: (
      <>
        <p>
          This goal needed to be complete by Symposium 2025 (November).
          <br /> {' '}
          <GoalPhrase color={GOAL_COLORS.marketplace}>
            Marketplace developers needed to ship an on-brand app
          </GoalPhrase>{' '}
          without us designing a private system for each of them.
        </p>
        <p>
          Marking this as done meant those apps could get through a UX review of brand and experience coherance, because
          we required our design standards to be met. Blok needed to afford this.
        </p>
      </>
    ),
  },
] as const;

const DECISIONS = [
  {
    title: "Don't bite off more than you can chew",
    body: (
      <p>
        When the two architects and I were evaluating different approaches to rebuilding Blok, we considered a completely framework-agnotsic stack. It would have been perfect and resulted in new product development being supported long into the future. However, this would have meant a longer build time, and much more effort for us to maintain. Given this initiative started as three people, we did not want to take on this burden, so we settled for the next best option, a framework-friendly technology stack.
      </p>
    ),
  },
  {
    title: 'Component governance solved',
    body: (
      <p>
        Shadcn&apos;s registry let us publish components one at a time, let a
        team extend one without opening the core component code, and let us update later
        without breaking work already in flight. That split was the
        governance we needed to ensure we could support product teams and remove update blocks in future.
      </p>
    ),
  },
  {
    title: 'Bring Blok into the modern world',
    body: (
      <p>
        Developrs, designers and PMs all use AI tools to prototype or build functioanlity. We wanted to support this so Blok stood the test of time and was more useful. Shadcn is all over public docs and model training data, and v0
        already speaks it.
        <br />
        <br />
        Thanks to some time spent documenting each component, writing AI skills, and rules files, Blok affords users the ability to build Sitecore-like UI and experiences super easily using AI.
      </p>
    ),
  },
] as const;

const STEPS: BlokStep[] = [
  {
    id: 'audit',
    navTitle: 'Audit',
    title: 'Audit the inheritance',
    lead: 'Start with what existed, not a blank canvas.',
    body: (
      <>
        <p>
          Myself and another Sitecore designer mapped every existing Blok component against Shadcn and
          marked each for which has an existing alternative or not. We made notes of their differences and what the we wanted to include or not.
        </p>
        <p>
          An example of a difference was that the Toast component from Chakra was now called Sonner in Shadcn. We also found that there were differences in the afforded accessibility of Sheet and Drawer, two components which look identical.
        </p>
      </>
    ),
    meta: '',
    color: GOAL_COLORS.foundation,
    images: [
      {
        src: '/images/blokcasestudycollab2.png',
        alt: 'Component audit matrix comparing existing Blok components with Shadcn, colour-coded by keep, adapt, or retire',
        variant: 'diagram',
      },
    ],
  },
  {
    id: 'prioritise',
    navTitle: 'Prioritise',
    title: 'Prioritise what we build',
    lead: 'We need to build the right things.',
    body: (
      <>
        <p>
          Given we were on a really strict timeline, I interviewed stakeholders to get product roadmaps, and spoke with developers to understand what they are building and which components they use most often and find themselves reaching for. From there I could identify which components we needed more urgently in the first wave of building, and based on designer&apos;s mocks which still needed to go through grooming, I could set which components needec to be built in the second and following waves.
        </p>
       
      </>
    ),
    meta: '',
    color: GOAL_COLORS.efficiency,
    images: [
      {
        src: '/images/blokcasestudycollab3.png',
        alt: 'Miro board showing Blok component waves: core components, second wave, and later recipes',
        variant: 'diagram',
      },
    ],
  },
  {
    id: 'adoption',
    navTitle: 'Adoption',
    title: 'Make it a movement',
    lead: 'Blok was under-publicised. Adoption is a GTM problem.',
    body: (
      <>
        <p>
          I caught new projects before they had picked a stack and got them
          onto Blok. I presented it at an R&D town hall, about 150 people,
          and framed it as an acceleration tool rather than a design asset.
          Leadership came with us after that. Teams started on Blok because
          it was the fastest way to look finished and we shared our vision of the future of all of Sitecore on a single stack. Simplifying life for everyone.
        </p>
      </>
    ),
    meta: '',
    color: GOAL_COLORS.ai,
    images: [
      {
        src: '/images/blokcasestudycollab1.png',
        alt: 'Slack message from the Blok channel celebrating the spirit of collaboration',
        variant: 'message',
      },
    ],
  },
  {
    id: 'team',
    navTitle: 'Team',
    title: 'Advocate so loudly you get a team',
    lead: 'A community effort can start a platform. It cannot sustain one.',
    body: (
      <>
        <p>
          Once we had advocated for the need for Blok and got enough backing, Product got us budget and I onboarded the new team on where Blok had come
          from, why it was built this way, and what was still on the roadmap.
          I wrote their first tickets and sat in grooming and sprint planning.
          I kept reviewing PRs until the comments were happening without me
          starting them.
        </p>
      </>
    ),
    meta: '',
    color: GOAL_COLORS.marketplace,
    images: [
      {
        src: '/images/blokcasestudyteam.png',
        alt: 'Slack announcement that Blok would finally be staffed with dedicated front-end developers',
        variant: 'message',
      },
    ],
  },
  {
    id: 'ship',
    navTitle: 'Release',
    title: 'Ship under the spotlight at Symposium',
    lead: 'Symposium 2025 would not wait for the documentation site.',
    body: (
      <>
        <p>
          Hiring took a long time, so the docs site was not ready before our deadline. 
          I made the decision to release Blok as a beta at Symposium, and leave the documentation in the component
          files, because waiting would have meant missing Symposium. A few weeks later we went into full release with the docs site.
        </p>
      </>
    ),
    meta: '',
    color: GOAL_COLORS.foundation,
    images: [
      {
        src: '/images/blokcasestudymock.webp',
        alt: 'Blok documentation and component showcase as shipped',
        variant: 'diagram',
      },
    ],
  },
];

const RESULTS = [
  {
    color: GOAL_COLORS.foundation,
    metric: 'New products committed to Blok',
    body: (
      <>
        <p>
          Every new Sitecore product development is committed to building on
          Blok. This was commited by our CTO after all of our advocacy. Going forward this will allow for more design governance over Sitecore UI and allow for a better developer experience.
        </p>
      </>
    ),
  },
  {
    color: GOAL_COLORS.foundation,
    metric: '4 products migrated',
    body: (
      <>
        <p>
          Four existing products have finished the move to Blok. More are
          partway through with the migrations set to complete before end of 2026.
          <br />
          <br />
          Sitecore is now being rebuilt into a single front-end with Blok as the design system meaning by FY27 all of Sitecore will be using Blok.
        </p>
      </>
    ),
  },
  {
    color: GOAL_COLORS.efficiency,
    metric: '+40% fewer component-related tickets',
    body: (
      <>
        <p>
          Jira tickets about component issues and being blocked fell 29% against the previous
          six months. That time went back into building.
          <br />
          <br />
          We saw a reduction of over 60% in tickets for product teams to create unique components.
        </p>
      </>
    ),
  },
  {
    color: GOAL_COLORS.marketplace,
    metric: '100% marketplace app adoption',
    body: (
      <>
        <p>
          All marketplace apps have used Blok as a dependency when submitted for review as of March 2026.
        </p>
      </>
    ),
  },
  {
    color: GOAL_COLORS.ai,
    metric: 'Prototypes that held together',
    body: (
      <>
        <p>
          At an internal AI workshop I had everyone prototype with Blok. The
          demos looked like they belonged to one product. They were on brand,
          and they needed very little from design. We showed them to the CPO
          and the CTO, who praised the quality.
        </p>
      </>
    ),
  },
] as const;

const REFLECTIONS = [
  {
    title: 'We over-customised the early components',
    body: (
      <>
        <p>
          We bent the first components so they would still behave like Blok
          on Chakra v2. Parts of Radix&apos;s own structure got overwritten.
          AI tools got worse at using those components, because the code stopped
          looking like the thing they knew. Next time I would spend more time evaluating if these changes are important, or if they are a necessary trade-off for what we would otherwise lose.
        </p>
      </>
    ),
  },
  {
    title: 'What stayed with me',
    body: (
      <>
        <p>
          This was my first time having to publically advocate for an initiative to get buy-in from stakeholders and the wider company. It was a great learning experience and I am proud of the work we did to get Blok over the line. Having to speak at a town hall and show how we can work in better ways was something I would love to do again.
        </p>
      </>
    ),
  },
] as const;

export function BlokCaseStudy() {
  return (
    <div className="min-h-screen bg-background">
      <CaseStudyCarousel
        images={[
          {
            src: '/images/blok-home.png',
            alt: 'Blok design system home page',
          },
          {
            src: '/images/blok-bloks.png',
            alt: 'Blok component library overview',
          },
          {
            src: '/images/blok-button.png',
            alt: 'Blok button component documentation',
          },
          {
            src: '/images/blok-button-scroll.gif',
            alt: 'Blok button documentation scroll interaction',
          },
          {
            src: '/images/blok-theming.png',
            alt: 'Blok theming and design tokens',
          },
          {
            src: '/images/blok-graphics.png',
            alt: 'Blok graphics and illustration guidance',
          },
          {
            src: '/images/blok-resources.png',
            alt: 'Blok resources for product teams',
          },
          {
            src: '/images/blok-changelog.png',
            alt: 'Blok changelog and release history',
          },
          {
            src: '/images/blok-card-usage-code.png',
            alt: 'Blok card usage and code examples',
          },
          {
            src: '/images/blok-card-styled-card.png',
            alt: 'Blok styled card component',
          },
          {
            src: '/images/blok-chart-scroll.gif',
            alt: 'Blok chart documentation scroll interaction',
          },
        ]}
      />

      <CaseStudyHero
        title="Blok"
        subtitle="Building a design system so Sitecore product teams, marketplace developers, and AI tools shipped the coherent UI work."
        role="Product designer & acting PM"
        team="2 architects, then FE and a PM"
        timeline="April 2025 to December 2025"
        cta={{ label: 'Visit Blok site', href: 'https://blok.sitecore.com' }}
      />

      <section id="why" aria-label="Why build Blok?">
        <div className={SECTION_SHELL}>
          <SectionLabel>Why build Blok?</SectionLabel>
          <p className={LEAD_COPY}>
            Blok was already Sitecore&apos;s design system. It no longer fit
            the company Sitecore. Blok had the following issues before the rebuild:
          </p>
          <CaseStudyRevealStack items={[...WHY]} />
         
        </div>
      </section>

      <section id="role" aria-label="My Role">
        <div className={SECTION_SHELL}>
          <SectionLabel>My role</SectionLabel>
          <div className={`${LEAD_COPY} space-y-5`}>
            <p>
              I was the only product designer on Blok. For a long stretch I
              was also the person running the roadmap. I started with two
              senior solution architects and no front-end team. I worked as
              the PM until there was budget, and then a go-to-market PM joined
              with the engineers.
            </p>
            <p>
              The users were Sitecore product teams, developers outside the
              company shipping marketplace apps, and the AI tools those teams
              were prompting. The tools count. People were generating UI in
              them whether we had a system they could read or not.
            </p>
            <p>
              I decided what we kept, how a component was documented, and
              whether a new project started on Blok. I reviewed the PRs. When
              the engineers arrived I wrote their first tickets, sat in
              grooming sessions, and stayed until review was happening without me in
              the thread.
            </p>
          </div>
        </div>
      </section>

      <section id="goal" aria-label="The goal">
        <div className={SECTION_SHELL}>
          <SectionLabel>The goal</SectionLabel>
          <EditorialRows
            items={GOALS.map((goal) => ({
              title: goal.title,
              body: goal.body,
            }))}
          />
        </div>
      </section>

      <section id="solution" aria-label="The solution">
        <div className={SECTION_SHELL}>
          <SectionLabel>The solution</SectionLabel>
          <div className={`${LEAD_COPY} space-y-5`}>
            <p>
              We rebuilt Blok on Shadcn and shipped it as a registry. A team
              could start from a stable component and extend it in their own
              layer. Sitecore&apos;s patterns were written into the component
              files, so a designer, an engineer, and an AI tool were reading
              the same rules.
            </p>
            <p>
              What went out was the registry, with the documentation sitting
              in those files. The docs site came after Symposium, once hiring
              caught up.
            </p>
            <p>
              Before Symposium we shipped +50 components, and today that is +100 with larger templates being released regularly.
            </p>
          </div>
        </div>
      </section>

      <section id="decisions" aria-label="Key decisions">
        <div className={SECTION_SHELL}>
          <SectionLabel>Key decisions</SectionLabel>
          <EditorialRows
            items={DECISIONS.map((decision) => ({
              title: decision.title,
              body: decision.body,
            }))}
          />
        </div>
      </section>

      <BlokStepsTimeline
        intro="The process of creating the new Blok can be broken into five steps up to its release date."
        steps={STEPS}
      />

      <section id="results" aria-label="The results">
        <div className={SECTION_SHELL}>
          <SectionLabel>The results</SectionLabel>
          <p className={LEAD_COPY}>
            By December, new product initiatives were committed to using Blok as their design system, a first set
            of products had migrated, and component-related blockers were down.
          </p>
          <EditorialRows
            items={RESULTS.map((result) => ({
              title: (
                <GoalPhrase color={result.color}>{result.metric}</GoalPhrase>
              ),
              body: result.body,
            }))}
          />
        </div>
      </section>

      <section id="reflection" aria-label="Reflection and learning">
        <div className={SECTION_SHELL}>
          <SectionLabel>Reflection</SectionLabel>
          <p className={LEAD_COPY}>
            Blok changed how people at Sitecore get to a shared picture of a
            product, especially when the first version is made with AI. I
            think of the system as infrastructure now. The components are just
            the part you can see.
          </p>
          <EditorialRows
            items={REFLECTIONS.map((item) => ({
              title: item.title,
              body: item.body,
            }))}
          />
        </div>
      </section>

      <CaseStudyFooter />
    </div>
  );
}
