'use client';

import { ReactNode } from 'react';
import { CaseStudyFooter } from './CaseStudyFooter';
import { CaseStudyHero } from './CaseStudyHero';
import { CaseStudyCarousel } from './CaseStudyCarousel';
import { CaseStudyRevealStack } from './CaseStudyRevealStack';
import { BlokStep, BlokStepsTimeline } from './BlokStepsTimeline';

const GOAL_COLORS = {
  foundation: '#E5FF20',
  chat: '#82C7FF',
  spaces: '#7CFFCB',
  artifacts: '#FF9FCF',
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

function StudyVideo({ src, label }: { src: string; label: string }) {
  return (
    <figure className="mt-10 md:mt-12">
      <div className="overflow-hidden rounded-2xl bg-text-secondary/[0.04] shadow-[0_24px_80px_-32px_rgba(34,34,34,0.18)]">
        <div
          aria-hidden
          className="h-1.5 w-full"
          style={{ backgroundColor: GOAL_COLORS.foundation }}
        />
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          aria-label={label}
          className="w-full"
        />
      </div>
    </figure>
  );
}

const WHY = [
  {
    title: 'Chat could not hold the work',
    body: (
      <p>
        The early frames kept forcing a choice between chat and a custom
        screen. Chat was fast, and it fell apart as soon as a marketer skipped
        a step, came back later, or had to review something with someone else.
        A custom screen was clearer, and it would have meant a new UI for every
        agent we had not invented yet.
      </p>
    ),
  },
  {
    title: 'The output was Sitecore content',
    body: (
      <p>
        Marketers were not generating paragraphs. They were generating sites,
        collections, and media, then reviewing and approving them. A transcript
        has nowhere to put that. A run could produce hundreds of artifacts, with
        permissions on who could see them, and the chat model had no answer.
      </p>
    ),
  },
  {
    title: 'Labs and product were different jobs',
    body: (
      <p>
        Innovation Labs shipped demos. SitecoreAI had to ship something
        governed, consistent, and reusable across the suite. Agentic Studio was
        the bridge. If the UI patterns were brittle, every later AI feature
        would inherit them.
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
            One place for AI inside SitecoreAI.
          </GoalPhrase>{' '}
          Agents and flows a customer could configure and reuse. A chat that
          could be opened from anywhere, without becoming the only way to work.
        </p>
        <p>
          Done looked like other product teams building on Agentic, instead of
          starting another AI surface, and customers making their own agents
          without us designing a private UI for each one.
        </p>
      </>
    ),
  },
  {
    title: 'The short term goal',
    body: (
      <>
        <p>
          <GoalPhrase color={GOAL_COLORS.artifacts}>
            Early customer access, in about three months.
          </GoalPhrase>{' '}
          Partners needed to build agents on it, not watch a demo of one we had
          made for them.
        </p>
        <p>
          That meant the system had to hold configurations we had not seen yet,
          and still feel like Sitecore when a marketer sat down with it.
        </p>
      </>
    ),
  },
] as const;

const DECISIONS = [
  {
    title: 'Design the UI first, then the chat',
    body: (
      <p>
        The best workflow for a marketer was not going to come out of a chat
        metaphor. We designed the full UI, then translated what we could into
        chat. Chat was the familiar way in. It was not the place we invented
        the workflow.
      </p>
    ),
  },
  {
    title: 'Atomic components, shared states',
    body: (
      <p>
        Every customisation option was another variant we would have to
        maintain. We designed from atomic components, with shared status
        signifiers, and refused one-off screens. A complex configuration was a
        combination of those parts, not a new design.
      </p>
    ),
  },
  {
    title: 'An agent and a flow are not the same thing',
    body: (
      <p>
        We treated them as one concept at the start. That fell apart once
        collaboration and handovers showed up. A flow can orchestrate agents.
        An agent cannot contain other agents. It is a technical distinction,
        and it changed the builder.
      </p>
    ),
  },
  {
    title: 'Chat pushes in. It does not cover the page.',
    body: (
      <p>
        Universal chat lived in the top navigation, as a side panel rather than
        an overlay. On builder pages it undocked, so it was not sitting on the
        thing you were building. Anything that needed a decision was sent into
        a Space. Chat stayed available without becoming a black box.
      </p>
    ),
  },
] as const;

const STEPS: BlokStep[] = [
  {
    id: 'touchpoints',
    navTitle: 'Touchpoints',
    title: 'Map every door into the work',
    lead: 'An agent was not a destination.',
    body: (
      <p>
        An agent could be started from a dashboard, managed in the Agentic
        area, or talked to in chat. I mapped those as one product with three
        doors, not three products. The UI had to make sense whichever door you
        came in through.
      </p>
    ),
    meta: '',
    color: GOAL_COLORS.foundation,
    images: [
      {
        src: '/images/agentictouchpoints.webp',
        alt: 'Diagram of Agentic Studio touchpoints: dashboard, the central Agentic area, and chat',
        variant: 'diagram',
      },
    ],
  },
  {
    id: 'modules',
    navTitle: 'Modules',
    title: 'Build the agent from modules',
    lead: 'One agent, two ways to see it.',
    body: (
      <p>
        I designed the agent and flow UI as small modules mapped to
        configuration. Chat could render the same modules. A full UI could
        render them too. We were not drawing a new screen every time a customer
        wanted a different agent, and we were not keeping two copies of the
        logic.
      </p>
    ),
    meta: '',
    color: GOAL_COLORS.chat,
    images: [
      {
        src: '/videos/flowwalkthrough.mp4',
        alt: 'Walkthrough of an agent flow rendered as a full UI',
        variant: 'video',
      },
    ],
  },
  {
    id: 'spaces',
    navTitle: 'Spaces',
    title: 'Give the non-linear work a place to live',
    lead: 'Keep chat familiar. Move the complexity next to it.',
    body: (
      <p>
        People skip steps, leave, and come back with someone else. A transcript
        cannot represent that. A Space held the full UI, which could be
        non-linear, and it held collaboration, review, and history. Chat stayed
        a conversation.
      </p>
    ),
    meta: '',
    color: GOAL_COLORS.spaces,
    images: [
      {
        src: '/images/agenticworkflow.webp',
        alt: 'A Space, with chat beside a non-linear agent workspace and collaboration',
        variant: 'diagram',
      },
    ],
  },
  {
    id: 'artifacts',
    navTitle: 'Artifacts',
    title: 'Treat the output as Sitecore content',
    lead: 'If it cannot be reviewed, it cannot ship.',
    body: (
      <p>
        Sitecore content is typed. Sites, collections, media. An Artifact could
        be any of those, with an editing view that fit the type. Artifacts
        could be grouped, reviewed, and approved the same way, then promoted
        into SitecoreAI as real content. A run could produce hundreds of them,
        so the UI had to disclose that volume instead of dumping it.
      </p>
    ),
    meta: '',
    color: GOAL_COLORS.artifacts,
    images: [
      {
        src: '/images/agenticartifacts.webp',
        alt: 'Artifacts representing structured Sitecore content, with status and review',
        variant: 'diagram',
      },
    ],
  },
  {
    id: 'chat',
    navTitle: 'Chat',
    title: 'Put chat where the work already is',
    lead: 'Chat was essential. It could not be the whole product.',
    body: (
      <p>
        It was the safe baseline for a use case we had not designed yet, and it
        was how someone added context a form would not fit. I put a universal
        chat in the top navigation and a prompt bar on the Agentic work itself.
        The panel pushed the page rather than covering it. On builder pages it
        undocked. Work that needed a person went to a Space, so it stayed
        traceable.
      </p>
    ),
    meta: '',
    color: GOAL_COLORS.chat,
    images: [
      {
        src: '/images/agenticchat.webp',
        alt: 'Universal chat and a contextual prompt bar, with work redirected into a Space',
        variant: 'diagram',
      },
    ],
  },
];

const RESULTS = [
  {
    color: GOAL_COLORS.foundation,
    metric: 'The AI surface for SitecoreAI',
    body: (
      <p>
        Agentic Studio became where AI in the product lived. Other teams had a
        system to build on, instead of starting their own chat.
      </p>
    ),
  },
  {
    color: GOAL_COLORS.artifacts,
    metric: '100+ agents in the first weeks',
    body: (
      <p>
        Early partners built more than 100 agents within weeks of release. They
        were configuring agents, not waiting on us to design one per use case.
      </p>
    ),
  },
  {
    color: GOAL_COLORS.spaces,
    metric: 'One owner for AI work',
    body: (
      <p>
        AI ownership sat in Agentic. Product teams stopped duplicating the same
        effort, and the next AI feature had a place to go.
      </p>
    ),
  },
  {
    color: GOAL_COLORS.chat,
    metric: 'Chat, left for a second pass',
    body: (
      <p>
        For the first release we spent the time on the UI workflows. Chat
        shipped, and it needed another pass after launch. Getting the system
        right mattered more than polishing the conversation.
      </p>
    ),
  },
] as const;

const REFLECTIONS = [
  {
    title: 'I would ground the modules sooner',
    body: (
      <p>
        Atomic components let us move without knowing every future agent. They
        also meant some early pieces were abstract. Next time I would name the
        most common agent use cases earlier, and design the modules against
        those, not only against the system.
      </p>
    ),
  },
  {
    title: 'What stayed with me',
    body: (
      <p>
        When we let the model of chat decide the UX, the work stopped making
        sense. The constraints had to follow the workflow. Designing for
        uncertainty is real, and it is not an excuse to ship a text box and
        call it a platform. The simple version was the hard one.
      </p>
    ),
  },
] as const;

export function AgenticStudioCaseStudy() {
  return (
    <div className="min-h-screen bg-background">
      <CaseStudyCarousel
        images={[
          {
            src: '/images/agenticheader.webp',
            alt: 'Agentic Studio interface',
          },
          {
            src: '/images/agentictouchpoints.webp',
            alt: 'Agentic Studio touchpoints',
          },
          {
            src: '/images/agenticworkflow.webp',
            alt: 'A Space for non-linear agent work',
          },
          {
            src: '/images/agenticartifacts.webp',
            alt: 'Artifacts for structured Sitecore content',
          },
          {
            src: '/images/agenticchat.webp',
            alt: 'Chat embedded in Agentic Studio',
          },
        ]}
      />

      <CaseStudyHero
        title="Agentic Studio"
        subtitle="Designing the AI surface so Sitecore marketers could run agents, flows, and chat from anywhere in SitecoreAI."
        role="Product designer"
        team="VP of AI & design lead"
        timeline="August 2025 to January 2026"
        layout="wide"
      />

      <section id="why" aria-label="Why Agentic Studio?">
        <div className={SECTION_SHELL}>
          <SectionLabel>Why Agentic Studio?</SectionLabel>
          <p className={LEAD_COPY}>
            Agentic Studio took experimental AI out of Innovation Labs and made
            it the way AI showed up across SitecoreAI. Three things were already
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
              I was the product designer on Agentic Studio. I designed the
              agent, flow, and chat experiences, in Figma and in code
              prototypes, and I owned the handover through to implementation
              review.
            </p>
            <p>
              The person I worked with most was the VP of AI & Innovation, who
              was also the engineer building it. My design lead and design
              manager were in the decisions with us. We did not have time for a
              long alignment cycle. I would take what we already knew from
              Labs, put it in a prototype, and use that to get a decision.
            </p>
            <p>
              The users were Sitecore marketers, and the product teams who
              would otherwise have built their own AI UI. I looked at Opal, and
              at Google and Microsoft&apos;s AI tooling, mostly to see where
              chat was being asked to do a job it could not do. The choices
              here were architectural. They set how later AI features would be
              built.
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
              We stopped treating chat and a full UI as a choice. An agent was
              a set of small UI modules tied to its configuration. The same
              agent could render in chat or as a full screen, and a
              configuration we had not seen yet did not mean a new screen.
            </p>
            <p>
              The work that was not a straight line lived in a Space. Chat
              stayed linear, because that is the mental model people already
              have. Inside a Space the UI could skip, pause, and pick up later.
              Reviews, history, and collaboration sat there, not in the
              transcript.
            </p>
            <p>
              What the agent produced was an Artifact. A site, a collection, a
              piece of media, each with an editing view that matched the type.
              Artifacts could be grouped, reviewed, and approved, then promoted
              into SitecoreAI as real content.
            </p>
            <p>
              Chat stayed. A universal chat in the top navigation, and a prompt
              bar scoped to the Agentic work in front of you. If the chat
              produced something that needed a decision, it went into a Space
              so it could be traced.
            </p>
          </div>
          <StudyVideo
            src="/videos/agenticwalkthrough.mp4"
            label="Walkthrough of Agentic Studio"
          />
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
        intro="From the Labs concepts to early customer access, the work broke into five steps."
        steps={STEPS}
      />

      <section id="results" aria-label="The results">
        <div className={SECTION_SHELL}>
          <SectionLabel>The results</SectionLabel>
          <p className={LEAD_COPY}>
            Early partners were building agents on it within weeks of release.
            The studio became the AI surface the rest of SitecoreAI could share.
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
            The useful part of this project was deciding what not to ask chat
            to do.
          </p>
          <EditorialRows
            items={REFLECTIONS.map((item) => ({
              title: item.title,
              body: item.body,
            }))}
          />
        </div>
      </section>

      <CaseStudyFooter next={{ label: 'SitecoreAI DAM', href: '/dam' }} />
    </div>
  );
}
