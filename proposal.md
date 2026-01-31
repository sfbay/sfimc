# BAIMCO Website & Impact Platform Proposal

**Prepared for:** Coalition Stakeholder Review
**Prepared by:** Jesse Garnier, Coalition Coordinator
**Date:** January 2026
**Status:** Draft for Discussion

---

## Executive Summary

This proposal outlines a web presence for the Bay Area Independent Community Media Coalition (BAIMCO) that goes beyond a traditional organizational website. The platform will serve three interconnected purposes:

1. **Coalition Identity** — Establish BAIMCO's public presence and credibility
2. **Impact Aggregator** — Curate and showcase the real-world impact of coalition journalism
3. **Campaign Infrastructure** — Support advocacy campaigns with dedicated sub-sites

The central theme is **IMPACT**. Every element of the platform answers: *What difference does community journalism make?*

This approach differentiates BAIMCO from trade associations focused on revenue metrics, positioning the coalition as a civic infrastructure organization demonstrating journalism's democratic value.

---

## The Problem We're Solving

### For Policymakers & Funders
"Why should we invest in local journalism?"

Current answer: Abstract arguments about democracy and news deserts.

Better answer: **Concrete evidence of impact** — stories that changed policy, exposed wrongdoing, connected communities to resources.

### For Coalition Members
"What does the coalition do for us?"

Current answer: Advocacy coordination, networking.

Better answer: **Amplification and visibility** — a platform that showcases member work and demonstrates collective impact.

### For the Public
"Why does ethnic and community media matter?"

Current answer: Vague statements about diversity.

Better answer: **Tangible examples** — stories that mattered to real communities, outcomes that wouldn't have happened without local journalism.

---

## Proposed Solution

### Component 1: Core Website

**Purpose:** Establish coalition identity and provide essential information

**Key Pages:**
- **Home** — Mission, impact highlights, call to action
- **About** — Coalition history, structure, theory of change
- **Members** — Directory of member publications with profiles and links
- **Policy Wins** — Documentation of achievements (50% resolution, ongoing campaigns)
- **Resources** — Advocacy materials, research links, Common Cause study
- **News/Updates** — Coalition activities, ecosystem developments
- **Contact/Join** — Entry point for interested parties

**Design Approach:**
- Mission-forward language (not revenue/business framing)
- Real photography of community journalism (not stock images)
- Clean, professional, credible — modeled on NJ Civic Information Consortium
- Equity and community voice as core principles

### Component 2: Impact Aggregator

**Purpose:** Curate and showcase journalism impact from coalition members

**Core Functionality:**
- Aggregate stories from member publications (RSS feeds + manual curation)
- Tag stories with **impact outcomes**:
  - Policy changed
  - Resources connected
  - Accountability achieved
  - Award recognition
  - Community response
  - Citation/amplification
- Display in filterable, shareable format
- Archive for permanence (protect against link rot)

**Impact Categories:**
| Category | Example |
|----------|---------|
| Policy Impact | Story led to legislation, regulation, or government action |
| Accountability | Investigation resulted in resignation, charges, or reform |
| Resource Connection | Reporting connected community members to services |
| Recognition | Award, citation, or republication by larger outlet |
| Community Response | Measurable community engagement or action |

**Why This Matters:**
- Provides concrete evidence for funding requests (SF Civic Media Fund)
- Demonstrates coalition value to current and prospective members
- Creates shareable proof points for advocacy
- Builds institutional memory of journalism's impact

**Technical Approach:**
- Content management system for curation
- RSS integration for automated story discovery
- Manual tagging for impact categorization
- Archive storage for permanence
- Share tools for social amplification

### Component 3: Campaign Sub-sites

**Purpose:** Support specific advocacy campaigns with dedicated web presence

**Example Use Cases:**
- SF Civic Media Fund campaign page
- Daly City Voice project site (if/when launched)
- Annual "State of Local Journalism" report
- Specific policy advocacy (future campaigns)

**Approach:**
- Modular design allowing campaign-specific URLs
- Consistent visual identity with core site
- Can be spun up quickly for time-sensitive campaigns
- Archived when campaigns conclude

---

## Identity Concept: baimc

### The Concept

The coalition name builds around a central insight: the "i" in **baimc** does the most important work.

```
ba i mc
```

**The "i" as joiner:**
- Connects "ba" (Bay Area) and "mc" (Media Coalition)
- Carries the core meaning: independent, information
- Bridges the two halves while defining the whole

**The paradox:**
- **Visually lighter** — the "i" recedes, connects, bridges
- **Conceptually central** — the "i" is the reason the coalition exists

Like a hinge: small, but holds everything together. The quiet letter that carries the meaning.

### Visual Treatment Options

