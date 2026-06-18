'use client';

import { Footer } from '../components/Footer';
import { CaseStudyHero } from '../components/case-study/CaseStudyHero';
import { CaseStudySection } from '../components/case-study/CaseStudySection';
import {
  CaseStudyCallout,
  CaseStudyDetailList,
  CaseStudyFeatureCards,
  CaseStudyImageFrame,
  CaseStudyInsightGrid,
  CaseStudyMetricGrid,
  CaseStudyProse,
  CaseStudySplitCards,
  CaseStudyTimeline,
} from '../components/case-study/CaseStudyBlocks';

export default function BlokPage() {
  return (
    <main className="min-h-screen bg-background">
      <CaseStudyHero
        title="Blok"
        subtitle="Rebuilding Sitecore's Design System for Scale, Governance, and AI"
        meta={[
          {
            label: 'Role',
            value: 'Product Designer, Design Systems Lead for Blok',
          },
          {
            label: 'Timeline',
            value: 'April 2025 to December 2025',
          },
        ]}
        imageSrc="/images/blokcasestudyheader.webp"
        imageAlt="Blok Design System"
        cta={{ label: 'Visit Blok site', href: 'https://blok.sitecore.com' }}
      />

      <CaseStudySection
        number="01"
        title="Executive Summary"
      >
        <div className="space-y-10">
          <CaseStudyProse>
            <p>
              Blok is Sitecore&apos;s design system: a shared design language that powers
              consistent experiences across Sitecore&apos;s products and marketplace applications.
            </p>
            <p>
              Although my formal title was Product Designer, I acted as{' '}
              <strong>design lead and acting product manager</strong> of Blok. I helped lead the
              initiative to rebuild the design system from the ground up, spanning architecture,
              design, adoption, documentation, and AI enablement.
            </p>
          </CaseStudyProse>

          <CaseStudyCallout tone="accent">
            What started as a UI library became a <strong>foundational platform</strong> used by
            designers, internal and external engineers, product managers, and executives to rapidly
            prototype, align, and ship ideas, especially within AI-driven workflows.
          </CaseStudyCallout>

          <div className="overflow-hidden rounded-2xl">
            <img
              src="/images/blokcasestudymock.webp"
              alt="Blok design system component showcase"
              className="w-full object-cover"
            />
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="02"
        title="The Problem"
        intro="Blok existed, but it was no longer fit for the organisation Sitecore had become."
        variant="muted"
        layout="stacked"
      >
        <CaseStudyInsightGrid
          labelFormat="alpha"
          items={[
            {
              title: 'Governance had broken down',
              body: (
                <>
                  <p>
                    Blok was originally built on Chakra UI v2 back in 2020. While effective for
                    early velocity, it created a structural problem: any deviation in styling
                    required editing core components, which blocked future updates or forced
                    re-implementation on upgrade.
                  </p>
                  <CaseStudyDetailList
                    items={[
                      'Teams either froze on old versions or forked styles',
                      'Visual drift became the norm across products',
                      'There was no enforceable design governance',
                    ]}
                  />
                </>
              ),
              result:
                'Visual drift, fragile upgrades, and no enforceable design governance.',
            },
            {
              title: "The system couldn't support multiple frameworks",
              body: (
                <>
                  <p>
                    With the launch of the Sitecore Marketplace, external teams began building
                    extensions using different React frameworks.
                  </p>
                  <CaseStudyDetailList
                    items={[
                      'Chakra was opinionated and framework-specific',
                      'It was not suitable for external developers we did not control',
                      'We needed a system that could travel across teams without imposing a stack',
                    ]}
                  />
                </>
              ),
            },
            {
              title: 'Blok was not AI-friendly',
              body: (
                <>
                  <p>
                    As AI coding tools (Cursor, Copilot, v0) became central to how teams
                    prototyped, Blok became a bottleneck.
                  </p>
                  <CaseStudyDetailList
                    items={[
                      'Heavily customised code',
                      'Minimal inline documentation',
                      'Poor AI comprehension of component structure',
                    ]}
                  />
                </>
              ),
              result:
                'AI tools struggled to generate on-brand, usable UI, undermining speed and consistency.',
            },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection
        number="03"
        title="The Strategic Decision"
        intro="As the sole designer on the initiative, partnered with two senior solutions architects, I helped closely with the evaluation of alternative platforms."
      >
        <div className="space-y-10">
          <CaseStudyProse>
            <p>
              We chose to rebuild Blok on <strong>Shadcn</strong>, not as a UI kit, but as an{' '}
              <strong>architecture</strong>.
            </p>
          </CaseStudyProse>

          <CaseStudyFeatureCards
            items={[
              {
                title: 'Governance by design',
                body: (
                  <>
                    <p>Shadcn&apos;s registry-based model allowed us to:</p>
                    <CaseStudyDetailList
                      items={[
                        'Publish stable core components individually, instead of in a single package',
                        'Enable extension without modification. Each component could be built on top of without editing the core',
                        'Update safely without breaking downstream work',
                      ]}
                    />
                    <p className="italic">
                      This single decision restored long-term governance.
                    </p>
                  </>
                ),
                image: {
                  src: '/images/blokcasestudyarchitecture.webp',
                  alt: 'Blok architecture',
                  href: '/images/blokcasestudyarchitecture.webp',
                },
              },
              {
                title: 'Framework-friendly',
                body: (
                  <>
                    <p>
                      A fully framework-agnostic system was explored, but we eventually rejected
                      it due to team size, maintenance overhead, and delivery timelines.
                    </p>
                    <p>Shadcn struck the right balance:</p>
                    <CaseStudyDetailList
                      items={[
                        'Compatible with major React frameworks',
                        'Minimally opinionated foundations (Radix + Tailwind)',
                        "Allowed us to layer Sitecore's design language on top",
                      ]}
                    />
                  </>
                ),
              },
              {
                title: 'AI-native by default',
                body: (
                  <>
                    <p>Shadcn is widely documented, commonly used in AI training data, and natively supported by tools like Vercel v0.</p>
                    <p className="italic">
                      This made Blok legible to AI, unlocking a new class of on-brand prototyping
                      workflows.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="04"
        title="Then... we started building"
        variant="muted"
      >
        <CaseStudyTimeline
          items={[
            {
              title: 'Migrating components',
              body: (
                <>
                  <p>
                    Moving from Chakra v2 to Shadcn, I audited both existing Blok components and
                    Shadcn&apos;s baseline library. From this, I defined what to keep, adapt, or
                    retire; prioritised components against active product roadmaps; created a
                    tracked component roadmap in Jira; and authored build guidance for consistency.
                  </p>
                  <p>
                    Development initially became a <strong>community effort</strong>, with engineers
                    joining from teams already adopting Shadcn and myself chasing down developers
                    to help review PRs.
                  </p>
                </>
              ),
              media: (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {[
                    { src: '/images/blokcasestudycollab1.png', alt: 'Blok collaboration 1' },
                    { src: '/images/blokcasestudycollab2.png', alt: 'Blok collaboration 2' },
                    { src: '/images/blokcasestudycollab3.png', alt: 'Blok collaboration 3' },
                  ].map((image) => (
                    <CaseStudyImageFrame
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      href={image.src}
                    />
                  ))}
                </div>
              ),
            },
            {
              title: 'Building a better developer experience',
              body: (
                <>
                  <p>
                    After the first wave of components were built by myself and contributing
                    developers, I interviewed designers and developers about how they actually used
                    Blok, broke down Sitecore design patterns into rules documented in each
                    component file, and interviewed developers implementing the new components to
                    find problems early.
                  </p>
                </>
              ),
            },
            {
              title: 'Adoption & internal GTM',
              body: (
                <>
                  <p>
                    Blok initially struggled with adoption as it was not majorly publicised or
                    advocated for. To fix this, I proactively intercepted new projects, presented
                    Blok at an R&D town hall (150+ attendees), and framed Blok as an{' '}
                    <strong>acceleration tool</strong>, not a design asset.
                  </p>
                  <p>
                    This shifted perception and adoption followed. R&D leadership pushed more
                    projects to use Blok and we started to see more initiatives being built from
                    Blok.
                  </p>
                </>
              ),
            },
            {
              title: 'Getting a team',
              body: (
                <>
                  <p>
                    As the initiative grew traction, we were allocated budget to hire a team to get
                    Blok into production for Sitecore Marketplace and continue growing its scope.
                  </p>
                  <p>
                    Once the team was hired, I onboarded them with presentations on Blok&apos;s
                    history, philosophy, and roadmap; created their first Jira tickets to guide
                    which components and docs pages to build; and reviewed PRs with feedback in
                    grooming calls and sprint planning.
                  </p>
                  <p>
                    After a few months the review feedback became fewer and the team were fully
                    set up for building out greater projects within Blok.
                  </p>
                </>
              ),
              media: (
                <div className="cursor-confetti">
                  <CaseStudyImageFrame
                    src="/images/blokcasestudyteam.png"
                    alt="Blok team"
                  />
                </div>
              ),
            },
            {
              title: 'Shipping under constraint',
              body: (
                <>
                  <p>
                    Ahead of Symposium 2025, where Blok was to be announced as released, the docs
                    site was not ready due to delayed hiring of the team.
                  </p>
                  <p>
                    I made the decision to release the registry as a Beta, without a docs site,
                    rather than delaying the whole release:
                  </p>
                  <CaseStudyDetailList
                    items={[
                      'Teams could start using Blok internally and externally, enabling early feedback',
                      'We provided temporary in-file documentation so developers could get started without visuals',
                      'During Sitecore Marketplace workshops, internal developers helped external devs use Blok while observing pain points firsthand',
                    ]}
                  />
                  <p>
                    Post-Symposium, we incorporated feedback and shipped the official release weeks
                    later.
                  </p>
                </>
              ),
            },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection number="05" title="Outcomes & Impact">
        <div className="space-y-10">
          <CaseStudyMetricGrid
            metrics={[
              {
                value: '~10k',
                label: 'Estimated monthly installs via registry',
              },
              {
                value: '100%',
                label: 'Adoption in new marketplace applications',
              },
              {
                value: '3+',
                label: 'Internal teams fully migrated',
              },
            ]}
          />

          <CaseStudySplitCards
            items={[
              {
                title: 'Organisational impact',
                body: (
                  <CaseStudyDetailList
                    items={[
                      'Blok is now the default UI foundation for Sitecore Marketplace apps',
                      '3 teams fully migrated; all others have Blok on their 2026 roadmap',
                      'Blok is used across design, engineering, product, and executive prototyping',
                    ]}
                  />
                ),
              },
              {
                title: 'AI-SDLC validation',
                body: (
                  <>
                    <p>
                      During an internal AI-SDLC workshop, I enabled every participant to prototype
                      using Blok. The resulting demos looked cohesive, were on-brand, and required
                      minimal design input.
                    </p>
                    <p>
                      These were presented to the CPO and CTO, who explicitly praised the{' '}
                      <strong>quality and refinement</strong> enabled by Blok.
                    </p>
                  </>
                ),
              },
            ]}
          />
        </div>
      </CaseStudySection>

      <CaseStudySection
        number="06"
        title="Reflection & Learning"
        variant="muted"
      >
        <div className="space-y-10">
          <CaseStudySplitCards
            items={[
              {
                title: 'What I would change',
                body: (
                  <>
                    <p>
                      We initially over-customised components to preserve legacy visual behaviour
                      from the Chakra v2 version of Blok. This came at a cost: we overwrote parts
                      of Radix&apos;s native structure, and AI tools performed worse as a result.
                    </p>
                    <p>
                      In hindsight, we should have accepted more behavioural change in favour of{' '}
                      <strong>AI and architectural alignment</strong>.
                    </p>
                  </>
                ),
              },
              {
                title: 'What this taught me',
                body: (
                  <>
                    <p>
                      This was my first zero-to-one platform initiative as a solo designer and
                      acting product manager. I got hands-on with roadmap ownership, executive
                      visibility, and cross-org dependency management.
                    </p>
                    <CaseStudyDetailList
                      items={[
                        'Balance design purity with system leverage',
                        'Drive adoption through narrative, not mandate',
                        'Operate comfortably between designer, PM, and technical partner roles',
                      ]}
                    />
                  </>
                ),
              },
            ]}
          />

          <CaseStudyCallout tone="accent">
            Blok fundamentally changed how Sitecore builds, prototypes, and aligns, and reshaped
            how I think about design systems as{' '}
            <strong>organisational infrastructure</strong>, not UI libraries.
          </CaseStudyCallout>
        </div>
      </CaseStudySection>

      <Footer />
    </main>
  );
}
