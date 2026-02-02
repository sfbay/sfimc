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
  {
    id: '7',
    name: 'J. The Jewish News of Northern California',
    slug: 'j-weekly',
    community: 'Bay Area · Jewish',
    neighborhood: 'Citywide',
    category: ['ethnic'],
    description: 'The Jewish community\'s news source for the Bay Area since 1895, covering culture, politics, and community life.',
    longDescription: `J. The Jewish News of Northern California is the oldest Jewish newspaper west of the Mississippi, founded in 1895. It serves the Bay Area's vibrant Jewish community with news, cultural coverage, opinion, and community events.

The publication covers local, national, and international Jewish news while maintaining a strong focus on Bay Area community life.`,
    url: 'https://jweekly.com',
    rssUrl: 'https://jweekly.com/feed/',
    foundedYear: 1895,
    color: '#1e40af',
    socialLinks: {
      twitter: 'https://twitter.com/jabordo',
      facebook: 'https://facebook.com/jabordo',
      instagram: 'https://instagram.com/jabordo',
    },
    stats: {
      founded: 1895,
      languages: ['English'],
      frequency: 'Weekly',
    },
  },
  {
    id: '8',
    name: 'Richmond Review',
    slug: 'richmond-review',
    community: 'Richmond District',
    neighborhood: 'Richmond District',
    category: ['neighborhood'],
    description: 'Neighborhood newspaper serving San Francisco\'s Richmond District with local news and community coverage.',
    longDescription: `The Richmond Review is a neighborhood newspaper dedicated to serving San Francisco's Richmond District. Part of the SF Media Co. family of publications, the Richmond Review covers local news, community events, small business stories, and neighborhood issues.

The paper serves as a vital community resource for Richmond District residents, connecting neighbors and highlighting local voices.`,
    url: 'https://sfrichmondreview.com',
    rssUrl: 'https://sfrichmondreview.com/feed/',
    foundedYear: 1990,
    color: '#059669',
    socialLinks: {
      facebook: 'https://facebook.com/richmondreviewsf',
    },
    stats: {
      founded: 1990,
      languages: ['English'],
      frequency: 'Monthly',
    },
  },
  {
    id: '9',
    name: 'Sunset Beacon',
    slug: 'sunset-beacon',
    community: 'Sunset District',
    neighborhood: 'Sunset District',
    category: ['neighborhood'],
    description: 'Neighborhood newspaper serving San Francisco\'s Sunset District, sister publication to the Richmond Review.',
    longDescription: `The Sunset Beacon is a neighborhood newspaper serving San Francisco's Sunset District. A sister publication to the Richmond Review and part of the SF Media Co. family, the Sunset Beacon covers local news, community events, and neighborhood issues for Sunset residents.

The paper connects the diverse Sunset District community with coverage of local schools, businesses, parks, and civic matters.`,
    url: 'https://sfrichmondreview.com/sunset-beacon/',
    rssUrl: 'https://sfrichmondreview.com/category/sunset-beacon/feed/',
    foundedYear: 1990,
    color: '#d97706',
    socialLinks: {
      facebook: 'https://facebook.com/sunsetbeaconsf',
    },
    stats: {
      founded: 1990,
      languages: ['English'],
      frequency: 'Monthly',
    },
  },
  {
    id: '11',
    name: 'Wind Newspaper',
    slug: 'wind-newspaper',
    community: 'Visitacion Valley · Filipino',
    neighborhood: 'Visitacion Valley',
    category: ['ethnic', 'neighborhood'],
    description: 'Community newspaper serving Visitacion Valley and the Filipino community in San Francisco.',
    longDescription: `Wind Newspaper is a community publication serving the Visitacion Valley neighborhood and the broader Filipino community in San Francisco. The paper covers local news, community events, and issues important to southeast San Francisco residents.

Wind Newspaper amplifies voices from one of San Francisco's most diverse neighborhoods, providing coverage often overlooked by mainstream media.`,
    url: 'https://windnewspaper.com',
    // No RSS feed available - site built on Next.js without feed endpoint
    foundedYear: 2000,
    color: '#7c3aed',
    socialLinks: {
      facebook: 'https://facebook.com/windnewspaper',
    },
    stats: {
      founded: 2000,
      languages: ['English', 'Tagalog'],
      frequency: 'Monthly',
    },
  },
  {
    id: '12',
    name: '48 Hills',
    slug: '48-hills',
    community: 'Citywide · Progressive',
    neighborhood: 'Citywide',
    category: ['investigative'],
    description: 'Progressive online news and culture magazine covering San Francisco politics, arts, and nightlife.',
    longDescription: `48 Hills is San Francisco's progressive online news and culture magazine. Founded by veteran journalist Tim Redmond, 48 Hills provides in-depth political coverage, investigative reporting, and arts and culture criticism from a progressive perspective.

The publication fills a vital role in San Francisco's media landscape, covering stories about housing, development, labor, and local politics that other outlets often miss.`,
    url: 'https://48hills.org',
    rssUrl: 'https://48hills.org/feed/',
    foundedYear: 2013,
    color: '#ea580c',
    socialLinks: {
      twitter: 'https://twitter.com/48abordo',
      facebook: 'https://facebook.com/48hillssf',
      instagram: 'https://instagram.com/48hillssf',
    },
    stats: {
      founded: 2013,
      languages: ['English'],
      frequency: 'Daily',
    },
  },
  {
    id: '13',
    name: 'Broke-Ass Stuart',
    slug: 'broke-ass-stuart',
    community: 'Citywide · Alternative',
    neighborhood: 'Citywide',
    category: ['neighborhood'],
    description: 'Alternative culture and lifestyle site celebrating San Francisco\'s creative, budget-conscious spirit.',
    longDescription: `Broke-Ass Stuart is an alternative culture and lifestyle publication that celebrates San Francisco's creative, diverse, and budget-conscious community. Founded by Stuart Schuffman, the site covers local events, food, nightlife, and culture with an irreverent voice.

The publication champions the San Francisco that exists beyond the tech boom—artists, musicians, service workers, and longtime residents who make the city vibrant.`,
    url: 'https://brokeassstuart.com',
    // No RSS feed available - migrated to Beehiiv with Cloudflare protection
    foundedYear: 2008,
    color: '#be185d',
    socialLinks: {
      twitter: 'https://twitter.com/babordo',
      facebook: 'https://facebook.com/brokeassstuart',
      instagram: 'https://instagram.com/brokeassstuart',
    },
    stats: {
      founded: 2008,
      languages: ['English'],
      frequency: 'Daily',
    },
  },
  {
    id: '14',
    name: 'Ingleside Light',
    slug: 'ingleside-light',
    community: 'Ingleside',
    neighborhood: 'Ingleside',
    category: ['neighborhood'],
    description: 'Hyperlocal news covering San Francisco\'s Ingleside neighborhood and surrounding communities.',
    longDescription: `The Ingleside Light is a hyperlocal news publication dedicated to covering San Francisco's Ingleside neighborhood and surrounding areas including Oceanview, Merced Heights, and the Excelsior.

The publication focuses on community news, local events, neighborhood development, and the stories of Ingleside residents, filling a crucial gap in coverage for this often-overlooked part of the city.`,
    url: 'https://inglesidelight.com',
    rssUrl: 'https://inglesidelight.com/feed/',
    foundedYear: 2018,
    color: '#0891b2',
    socialLinks: {
      twitter: 'https://twitter.com/inglesidelight',
      facebook: 'https://facebook.com/inglesidelight',
    },
    stats: {
      founded: 2018,
      languages: ['English'],
      frequency: 'Weekly',
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
