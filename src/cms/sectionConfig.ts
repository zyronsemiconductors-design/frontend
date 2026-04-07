import Eng from '../content/Eng';

const FEATURE_ICON_NAMES = [
  'CalendarCheck',
  'Cpu',
  'Layers',
  'Code2',
  'TestTube2',
  'Wrench'
];

const homeFeatures = {
  ...Eng.home.features,
  list: Eng.home.features.list.map((item, idx) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    icon: FEATURE_ICON_NAMES[idx] || 'CalendarCheck'
  }))
};

const pageHeader = (header: { title: string; highlight: string; subtitle: string; bgImage: string }) => ({
  title: header.title,
  highlight: header.highlight,
  subtitle: header.subtitle,
  bgImage: header.bgImage
});

export const CMS_PAGES = [
  {
    id: 'global',
    label: 'Site Wide',
    icon: '🌐',
    sections: [
      {
        key: 'nav',
        label: 'Navigation',
        description: 'Top navigation menus (Main, Services, Why)',
        defaultContent: Eng.nav
      },
      {
        key: 'footer',
        label: 'Footer',
        description: 'Footer brand, links, and contact info',
        defaultContent: Eng.Common.footer
      }
    ]
  },
  {
    id: 'home',
    label: 'Home Page',
    icon: '🏠',
    sections: [
      { key: 'hero', label: 'Hero Carousel', description: 'Hero slider content', defaultContent: Eng.headers.home },
      { key: 'features', label: 'Features', description: 'Features grid', defaultContent: homeFeatures },
      { key: 'services', label: 'Services Preview', description: 'Services section on home', defaultContent: Eng.home.services },
      { key: 'about', label: 'About Section', description: 'About content on home', defaultContent: Eng.home.about },
      { key: 'contact_info', label: 'Contact Info', description: 'Contact section on home', defaultContent: Eng.Common.contactInfo }
    ]
  },
  {
    id: 'about',
    label: 'About Page',
    icon: '📖',
    sections: [
      { key: 'header', label: 'Page Header', description: 'Top banner for About page', defaultContent: pageHeader(Eng.headers.about) },
      { key: 'mission', label: 'About Content', description: 'Main About section', defaultContent: { title: 'About Company', description: Eng.home.about.paragraphs.join(' ') } }
    ]
  },
  {
    id: 'services',
    label: 'Services Page',
    icon: '⚙️',
    sections: [
      { key: 'header', label: 'Page Header', description: 'Top banner for Services page', defaultContent: pageHeader(Eng.headers.services) },
      { key: 'services_list', label: 'Services List', description: 'Detailed services list', defaultContent: Eng.services },
      { key: 'courses_v2', label: 'Courses (New)', description: 'Courses under Training & Upskilling', defaultContent: Eng.courses }
    ]
  },
  {
    id: 'why-zyron',
    label: 'Why Zyron Page',
    icon: '⭐',
    sections: [
      { key: 'header', label: 'Page Header', description: 'Top banner for Why Zyron page', defaultContent: pageHeader(Eng.headers.why) },
      { key: 'advantages', label: 'Advantages', description: 'Why Zyron features list', defaultContent: Eng.whyFeatures }
    ]
  },
  {
    id: 'careers',
    label: 'Careers Page',
    icon: '💼',
    sections: [
      { key: 'header', label: 'Page Header', description: 'Top banner for Careers page', defaultContent: pageHeader(Eng.headers.careers) },
      { key: 'intro', label: 'Intro', description: 'Careers intro section', defaultContent: Eng.Careers.intro },
      { key: 'culture', label: 'Culture', description: 'Life at Zyron section', defaultContent: Eng.Careers.culture },
      { key: 'jobs', label: 'Job Listings', description: 'List of job openings', defaultContent: Eng.Careers.jobs },
      { key: 'cta', label: 'Careers CTA', description: 'CTA form content', defaultContent: Eng.Careers.cta }
    ]
  },
  {
    id: 'contact',
    label: 'Contact Page',
    icon: '📧',
    sections: [
      { key: 'header', label: 'Page Header', description: 'Top banner for Contact page', defaultContent: pageHeader(Eng.headers.contact) },
      { key: 'contact_info', label: 'Contact Info', description: 'Contact details and labels', defaultContent: Eng.Common.contactInfo }
    ]
  },
  {
    id: 'community',
    label: 'Community Page',
    icon: '👥',
    sections: [
      { key: 'header', label: 'Page Header', description: 'Top banner for Community page', defaultContent: Eng.community.header },
      { key: 'intro', label: 'Intro', description: 'Community intro section', defaultContent: Eng.community.intro },
      { key: 'pillars', label: 'Pillars', description: 'Community pillars', defaultContent: Eng.community.pillars },
      { key: 'activities', label: 'Activities', description: 'Community activities', defaultContent: Eng.community.activities },
      { key: 'join', label: 'Join CTA', description: 'Join community call-to-action', defaultContent: Eng.community.join }
    ]
  },
  {
    id: 'resources',
    label: 'Resources Page',
    icon: '📚',
    sections: [
      { key: 'header', label: 'Page Header', description: 'Top banner for Resources page', defaultContent: Eng.resources.header },
      { key: 'intro', label: 'Intro', description: 'Resources intro section', defaultContent: Eng.resources.intro },
      { key: 'categories', label: 'Categories', description: 'Resource categories list', defaultContent: Eng.resources.categories },
      { key: 'items', label: 'Resources List', description: 'Resources items list', defaultContent: Eng.resources.items },
      { key: 'cta', label: 'Resources CTA', description: 'Resources call-to-action', defaultContent: Eng.resources.cta }
    ]
  }
];

export const getDefaultSectionContent = (pageId: string, sectionKey: string) => {
  const page = CMS_PAGES.find(p => p.id === pageId);
  const section = page?.sections.find(s => s.key === sectionKey);
  return section?.defaultContent ?? {};
};
