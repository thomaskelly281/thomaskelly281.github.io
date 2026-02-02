# Blok — Rebuilding Sitecore’s Design System for Scale, Governance, and AI

## Role

Product Designer (Design Lead for Blok)\
Acting Product Manager (interim PM)

## Company

Sitecore

## Timeline

April 2025 - December 2025

---

## Executive Summary

Blok is Sitecore’s design system: a shared design language that powers consistent experiences across Sitecore’s products and marketplace applications.

Although my formal title was Product Designer, I acted as **design lead and custodian** of Blok. I led the initiative to rebuild the design system from the ground up, spanning **architecture, governance, documentation, adoption, and AI enablement**.

What began as a UI library evolved into a **foundational platform** used by designers, engineers, product managers, and executives to rapidly prototype, align, and ship ideas, particularly within AI-driven workflows.

---

## The Problem

Blok existed, but it was no longer fit for the organisation Sitecore had become.

### 1. Governance had broken down

Blok was built on Chakra UI v2. While effective for early velocity, it created a structural problem:

- Any design deviation required editing core components
- Editing core components blocked future updates
- Teams either froze on old versions or forked styles

**Result:** visual drift, fragile upgrades, and no enforceable design governance.

---

### 2. The system couldn’t support multiple frameworks

With the launch of the Sitecore Marketplace, external teams began building extensions using different React frameworks.

Chakra was:

- Opinionated
- Framework-specific
- Not suitable for external developers we didn’t control

We needed a system that could **travel across teams without imposing a stack**.

---

### 3. Blok was not AI-friendly

As AI coding tools (Cursor, Copilot, v0) became central to how teams prototyped, Blok became a bottleneck:

- Heavily customised code
- Minimal inline documentation
- Poor AI comprehension

**AI tools struggled to generate on-brand, usable UI**, undermining speed and consistency.

---

## The Strategic Decision: Rebuilding on Shadcn

As the sole designer on the initiative, partnered with two senior solutions architects, I led the evaluation of alternatives.

We chose to rebuild Blok on **Shadcn**, not as a UI kit, but as an **architecture**.

### Why Shadcn worked

#### Governance by design

Shadcn’s registry-based model allowed us to:

- Publish stable core components
- Enable extension *without modification*
- Update safely without breaking downstream work

This single decision restored long-term governance.

---

#### Framework-friendly, not framework-agnostic

A fully framework-agnostic system was explored—but rejected due to:

- Team size
- Maintenance overhead
- Delivery timelines

Shadcn struck the right balance:

- Compatible with major React frameworks
- Unopinionated foundations (Radix + Tailwind)
- Allowed us to layer Sitecore’s design language on top

---

#### AI-native by default

Shadcn is:

- Widely documented
- Commonly used in AI training data
- Natively supported by tools like Vercel v0

This made Blok **legible to AI**, unlocking a new class of on-brand prototyping workflows.

---

## Execution

### Component strategy

I audited both:

- Existing Blok components
- Shadcn’s baseline library

From this, I:

- Defined what to keep, adapt, or retire
- Prioritised components against active product roadmaps
- Created a tracked component roadmap in Jira
- Authored build guidance for consistency

Development became a **community effort**, with engineers joining from teams already adopting Shadcn.

---

### Documentation & AI enablement

After the first component wave, I:

- Interviewed designers and developers on how they actually used Blok
- Designed the documentation experience around real workflows
- Embedded AI-readable rules directly into component code
- Enabled AI tools to generate compliant, on-brand UI by default

---

### Adoption & internal GTM

Blok initially struggled with adoption.

To fix this, I:

- Proactively intercepted new projects and onboarded teams
- Presented Blok at an R&D town hall (150+ attendees)
- Framed Blok as an **AI acceleration tool**, not a design asset

This shifted perception—and adoption followed.

---

### Shipping under constraint

Ahead of Symposium 2025, the docs site was not ready due to delayed hiring.

I made the call to:

- Release the registry as a **Beta**
- Provide temporary, in-context documentation
- Collect real-world feedback before final release

Post-Symposium, we incorporated feedback and shipped the official release weeks later.

---

## Outcomes & Impact

### Organisational impact

- Blok is now the **default UI foundation** for Sitecore Marketplace apps
- 3 teams fully migrated; all others have Blok on their 2026 roadmap
- Blok is used across design, engineering, product, and executive prototyping

---

### AI-SDLC validation

During an internal AI-SDLC workshop, I enabled every participant to prototype using Blok.

The resulting demos:

- Looked cohesive
- Were on-brand
- Required minimal design input

These were presented to the CPO and CTO, who explicitly praised the **quality and refinement** enabled by Blok.

---

### Metrics (directional)

- \~10,000 estimated monthly installs via the registry
- Adoption baked into every new marketplace extension
- Measurable reduction in prototype-to-alignment time

---

## Reflection & Learning

### What I would change

We initially over-customised components to preserve legacy visual behaviour. This came at a cost:

- We overwrote parts of Radix’s native structure
- AI tools performed worse as a result

In hindsight, we should have accepted more behavioural change in favour of **AI and architectural alignment**.

---

### What this taught me

This was my first end-to-end platform initiative with:

- Roadmap ownership
- Executive visibility
- Cross-org dependency management

I learned how to:

- Balance design purity with system leverage
- Drive adoption through narrative, not mandate
- Operate comfortably between designer, PM, and technical partner roles

Blok fundamentally changed how Sitecore builds, prototypes, and aligns, and reshaped how I think about design systems as **organisational infrastructure**, not UI libraries.