| Treatment | Effect |
|-----------|--------|
| ba**i**mc (lighter weight) | "i" recedes, joins subtly |
| ba**i**mc (accent color) | "i" stands out, defines (Roger Black approach) |
| BA**i**MC (mixed case) | Emphasizes the joining role |

The final treatment will be developed after stakeholder alignment on the concept.

### Domain Considerations

| Option | Notes |
|--------|-------|
| baimc.org | Direct, professional, .org signals coalition |
| baimc.media | Modern TLD, journalism-focused |
| baimc.news | News-focused TLD |

**Sub-domains for campaigns:**
- civicfund.baimc.org
- dalycityvoice.baimc.org

---

## Technical Approach

### Architecture

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | Next.js + React | Modern, performant, flexible |
| CMS | Payload CMS | Self-hosted, full control, no vendor lock-in |
| Database | PostgreSQL | Reliable, scalable |
| Storage | Cloudflare R2 | Cost-effective archive storage |
| Hosting | Traditional hosting | Per requirements |

### Why This Stack

1. **Self-hosted CMS** — No monthly SaaS fees, full data ownership
2. **Modern frontend** — Fast, accessible, mobile-responsive
3. **Archive capability** — Stories preserved even if original sources disappear
4. **Shared infrastructure** — Leverages existing development work on related projects

### Content Management

Non-technical coalition members will be able to:
- Add/edit member profiles
- Post news updates
- Curate impact stories
- Tag stories with outcomes
- Manage campaign pages

No coding required for day-to-day content management.

---

## Relationship to Existing Initiatives

### SF Civic Media Fund
The Impact Aggregator directly supports fund advocacy by providing:
- Evidence of journalism impact for funding justification
- Infrastructure that could be referenced in fund design
- Demonstration of coalition coordination capacity

### JOUR 575 / Academic Partnerships
Student journalism published in coalition outlets can be tracked for impact, demonstrating the value of university-community partnerships.

### Common Cause Research
The platform can prominently feature and build upon the "Local Voices on Local News" study, connecting research to ongoing advocacy.

---

## What Success Looks Like

### 6-Month Milestones
- Core website live with member directory
- Impact Aggregator seeded with initial stories
- Visual identity established and in use
- At least one campaign sub-site deployed

### 12-Month Indicators
- Regular impact story curation (weekly or better)
- Platform referenced in advocacy materials
- Member publications linking to their profiles
- Policymaker/funder engagement with impact evidence

### Long-term Vision
- Comprehensive archive of Bay Area community journalism impact
- Template replicable by other regional coalitions
- Integration with SF Civic Media Fund (if established)
- Sustainable content workflow with coalition participation

---

## Outstanding Decisions for Stakeholder Input

The following questions require coalition input before proceeding to detailed design:

### Identity & Branding

1. **"i as joiner" concept:** Does this framing resonate — the "i" as the central, connecting, defining letter?

2. **Visual treatment:** Lighter/recessive "i" or accent color "i" (Roger Black approach)?

3. **Geographic scope messaging:** How prominently should we emphasize SF vs. broader Bay Area?

4. **Visual identity:** Should we commission professional logo design, or develop in-house?

### Technical & Operational

5. **Domain/TLD:** Which domain option best serves the coalition?
   - baimc.org
   - baimc.media
   - baimc.news
   - Other?

6. **Content workflow:** Who will be responsible for ongoing content curation?
   - Coalition coordinator?
   - Rotating member responsibility?
   - Academic partner (SF State)?

7. **Member input:** Should member publications have direct access to update their profiles, or should updates flow through a coordinator?

### Strategic

8. **Launch timing:** Is there an advocacy moment we should target for launch (e.g., budget cycle, civic fund developments)?

9. **Campaign priorities:** Which campaign sub-site should we develop first?
   - SF Civic Media Fund
   - General advocacy toolkit
   - Other?

10. **Impact taxonomy:** What impact categories matter most for our advocacy goals?

---

## Proposed Next Steps

### Phase 1: Alignment (This Meeting)
- Review proposal and wireframes
- Discuss outstanding decisions
- Identify blockers or concerns
- Confirm direction

### Phase 2: Identity Development
- Finalize name/domain
- Develop visual identity (logo, colors, typography)
- Collect member publication logos
- Source community photography

### Phase 3: Core Build
- Develop core website pages
- Set up content management system
- Create member directory
- Document policy wins

### Phase 4: Impact Aggregator
- Configure RSS feeds for member publications
- Develop impact tagging system
- Seed with initial curated stories
- Test share functionality

### Phase 5: Launch & Iterate
- Soft launch for coalition review
- Public launch
- Establish content workflow
- Monitor and improve

---

## Appendices

*See attached:*
- A. Wireframe mockups (key pages)
- B. Comparative analysis (peer organization websites)
- C. Technical architecture diagram
- D. Member publication inventory

---

**Questions or feedback:** Contact Jesse Garnier at jgarnier@sfsu.edu

