# SFIMC Visual Redesign Plan

*Elevating from wireframe to production-quality journalism coalition platform*

---

## Executive Summary

Based on comprehensive research of 11+ journalism consortium websites (INN, LION Publishers, Solutions Journalism Network, Free Press, and others), this plan proposes transforming SFIMC from its current wireframe-literal state into a distinctive, community-connected platform that rivals the best in the sector.

**Goal**: Take the site "2-3 levels up" visually and functionally while maintaining the existing technical foundation (Next.js 15, Payload CMS, Tailwind v4).

---

## Phase 1: Visual Foundation Upgrades

### 1.1 Hero Section Transformation
**Current**: Static headline on dark background
**Proposed**:
- Animated "The Dot" element as signature visual
- Full-bleed photography of SF journalism/newsrooms
- Kinetic typography with staggered reveal
- Mission statement with impact metrics overlay
- Primary CTA with hover state animation

**Files to modify**:
- `src/components/Hero/Hero.tsx`
- `src/styles/globals.css` (add animations)

### 1.2 Color System Enhancement
**Current**: Colors defined but underutilized
**Proposed**:
- Gradient treatments using Dot + Teal
- Contextual color shifts (light/dark sections)
- Accent color micro-interactions
- Tinted photography overlays

**Files to modify**:
- `src/styles/globals.css` (extend color utilities)
- Component-level style additions

### 1.3 Typography Dynamics
**Current**: Static type hierarchy
**Proposed**:
- Variable font weight animations on Fraunces
- Pull quotes with decorative treatment
- Section labels with JetBrains Mono + The Dot marker
- Responsive type scaling improvements

---

## Phase 2: Component System Overhaul

### 2.1 Card Components
**New patterns needed**:
- Publication card (for member directory)
- Story card (for aggregated feed)
- Event card (for calendar)
- Resource card (for guides/toolkits)
- Action card (for advocacy CTAs)

**Design features**:
- Hover lift with shadow progression
- Image zoom on hover
- Category color coding
- Source publication badge
- Reading time/date metadata

### 2.2 Navigation Enhancement
**Current**: Basic nav with logo
**Proposed**:
- Sticky nav with scroll-triggered background
- Mega-menu for Resources section
- Mobile drawer with full-screen treatment
- Active state indicators
- Search integration

### 2.3 Footer Redesign
**Proposed**:
- Newsletter signup with animated input
- Member publication logos grid
- Social proof (coalition statistics)
- Sitemap with hover effects
- The Dot as decorative element

---

## Phase 3: Community Connection Features

### 3.1 Member Publication Directory
**New section**: `/members` or `/publications`
- Filterable grid of member outlets
- Publication cards with logo, description, RSS link
- Geographic/beat categorization
- "Visit Publication" CTAs

### 3.2 Aggregated News Feed
**New section**: `/news` or `/stories`
- RSS-sourced content from members
- Category filtering
- Publication source badges
- Infinite scroll or pagination
- "Read at source" links (drives traffic to members)

### 3.3 Coalition Impact Dashboard
**New component** for homepage:
- Member count with animated counter
- Stories published (aggregated)
- Readers reached (estimated)
- Years of coalition history
- Map of SF coverage areas

---

## Phase 4: Engagement Features

### 4.1 Newsletter Integration
- Prominent signup with value proposition
- Animated input states
- Success/error feedback
- Integration with email provider

### 4.2 Events Calendar
**New section**: `/events`
- Upcoming coalition events
- Virtual/in-person indicators
- Registration CTAs
- Past events archive

### 4.3 Action Center
**New section**: `/action` or `/advocacy`
- Current campaigns
- Petition/letter tools
- Policy explainers
- Victory timeline

---

## Phase 5: Micro-Interactions & Polish

### 5.1 Animation Library
- Page transition effects
- Scroll-triggered reveals
- Button hover states
- Loading skeletons
- Success confirmations

### 5.2 Accessibility Audit
- Color contrast verification
- Keyboard navigation
- Screen reader testing
- Reduced motion support

### 5.3 Performance Optimization
- Image optimization (next/image)
- Font loading strategy
- Code splitting
- Core Web Vitals monitoring

---

## Implementation Priority

### Immediate Impact (Week 1)
1. Hero section animation and photography
2. Card component hover states
3. Navigation scroll behavior
4. Color gradient treatments

### Community Features (Week 2)
1. Member publication directory
2. Aggregated news feed (RSS already built)
3. Impact statistics component

### Engagement Layer (Week 3)
1. Newsletter signup redesign
2. Events calendar
3. Action center basics

### Polish Phase (Week 4)
1. Micro-interactions throughout
2. Page transitions
3. Mobile refinements
4. Accessibility audit

---

## Technical Approach

### Styling Strategy
- Extend Tailwind config with custom animations
- CSS custom properties for dynamic theming
- Framer Motion for complex animations
- CSS-only for simple hover states

### Component Architecture
- Atomic design principles
- Storybook for component documentation
- TypeScript props for type safety
- Composition over configuration

### Data Integration
- Payload CMS for content management
- RSS aggregation (already built)
- API routes for dynamic data

---

## Success Metrics

1. **Visual Distinction**: Site no longer looks like a wireframe
2. **Community Connection**: Member publications prominently featured
3. **Engagement**: Clear CTAs and newsletter signup
4. **Performance**: Core Web Vitals in green
5. **Accessibility**: WCAG 2.1 AA compliance

---

## Next Steps

1. [ ] User approval of this plan
2. [ ] Hero section redesign (highest visual impact)
3. [ ] Card component system
4. [ ] Member directory implementation
5. [ ] Iterative refinement based on feedback

---

*Research documentation: [docs/design-research.md](./docs/design-research.md)*
