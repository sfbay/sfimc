# SFIMC - San Francisco Independent Media Coalition

## Project Overview

SFIMC is a coalition website that aggregates and amplifies news from 14 independent San Francisco publications. **Core principle**: SFIMC directs users TO individual member publications, not replacing them.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **CMS**: Payload CMS (headless)
- **Styling**: Tailwind CSS with CSS custom properties
- **Fonts**: Fraunces (display), DM Sans (body)
- **Package Manager**: pnpm

## Project Structure

```
app/
  (app)/           # Main app routes with shared layout
    news/          # News feed page
    members/       # Publishers/members page
  api/
    news/          # News API endpoint
    rss/
      poll/        # RSS polling endpoint
      import/      # Manual RSS import endpoint
src/
  components/
    cards/         # StoryCard with multiple variants
    news/          # NewsFeedMasonry, PublisherFilterBar, PublisherLane
    publishers/    # PublisherBadge, PublisherAvatar
  data/
    members.ts     # Member publication data with RSS URLs, colors
  lib/
    news/
      utils.ts     # Logo mapping, text sanitization, rate limiting
```

## Key Components

### StoryCard (`src/components/cards/StoryCard.tsx`)
Three variants:
- **featured**: Large hero card with dark gradient, white text, brand-colored CTA
- **publisher-branded**: Colored textured backgrounds for stories without images
- **compact**: Minimal layout for sidebars

### NewsFeedMasonry (`src/components/news/NewsFeedMasonry.tsx`)
Main news feed with:
- View mode toggle (Timeline vs By Publisher)
- Hero story (Zone A)
- Publisher spotlight carousel (Zone B) - auto-rotates every 8s
- Story grid (Zone C)
- Publisher lanes (Zone D)
- Infinite scroll

### PublisherFilterBar (`src/components/news/PublisherFilterBar.tsx`)
Horizontal scrollable filter pills with publisher logos and brand colors.

## RSS Feed System

### Data Source
Member RSS feeds defined in `src/data/members.ts` with `rssUrl` field.

### URL Overrides (`app/api/rss/poll/route.ts`)
Some publications need URL overrides due to incorrect CMS data or redirects:
```typescript
const URL_OVERRIDES: Record<string, string> = {
  'el-tecolote': 'https://eltecolote.org/content/en/feed/',
  'bay-area-reporter': 'https://www.ebar.com/rss/23/News',
  'ingleside-light': 'https://www.inglesidelight.com/rss/',
  'sf-public-press': 'https://www.sfpublicpress.org/feed/',
}
```

### Manual Import
For bot-protected feeds or older stories, use browser-based import:
1. Open RSS feed URL in browser
2. Copy XML content
3. POST to `/api/rss/import` with `{ xml: "...", memberSlug: "..." }`

## Publisher Logo System

### Logo Map (`src/lib/news/utils.ts`)
Maps member slugs to logo paths in `/public/images/publishers/`:
```typescript
const logoMap: { [key: string]: string } = {
  'el-tecolote': '/images/publishers/el-tecolote.png',
  'mission-local': '/images/publishers/mission-local.png',
  // ... etc
}
```

### Recommended Logo Dimensions
- **Width**: 200-400px
- **Height**: Auto (maintain aspect ratio)
- **Format**: PNG with transparency
- **Location**: `/public/images/publishers/`

## Design System

### Brand Colors (CSS Custom Properties)
```css
--color-ink: #1a1a1a       /* Primary text */
--color-charcoal: #2d2d2d  /* Dark backgrounds */
--color-warm-gray: #6b6563 /* Secondary text */
--color-dot: #e85d4c       /* Accent/CTA */
--color-teal: #2d9596      /* Secondary accent */
--color-cream: #faf8f5     /* Light backgrounds */
--color-mist: #f0eeeb      /* Subtle backgrounds */
```

### Publisher Colors
Each member has a unique brand color in `src/data/members.ts`. Used for:
- Filter pill highlights
- Story card accents (4px left border)
- Textured backgrounds for imageless stories
- Spotlight gradients

## Common Tasks

### Adding a New Member Publication
1. Add to `src/data/members.ts` with name, slug, url, rssUrl, color
2. Add logo to `/public/images/publishers/`
3. Update logoMap in `src/lib/news/utils.ts`
4. If RSS needs override, add to URL_OVERRIDES in poll route

### Debugging RSS Issues
1. Check URL_OVERRIDES for redirects
2. Test feed URL directly in browser
3. Use `/api/rss/import` for manual import if bot-protected
4. Check for stories outside 7-day window (RECENT_STORIES_WINDOW_HOURS)

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm lint         # Run ESLint
```
