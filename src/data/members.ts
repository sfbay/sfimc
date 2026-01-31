import type { Member, FilterOption } from '@/types'

/**
 * Placeholder member data
 * TODO: Replace with Payload CMS queries in production
 */
export const members: Member[] = [
  {
    id: '1',
    name: 'El Tecolote',
    slug: 'el-tecolote',
    community: 'Mission District · Latino',
    neighborhood: 'Mission District',
    category: ['ethnic'],
    description: 'Bilingual newspaper serving SF\'s Latino community since 1970. Published with SF State journalism students.',
    longDescription: `El Tecolote is San Francisco's oldest bilingual community newspaper, founded in 1970 by journalism students at San Francisco State University. For over five decades, El Tecolote has been a vital voice for the Latino community in San Francisco, covering local news, arts, culture, and social justice issues in both English and Spanish.

The newspaper continues its partnership with SF State's journalism program, providing hands-on training for the next generation of community journalists while serving as an essential information source for the Mission District and beyond.`,
    url: 'https://eltecolote.org',
    rssUrl: 'https://eltecolote.org/feed/',
    foundedYear: 1970,
    color: '#dcae27',
    socialLinks: {
      twitter: 'https://twitter.com/elteabordo',
      facebook: 'https://facebook.com/eltecolote',
      instagram: 'https://instagram.com/eltecolote',
    },
    stats: {
      founded: 1970,
      languages: ['English', 'Spanish'],
      frequency: 'Bi-weekly',
    },
  },
  {
    id: '2',
    name: 'Mission Local',
    slug: 'mission-local',
    community: 'Mission District',
    neighborhood: 'Mission District',
    category: ['neighborhood', 'investigative'],
    description: 'Nonprofit news covering SF\'s Mission neighborhood with in-depth local reporting and investigations.',
    longDescription: `Mission Local is an award-winning nonprofit news organization dedicated to covering San Francisco's Mission neighborhood. Founded in 2009 by journalists and community members, Mission Local has grown into one of the most respected hyperlocal news outlets in the country.

The publication is known for its in-depth investigative reporting on housing, public safety, and local government, as well as its street-level coverage of the vibrant Mission District community.`,
    url: 'https://missionlocal.org',
    rssUrl: 'https://missionlocal.org/feed/',
    foundedYear: 2009,
    color: '#0b525b',
    socialLinks: {
      twitter: 'https://twitter.com/mabordo',
      facebook: 'https://facebook.com/missionlocal',
      instagram: 'https://instagram.com/missionlocalsf',
    },
    stats: {
      founded: 2009,
      languages: ['English'],
      frequency: 'Daily',
    },
  },
  {
    id: '3',
    name: 'The Bay View',
    slug: 'the-bay-view',
    community: 'Hunters Point · Black',
    neighborhood: 'Bayview-Hunters Point',
    category: ['ethnic'],
    description: 'San Francisco\'s Black newspaper, covering Bayview-Hunters Point and Black communities since 1976.',
    longDescription: `The San Francisco Bay View, founded in 1976, is San Francisco's Black newspaper and a powerful voice for the Bayview-Hunters Point community and Black communities throughout the Bay Area.

The Bay View has been at the forefront of environmental justice reporting, particularly around the Hunters Point Shipyard cleanup.`,
    url: 'https://sfbayview.com',
    rssUrl: 'https://sfbayview.com/feed/',
    foundedYear: 1976,
    color: '#0b525b',
    socialLinks: {
      twitter: 'https://twitter.com/sfbayview',
      facebook: 'https://facebook.com/sfbayview',
    },
    stats: {
      founded: 1976,
      languages: ['English'],
      frequency: 'Weekly',
    },
  },
  {
    id: '4',
    name: 'SF Public Press',
    slug: 'sf-public-press',
    community: 'Citywide · Investigative',
    neighborhood: 'Citywide',
    category: ['investigative'],
    description: 'Nonprofit investigative newsroom producing deep-dive reporting on housing, government, and public safety.',
    longDescription: `SF Public Press is a nonprofit, nonpartisan news organization dedicated to investigative and explanatory journalism that serves San Francisco. Founded in 2009, SF Public Press produces in-depth reporting on critical issues including housing, homelessness, government accountability, and public safety.`,
    url: 'https://sfpublicpress.org',
    rssUrl: 'https://sfpublicpress.org/feed/',
    foundedYear: 2009,
    color: '#ff4f1f',
    socialLinks: {
      twitter: 'https://twitter.com/sfpublicpress',
      facebook: 'https://facebook.com/sfpublicpress',
    },
    stats: {
      founded: 2009,
      languages: ['English'],
      frequency: 'Weekly',
    },
  },
  {
    id: '5',
    name: 'Bay Area Reporter',
    slug: 'bay-area-reporter',
    community: 'Citywide · LGBTQ+',
    neighborhood: 'Castro',
    category: ['lgbtq'],
    description: 'The nation\'s oldest continuously published LGBTQ+ newspaper, serving the Bay Area since 1971.',
    longDescription: `The Bay Area Reporter (B.A.R.) is the nation's oldest continuously published LGBTQ+ newspaper. Founded in 1971, the B.A.R. has been documenting and serving the Bay Area's LGBTQ+ community for over five decades.`,
    url: 'https://ebar.com',
    rssUrl: 'https://ebar.com/feed/',
    foundedYear: 1971,
    color: '#c41e6a',
    socialLinks: {
      twitter: 'https://twitter.com/ebabordo',
      facebook: 'https://facebook.com/bayareareporter',
      instagram: 'https://instagram.com/bayareareporter',
    },
    stats: {
      founded: 1971,
      languages: ['English'],
      frequency: 'Weekly',
    },
  },
  {
    id: '6',
    name: 'Nichi Bei',
    slug: 'nichi-bei',
    community: 'Japantown · Japanese American',
    neighborhood: 'Japantown',
    category: ['ethnic'],
    description: 'Covering Japanese American news since 1899, with roots in SF\'s historic Japantown community.',
    longDescription: `The Nichi Bei traces its roots to 1899, making it one of the oldest Japanese American news organizations in the country. Based in San Francisco's historic Japantown, the publication serves the Japanese American community with news, cultural coverage, and community information.`,
    url: 'https://nichibei.org',
    rssUrl: 'https://nichibei.org/feed/',
    foundedYear: 1899,
    color: '#14919b',
    socialLinks: {
      twitter: 'https://twitter.com/nichibei',
      facebook: 'https://facebook.com/nichibei',
    },
    stats: {
      founded: 1899,
      languages: ['English', 'Japanese'],
      frequency: 'Bi-weekly',
    },
  },
]

export const memberCategories: FilterOption[] = [
  { value: 'all', label: 'All Publications' },
  { value: 'ethnic', label: 'Ethnic Media' },
  { value: 'neighborhood', label: 'Neighborhood' },
  { value: 'investigative', label: 'Investigative' },
  { value: 'lgbtq', label: 'LGBTQ+' },
]

export const memberFilters: FilterOption[] = [
  { value: 'all', label: 'All Publications' },
  ...members.map(m => ({ value: m.slug, label: m.name })),
]

// Helper functions
export function getMemberBySlug(slug: string): Member | undefined {
  return members.find(m => m.slug === slug)
}

export function getMembersByCategory(category: string): Member[] {
  if (category === 'all') return members
  return members.filter(m => m.category.includes(category))
}

export function getFeaturedMembers(limit = 4): Member[] {
  return members.slice(0, limit)
}
