'use client';

import { ReactNode } from 'react';
import { CaseStudyFooter } from './CaseStudyFooter';
import { CaseStudyHero } from './CaseStudyHero';
import { CaseStudyCarousel } from './CaseStudyCarousel';
import { CaseStudyRevealStack } from './CaseStudyRevealStack';
import { BlokStep, BlokStepsTimeline } from './BlokStepsTimeline';

const GOAL_COLORS = {
  foundation: '#E5FF20',
  reuse: '#7CFFCB',
  context: '#82C7FF',
  loop: '#FF9FCF',
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

function LifecycleLoop() {
  return (
    <figure className="mt-10 md:mt-12">
      <div className="overflow-hidden rounded-2xl bg-text-secondary/[0.04]">
        <img
          src="/images/dam-lifecycle.png"
          alt="DAM lifecycle: Plan, Discover, Reuse and Adapt, Produce, Govern, Activate, Optimise, Learn, and Next action in a closed loop"
          className="w-full"
        />
      </div>
    </figure>
  );
}

const WHY = [
  {
    title: 'Each role had a governed job',
    body: (
      <p>
        Librarians, admins, and business users all need the product to stay
        governed, and they do not share one task. A business user distributes
        allowed content for their brand and has to know the rights are
        correct. An admin makes sure everyone has the permissions they
        should. A librarian keeps assets from being duplicated, holds the
        metadata and rights, approves or rejects on quality, and creates the
        renditions each distribution channel needs.
      </p>
    ),
  },
  {
    title: 'AI needed a source of brand truth',
    body: (
      <p>
        Accuracy across an organisation depends on one place a model can
        read. A DAM is that foundational layer. It stores the brand assets
        and the context AI needs to stay accurate, instead of generating
        from whatever it can reach.
      </p>
    ),
  },
  {
    title: 'The work had to live in one platform',
    body: (
      <p>
        People wanted to stay inside SitecoreAI. Content Hub, the standalone
        DAM, was expensive, slow to set up, and never as tightly integrated
        as the rest of the suite. SitecoreAI DAM replaces it so governance
        and brand truth sit in the same product as the work.
      </p>
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
            One governed source of brand truth.
          </GoalPhrase>{' '}
          People and AI plan, discover, reuse, produce, govern, and activate
          from the same assets. What actually ran comes back as the next
          recommended action.
        </p>
        <p>
          Done looks like DAM as the context layer other SitecoreAI products
          read, inside the platform, rather than a separate app people leave
          to do the work.
        </p>
      </>
    ),
  },
  {
    title: 'The short term goal',
    body: (
      <>
        <p>
          <GoalPhrase color={GOAL_COLORS.loop}>
            A governed asset library the three roles can run.
          </GoalPhrase>{' '}
          A business user distributes content that is already allowed for
          their brand, with rights they can trust. An admin sets who can do
          what. A librarian keeps the library from rotting: no duplicates,
          complete metadata, correct rights, a decision on quality, and
          renditions ready for each channel.
        </p>
        <p>
          That had to be visible on the asset. Brand, usage rights, status,
          collections, renditions, and a way to keep AI-generated files out
          of brand truth until someone governs them.
        </p>
      </>
    ),
  },
] as const;

const DECISIONS = [
  {
    title: 'Jobs before labels',
    body: (
      <p>
        I wrote five personas and a jobs map that stayed product-agnostic. An
        editor, a business user, a content admin, an external contributor, and
        a librarian. The map refused to equate librarian with DAM and editor
        with Content. Navigation was tested against how often a task happens,
        and how much damage it does if it goes wrong.
      </p>
    ),
  },
  {
    title: 'Do not pick the information architecture in a meeting',
    body: (
      <p>
        Three variants, each with a workflow cost and a commercial cost. A
        shared asset library across Content and Assets. Governed and
        ungoverned libraries split. DAM living inside Content, with renditions
        and jobs as foundations. The deliverable was a test set. The library
        in the current mocks sits in Assets, with governance on the asset
        itself. Declaring one structure from a slide would have frozen the
        wrong one.
      </p>
    ),
  },
  {
    title: 'Collections are not projects',
    body: (
      <p>
        A collection curates and governs a set of assets. A project executes
        and produces a deliverable. A project can take a collection in, and
        send approved outputs back. Work is allowed to start outside DAM. The
        governed destination is where approved work comes home.
      </p>
    ),
  },
  {
    title: 'Measure the rendition in context',
    body: (
      <p>
        Asset-level A/B testing was attractive, and it would have duplicated
        component experiments that already exist. The useful claim is
        narrower: which rendition, in which channel, against which goal. A
        million social views and a converting site visit are different
        outcomes. Recommendations and analytics have to speak that language
        or they are decorative.
      </p>
    ),
  },
] as const;

const STEPS: BlokStep[] = [
  {
    id: 'jobs',
    navTitle: 'Jobs',
    title: 'Start from the work people actually do',
    lead: 'Task frequency first. Job titles second.',
    body: (
      <p>
        Five personas, written as jobs rather than product labels. A librarian
        governs the ecosystem: ingest, enrich, rights, review, and retire. A
        business user finds and shares what is already approved, without
        taking on that governance. A content admin keeps taxonomy and access
        structured. An editor needs the right asset without breaking a live
        experience. An external contributor delivers work into review. If a
        structure made the librarian's job the only path, it was the
        wrong structure.
      </p>
    ),
    meta: '',
    color: GOAL_COLORS.foundation,
    images: [
      {
        src: '/images/dam-01.png',
        alt: 'Persona cards for librarian, editor, business user, content admin, and external contributor',
        variant: 'diagram',
      },
    ],
  },
  {
    id: 'model',
    navTitle: 'Model',
    title: 'Write the loop after the conversations',
    lead: 'The manifesto came out of the rooms, not before them.',
    body: (
      <p>
        Discovery ran with Strategy, Channels, Conversion Optimization,
        Agentic, Scrunch, and Brand Context. The closed loop was the synthesis:
        understand the work, find what already exists, create only the gap,
        govern it, activate the right version, measure what happened, and feed
        the learning back. DAM as a knowledge foundation, including documents
        and brand context, sat in that model from the start.
      </p>
    ),
    meta: '',
    color: GOAL_COLORS.reuse,
    images: [
      {
        src: '/images/dam-02.png',
        alt: 'Product touchpoints meeting summaries with stakeholder discovery across Strategy, Channels, Agentic, and Brand Context',
        variant: 'diagram',
      },
    ],
  },
  {
    id: 'core',
    navTitle: 'Core',
    title: 'Design the library people will actually use',
    lead: 'Governance has to be readable on the asset.',
    body: (
      <p>
        The asset library is the daily surface. Search, brand, usage rights,
        status, and collection. Each card carries approval, how many
        renditions exist, and how many variants. A business user can tell
        what they are allowed to distribute. A librarian can see what still
        needs metadata, a decision, or a rendition for a channel. Hide
        AI-generated content keeps ungoverned generation out of brand truth.
      </p>
    ),
    meta: '',
    color: GOAL_COLORS.context,
    images: [
      {
        src: '/images/dam-03.png',
        alt: 'SitecoreAI asset library with filters, collections, and a grid of governed assets',
        variant: 'diagram',
      },
    ],
  },
  {
    id: 'platform',
    navTitle: 'Platform',
    title: 'Connect DAM to the rest of SitecoreAI',
    lead: 'Other products read DAM. They do not copy it.',
    body: (
      <p>
        A campaign should not become its own asset library. In Strategy,
        Recommended from DAM suggests assets from the campaign's context.
        A person adds or rejects them. Rights, approval, and renditions stay
        on the asset in DAM. That is the pattern for the rest of SitecoreAI:
        ask the library, do not keep a second one.
      </p>
    ),
    meta: '',
    color: GOAL_COLORS.loop,
    images: [
      {
        src: '/images/dam-04.png',
        alt: 'Strategy campaign with Recommended from DAM suggestions to add or reject',
        variant: 'diagram',
      },
    ],
  },
  {
    id: 'proof',
    navTitle: 'Proof',
    title: 'Show the work as interaction',
    lead: 'Approval belongs on the asset, in the library.',
    body: (
      <p>
        Review is part of governing the library, not a separate admin tool.
        Opening an asset shows the variant, the original rendition, alt text,
        and approve or reject on the same surface. Until that decision is
        made, the asset is not brand truth other products should recommend.
      </p>
    ),
    meta: '',
    color: GOAL_COLORS.foundation,
    images: [
      {
        src: '/images/dam-asset-detail.webp',
        alt: 'Review lightbox on a living-room set, with Variant 1, original rendition, alt text, and approve or reject',
        variant: 'diagram',
      },
    ],
  },
];

const RESULTS = [
  {
    color: GOAL_COLORS.foundation,
    metric: 'A library and a loop',
    body: (
      <p>
        The work in progress follows this structure: a governed asset library
        as brand truth, and a lifecycle that plans, discovers, reuses,
        governs, activates, and learns. The screens will move. The model is
        what they are building against.
      </p>
    ),
  },
  {
    color: GOAL_COLORS.loop,
    metric: 'Jobs that do not collapse into one grid',
    body: (
      <p>
        Business users, admins, and librarians share the assets and not the
        task. The library shows rights, status, renditions, and approval so
        each role can do their job without everyone becoming a librarian.
      </p>
    ),
  },
  {
    color: GOAL_COLORS.reuse,
    metric: 'Other products can ask DAM',
    body: (
      <p>
        A campaign can recommend assets from DAM using its own context, then
        add or reject them. The library stays the source. The campaign does
        not become a second one.
      </p>
    ),
  },
  {
    color: GOAL_COLORS.context,
    metric: 'Open questions, left open',
    body: (
      <p>
        Whether these jobs hold up with customers, how far taxonomy should
        go, and the line between version and rendition were still unresolved
        when I handed the work over. Those decisions need proof.
      </p>
    ),
  },
] as const;

const REFLECTIONS = [
  {
    title: 'The useful part was deciding what a DAM is for',
    body: (
      <p>
        A DAM that only stores files cannot be a source of brand truth. The
        part that should survive a reskin is the split between roles, the
        governance on the asset, and the loop that learns from what ran. The
        screens will change as scope and evidence change.
      </p>
    ),
  },
  {
    title: 'Persona frequency is still a hypothesis',
    body: (
      <p>
        I did not run customer sessions on this work. Internal critique is
        not the same as watching a librarian, an admin, or a business user
        use it. The jobs map is a design hypothesis. The next owner still
        needs to measure it.
      </p>
    ),
  },
] as const;

export function DamCaseStudy() {
  return (
    <div className="min-h-screen bg-background">
      <CaseStudyCarousel
        images={[
          {
            src: '/images/sitecoreai-asset-library.png',
            alt: 'Asset library with brand, usage-rights, and modified-by filters plus approval and variant counts',
          },
          {
            src: '/images/sitecoreai-review-queue.png',
            alt: 'Review queue with Approve and Reject on each asset before distribution',
          },
          {
            src: '/images/sitecoreai-asset-details.png',
            alt: 'Asset details with variants, renditions, brand, description, and comments',
          },
          {
            src: '/images/sitecoreai-collections.png',
            alt: 'Collections of curated assets with public or private visibility and tags',
          },
          {
            src: '/images/sitecoreai-drm-rights-profiles.png',
            alt: 'Digital rights management profiles with territories, content types, and licensors',
          },
          {
            src: '/images/sitecoreai-campaign-resources.png',
            alt: 'Strategy campaign Resources tab with Recommended from DAM assets to Add or Reject',
          },
          {
            src: '/images/sitecoreai-studio-content.png',
            alt: 'Assets Studio editing title, tags, digital rights, and alt text beside a live preview',
          },
          {
            src: '/images/sitecoreai-studio-transform.png',
            alt: 'Assets Studio transform view with focal point and variant layers on a living-room asset',
          },
        ]}
      />

      <CaseStudyHero
        title="SitecoreAI DAM"
        subtitle="A governed source of brand truth inside SitecoreAI, so people and AI work from the same assets."
        role="Product designer"
        team="Product manager & engineering lead"
        timeline="June 2026 to August 2026"
        layout="wide"
      />

      <section id="why" aria-label="Why SitecoreAI DAM?">
        <div className={SECTION_SHELL}>
          <SectionLabel>Why SitecoreAI DAM?</SectionLabel>
          <p className={LEAD_COPY}>
            SitecoreAI DAM replaces Content Hub as the paid DAM, sitting
            beside Media Library inside SitecoreAI. Three things were already
            true before we designed a screen:
          </p>
          <CaseStudyRevealStack items={[...WHY]} />
        </div>
      </section>

      <section id="role" aria-label="My role">
        <div className={SECTION_SHELL}>
          <SectionLabel>My role</SectionLabel>
          <div className={`${LEAD_COPY} space-y-5`}>
            <p>
              I was the product designer on SitecoreAI DAM. I framed the
              product as well as the screens: five personas, the jobs those
              roles actually do, the asset library, and how the rest of
              SitecoreAI reads it.
            </p>
            <p>
              I ran discovery with Strategy, Channels, Conversion
              Optimization, Agentic, Scrunch, and Brand Context. Those
              conversations became the lifecycle. I designed the library and
              the campaign recommendation against that model.
            </p>
            <p>
              The users were business users distributing allowed content with
              the right rights, admins owning permissions, and librarians
              governing duplicates, metadata, approval, and renditions. AI
              needed that same library as a source of brand truth.
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
              SitecoreAI DAM is the library those jobs run on, and the loop
              that keeps it true. The same asset carries brand, usage rights,
              status, renditions, and variants. A business user can see what
              they are allowed to distribute. A librarian can see what still
              needs metadata, a decision, or a rendition. AI-generated files
              stay out of that grid until someone governs them, so generation
              does not quietly become brand truth.
            </p>
            <p>
              The lifecycle is how the library stays current. Plan the work.
              Discover governed content from context and performance. Reuse
              it, or adapt a version. Produce with the people doing the work.
              Govern rights, brand, accuracy, provenance, and approval.
              Activate the right rendition for the product and channel.
              Optimise in place. Learn from channel, audience, usage, and
              feedback. Next action recommends reuse, adaptation, enrichment,
              amplification, or retirement, and that recommendation starts the
              next plan.
            </p>
            <p>
              Other products do not keep a second library. A campaign can ask
              DAM for assets that fit its context, then add or reject them.
              The asset, its rights, and its history stay in DAM.
            </p>
          </div>
          <LifecycleLoop />
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
        intro="From the jobs map to a library other products can read, the work broke into five steps."
        steps={STEPS}
      />

      <section id="results" aria-label="The results">
        <div className={SECTION_SHELL}>
          <SectionLabel>The results</SectionLabel>
          <p className={LEAD_COPY}>
            This is a product still being built. The outcome so far is a
            model for the library, a way for other products to read it, and
            the jobs that model has to serve.
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

      <section id="reflection" aria-label="Reflection">
        <div className={SECTION_SHELL}>
          <SectionLabel>Reflection</SectionLabel>
          <p className={LEAD_COPY}>
            The useful part of this project was deciding what the library is
            for: governed brand truth, not another place to pick a file.
          </p>
          <EditorialRows
            items={REFLECTIONS.map((item) => ({
              title: item.title,
              body: item.body,
            }))}
          />
        </div>
      </section>

      <CaseStudyFooter next={{ label: 'Blok', href: '/blok' }} />
    </div>
  );
}
