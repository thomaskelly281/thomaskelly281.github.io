import { Footer } from '../components/Footer';
import { CaseStudyHero } from '../components/case-study/CaseStudyHero';
import { CaseStudySection } from '../components/case-study/CaseStudySection';
import {
  CaseStudyCallout,
  CaseStudyDetailList,
  CaseStudyImageFrame,
  CaseStudyProse,
  CaseStudySplitCards,
  CaseStudySubsections,
  CaseStudyVideoFrame,
} from '../components/case-study/CaseStudyBlocks';

export default function AgenticStudioPage() {
  return (
    <main className="min-h-screen bg-background">
      <CaseStudyHero
        title="Agentic Studio"
        subtitle="Designing pioneer marketer workflows through AI enablement"
        meta={[
          { label: 'Role', value: 'Product Designer' },
          { label: 'Timeline', value: 'August 2025 to January 2026' },
        ]}
        imageSrc="/images/agenticheader.webp"
        imageAlt="Agentic Studio Interface"
      />

      <CaseStudySection number="01" title="Executive Summary">
        <div className="space-y-10">
          <CaseStudyProse>
            <p>
              Sitecore Agentic Studio was the productisation of rapid, experimental AI work
              emerging from Sitecore AI Innovation Labs into a scalable, enterprise-ready
              platform. Its goal was to enable AI agents, flows, and a universal chat experience
              that could be embedded across SitecoreAI without slowing down complex marketer
              workflows or locking the product into brittle UI patterns.
            </p>
            <p>
              As the Product Designer, I was responsible for translating fast-moving, demo-driven
              Innovation Labs concepts into production-ready experiences that could scale across
              unknown future agentic use cases. The core challenge was not just visual design, but{' '}
              <strong>systems design</strong>: creating UI structures that could support
              non-linear workflows, deep customisation, collaboration, and governance while still
              offering the familiarity and speed of chat.
            </p>
            <p>This case study focuses on three intertwined problems:</p>
            <CaseStudyDetailList
              items={[
                'Designing scalable, highly customisable UIs for agents and flows',
                'Integrating chat as a first-class but non-dominant interaction model',
                'Bridging experimentation and enterprise readiness through cross-team communication',
              ]}
            />
          </CaseStudyProse>

          <CaseStudyVideoFrame src="/videos/agenticwalkthrough.mp4" />
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="02"
        title="Context & Problem Space"
        variant="muted"
      >
        <CaseStudySubsections
          items={[
            {
              title: 'Company & Product Context',
              body: (
                <>
                  <p>
                    Agentic Studio was the bridge between Sitecore AI Innovation Labs and
                    SitecoreAI, forming the foundation for how AI would be delivered across the
                    product suite. Strategically, this work supported Sitecore&apos;s shift from a
                    composable product portfolio to a consolidated AI-first platform, in response
                    to increasing competitive pressure.
                  </p>
                  <p>Agentic Studio introduced:</p>
                  <CaseStudyDetailList
                    items={[
                      'AI agents and flows that could be configured and reused',
                      'A universal chat experience accessible from anywhere in SitecoreAI',
                      'Purpose-built UIs for agentic workflows beyond chat',
                    ]}
                  />
                  <p>
                    Agents and flows could be triggered from dashboards, managed centrally in the
                    Agentic area, or interacted with through chat, creating a uniquely complex set
                    of touchpoints.
                  </p>
                </>
              ),
              media: (
                <CaseStudyImageFrame
                  src="/images/agentictouchpoints.webp"
                  alt="Multiple touchpoint diagram showing dashboard, central Agentic area, and chat panel"
                />
              ),
            },
            {
              title: 'Why This Was Not a "Normal" Design Project',
              body: (
                <p>
                  This was not a single feature, but a new product surface being embedded into an
                  existing enterprise ecosystem. The project faced extreme ambiguity due to the pace
                  of AI innovation, with a constant inflow of new requirements from customers and
                  industry changes. We worked under tight timelines (approximately three months to
                  early customer access), and I collaborated directly with a VP who was also the
                  primary engineer. Design decisions had long-term architectural implications, often
                  affecting how all future AI features would be built.
                </p>
              ),
            },
            {
              title: 'My Role in Practice',
              body: (
                <>
                  <p>Officially, my role was Product Designer. In practice, I:</p>
                  <CaseStudyDetailList
                    items={[
                      'Designed all Agentic Studio and chat experiences in Figma or prototyped them using code',
                      'Led interaction and systems thinking for agents, flows, and chat',
                      'Conducted competitor and industry research (e.g. Opal, Google and Microsoft AI tooling)',
                      'Acted as the design bridge between Innovation Labs and SitecoreAI',
                      'Owned handover quality, design sign-off, and implementation reviews',
                    ]}
                  />
                  <p>
                    I worked most closely with the VP of AI & Innovation, my Design Lead, and
                    Product Design Manager. Decision-making was highly collaborative but fast. I
                    often had to propose a direction based on previous knowledge from Innovation
                    Labs, test it quickly through design, and use that artefact to drive alignment.
                  </p>
                </>
              ),
            },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection
        number="03"
        title="Core UX Problems"
        intro="Rather than framing this as a list of features, the work revolved around several fundamental UX problems."
      >
        <div className="space-y-10">
          <CaseStudySubsections
            items={[
              {
                title: 'How Do You Represent Agents and Flows?',
                body: (
                  <>
                    <p>
                      Early on, we struggled with a binary choice: chat or custom UI. Chat offered
                      speed and flexibility, but broke down for complex, non-linear workflows.
                      Custom UIs offered clarity, but risked being brittle and expensive to
                      maintain.
                    </p>
                    <p>
                      The key insight was that <strong>we did not need to choose</strong>.
                    </p>
                    <p>
                      By designing from small UI modules mapped to agent and flow configurations,
                      we could:
                    </p>
                    <CaseStudyDetailList
                      items={[
                        'Render the same agent in chat or full UI',
                        'Avoid duplicating logic',
                        'Support future, unknown configurations without rebuilding UIs',
                      ]}
                    />
                  </>
                ),
                media: <CaseStudyVideoFrame src="/videos/flowwalkthrough.mp4" />,
              },
              {
                title: 'How Do You Handle Non-Linear Workflows?',
                body: (
                  <>
                    <p>Unlike chat, agent workflows are not inherently linear. Users could:</p>
                    <CaseStudyDetailList
                      items={['Skip steps', 'Return later', 'Collaborate asynchronously']}
                    />
                    <p>
                      A purely chat-based model created temporal problems and broke mental models.
                      We addressed this by introducing <strong>Spaces</strong>, an abstraction layer
                      where:
                    </p>
                    <CaseStudyDetailList
                      items={[
                        'Chat remained linear and familiar',
                        'Full agent UIs could be non-linear',
                        'Collaboration, reviews, and history lived outside chat',
                      ]}
                    />
                    <p>
                      This preserved the simplicity of chat while enabling enterprise workflows.
                    </p>
                  </>
                ),
                media: (
                  <CaseStudyImageFrame
                    src="/images/agenticworkflow.webp"
                    alt="Spaces: Non-linear workflow interface showing chat panel, main work area, and collaboration features"
                  />
                ),
              },
              {
                title: 'How Do You Represent Enterprise Content?',
                body: (
                  <>
                    <p>
                      Sitecore users work with structured content types (sites, collections,
                      media), not just text. Traditional AI chats do not handle this well.
                    </p>
                    <p>
                      We introduced <strong>Artifacts</strong>: a flexible abstraction capable of
                      representing any generated content type with tailored editing experiences.
                      Artifacts could be grouped, reviewed, and approved consistently, then promoted
                      into SitecoreAI as first-class content.
                    </p>
                  </>
                ),
                media: (
                  <CaseStudyImageFrame
                    src="/images/agenticartifacts.webp"
                    alt="Artifacts: Structured content representation showing different content types with status indicators and workflow"
                  />
                ),
              },
            ]}
          />

          <CaseStudyCallout tone="accent">
            <strong>Why Traditional Patterns Failed</strong>
            <p className="mt-4 font-[family-name:var(--font-sfpro)] font-normal">
              Standard workflow and chat patterns broke down under non-linear temporality,
              role-based permissions and visibility, parallel agent execution, and high output
              volume (hundreds of artifacts). Relying solely on chat would have created an opaque,
              fragile system that slowed users down. The solution required combining chat familiarity
              with explicit, purpose-built interfaces.
            </p>
          </CaseStudyCallout>
        </div>
      </CaseStudySection>

      <CaseStudySection number="04" title="Design Principles" variant="muted">
        <div className="space-y-5">
          <article className="rounded-2xl bg-accent-tertiary p-6 md:p-8">
            <h3 className="mb-4 text-xl font-[family-name:var(--font-ppvalve)] font-medium text-[#222222] md:text-2xl">
              Design for UI first, translate to chat later
            </h3>
            <p className="text-sm font-[family-name:var(--font-sfpro)] leading-relaxed text-[#222222]/85 md:text-base">
              Optimal workflows should not be constrained by chat metaphors.
            </p>
          </article>

          <article className="rounded-2xl bg-text-secondary/[0.03] p-6 md:p-8">
            <h3 className="mb-4 text-xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary md:text-2xl">
              Atomic over bespoke
            </h3>
            <p className="text-sm font-[family-name:var(--font-sfpro)] leading-relaxed text-text-secondary md:text-base">
              Components must scale combinatorially without UI rewrites.
            </p>
          </article>

          <article className="rounded-2xl bg-accent-tertiary p-6 md:p-8">
            <h3 className="mb-4 text-xl font-[family-name:var(--font-ppvalve)] font-medium text-[#222222] md:text-2xl">
              Linear chat, non-linear spaces
            </h3>
            <p className="text-sm font-[family-name:var(--font-sfpro)] leading-relaxed text-[#222222]/85 md:text-base">
              Preserve mental models while enabling complexity.
            </p>
          </article>

          <article className="rounded-2xl bg-text-secondary/[0.03] p-6 md:p-8">
            <h3 className="mb-4 text-xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary md:text-2xl">
              Progressive disclosure
            </h3>
            <p className="text-sm font-[family-name:var(--font-sfpro)] leading-relaxed text-text-secondary md:text-base">
              Reduce cognitive load when dealing with high output volume.
            </p>
          </article>
        </div>
      </CaseStudySection>

      <CaseStudySection number="05" title="Designing for Scalability & Customisation">
        <CaseStudySubsections
          items={[
            {
              title: 'Early Mental Models and Why They Changed',
              body: (
                <p>
                  Initially, agents and flows were treated as the same concept. This broke down
                  once we introduced collaboration and handovers. A flow could orchestrate agents;
                  an agent could not contain other agents. While technical, this distinction had
                  real UX consequences, especially in builder experiences.
                </p>
              ),
            },
            {
              title: 'Managing Customisation Risk',
              body: (
                <>
                  <p>
                    Every customisation option multiplied design and technical debt. To control
                    this, we:
                  </p>
                  <CaseStudyDetailList
                    items={[
                      'Designed from atomic components',
                      'Created shared status signifiers and states',
                      'Avoided one-off UI variants',
                    ]}
                  />
                  <p>
                    This allowed us to support complex configurations without exponential
                    complexity.
                  </p>
                </>
              ),
            },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection
        number="06"
        title="Delivering the Chat Experience"
        variant="muted"
      >
        <CaseStudySubsections
          items={[
            {
              title: 'Why Chat Was Essential',
              body: (
                <>
                  <p>Chat was not a nice-to-have. It provided:</p>
                  <CaseStudyDetailList
                    items={[
                      'A safe baseline for unknown future use cases',
                      'A way for users to add rich context beyond forms',
                      'Familiarity in a fast-moving AI landscape',
                    ]}
                  />
                </>
              ),
            },
            {
              title: 'Embedding Chat into an Enterprise Product',
              body: (
                <>
                  <p>We designed:</p>
                  <CaseStudyDetailList
                    items={[
                      'A universal chat, accessible via the top navigation',
                      'A contextual prompt bar, scoped to Agentic work',
                    ]}
                  />
                  <p>Key decisions included:</p>
                  <CaseStudyDetailList
                    items={[
                      'Push-in side panel vs overlay',
                      'Undocking chat on builder pages',
                      'Redirecting actionable work into Spaces for review',
                    ]}
                  />
                  <p>
                    This prevented chat from becoming a black box while preserving traceability
                    and collaboration.
                  </p>
                </>
              ),
              media: (
                <CaseStudyImageFrame
                  src="/images/agenticchat.webp"
                  alt="Chat integration in enterprise context showing universal chat, contextual prompt bar, and redirect to Space"
                />
              ),
            },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection number="07" title="Cross-Team Communication & Influence">
        <div className="space-y-10">
          <CaseStudyProse>
            <p>
              A major part of my role was translating between two modes of working:
            </p>
          </CaseStudyProse>

          <CaseStudySplitCards
            items={[
              {
                title: 'Innovation Labs',
                body: <p>Rapid, demo-driven, minimal constraints</p>,
              },
              {
                title: 'Core Product',
                body: <p>Governed, consistent, enterprise-ready</p>,
              },
            ]}
          />

          <CaseStudyProse>
            <p>To align teams, I relied heavily on:</p>
            <CaseStudyDetailList
              items={[
                'Interactive prototypes for narrative alignment',
                'Annotated handovers with walkthrough videos',
                'Follow-up sessions to surface ambiguity early',
              ]}
            />
            <p>
              Pushback, especially from product leadership, was common and healthy. Decisions
              around chat and agent interaction patterns had platform-wide implications, requiring
              clear rationale and iteration.
            </p>
          </CaseStudyProse>
        </div>
      </CaseStudySection>

      <CaseStudySection number="08" title="Outcomes & Impact" variant="muted">
        <div className="space-y-10">
          <CaseStudySplitCards
            items={[
              {
                title: 'Product Impact',
                body: (
                  <CaseStudyDetailList
                    items={[
                      'Established Agentic Studio as the foundation for AI across SitecoreAI',
                      'Enabled customers to build and scale their own AI agents',
                      'Early partners built 100+ agents within weeks of release',
                    ]}
                  />
                ),
              },
              {
                title: 'Organisational Impact',
                body: (
                  <CaseStudyDetailList
                    items={[
                      'Centralised AI ownership within Agentic',
                      'Reduced duplicated AI efforts across product teams',
                      'Created a reusable system for future AI features',
                    ]}
                  />
                ),
              },
            ]}
          />

          <article className="rounded-2xl bg-text-secondary/[0.03] p-6 md:p-8">
            <h3 className="mb-5 text-xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary md:text-2xl">
              Trade-offs Accepted
            </h3>
            <CaseStudyDetailList
              items={[
                'Prioritised UI-based workflows over refining chat for initial release',
                'Accepted that chat required further iteration post-launch',
              ]}
            />
          </article>
        </div>
      </CaseStudySection>

      <CaseStudySection number="09" title="Reflection">
        <div className="space-y-10">
          <CaseStudyProse>
            <p>This project reinforced several lessons:</p>
            <CaseStudyDetailList
              items={[
                'Designing AI systems means designing for uncertainty',
                'Technical constraints should follow user flows, not the reverse',
                'Simplicity is harder than complexity, especially in AI',
              ]}
            />
            <p>
              If starting again, I would invest earlier in identifying the most common agent use
              cases to ground atomic design decisions in concrete scenarios.
            </p>
          </CaseStudyProse>

          <CaseStudyCallout tone="accent">
            This project demonstrates my ability to design scalable systems under extreme
            ambiguity, translate experimental AI concepts into enterprise UX, and influence
            cross-functional teams through design thinking. It actively challenges the misconception
            that AI UX is just chat, and shows how thoughtful systems design can unlock AI&apos;s
            real value in complex products.
          </CaseStudyCallout>
        </div>
      </CaseStudySection>

      <Footer />
    </main>
  );
}
