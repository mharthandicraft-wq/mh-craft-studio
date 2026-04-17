import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LANG, normalizeLang, type Lang } from './i18n';

export type PageEntry = CollectionEntry<'pages'>;
export type HomePageContent = Extract<PageEntry['data'], { pageId: 'home' }>;
export type StoryPageContent = Extract<PageEntry['data'], { pageId: 'story' }>;
export type PortfolioEntry = CollectionEntry<'portfolio'>;

const hasLocalePrefix = (entryId: string, lang: Lang) => {
  return entryId.startsWith(`${lang}/`);
};

const isHomePageEntry = (
  entry: PageEntry,
  lang: Lang,
): entry is PageEntry & { data: HomePageContent } => {
  return entry.data.pageId === 'home' && hasLocalePrefix(entry.id, lang);
};

const isStoryPageEntry = (
  entry: PageEntry,
  lang: Lang,
): entry is PageEntry & { data: StoryPageContent } => {
  return entry.data.pageId === 'story' && hasLocalePrefix(entry.id, lang);
};

export const getHomePageContent = async (lang: string): Promise<HomePageContent> => {
  const activeLang = normalizeLang(lang);
  const pages = await getCollection('pages');

  const page = pages.find((entry) => isHomePageEntry(entry, activeLang));

  if (page) {
    return page.data;
  }

  const fallbackPage = pages.find((entry) => isHomePageEntry(entry, DEFAULT_LANG));

  if (!fallbackPage) {
    throw new Error('Missing fallback home page content for default locale.');
  }

  return fallbackPage.data;
};

export const getStoryPageContent = async (lang: string): Promise<StoryPageContent> => {
  const activeLang = normalizeLang(lang);
  const pages = await getCollection('pages');

  const page = pages.find((entry) => isStoryPageEntry(entry, activeLang));

  if (page) {
    return page.data;
  }

  const fallbackPage = pages.find((entry) => isStoryPageEntry(entry, DEFAULT_LANG));

  if (!fallbackPage) {
    throw new Error('Missing fallback story page content for default locale.');
  }

  return fallbackPage.data;
};

export const getPortfolioProjects = async (lang: string): Promise<PortfolioEntry[]> => {
  const activeLang = normalizeLang(lang);
  const projects = await getCollection('portfolio');
  const localizedProjects = projects.filter((entry) => hasLocalePrefix(entry.id, activeLang));

  return localizedProjects.sort((left, right) => left.data.title.localeCompare(right.data.title));
};

export const getPortfolioProject = async (lang: string, translationKey: string): Promise<PortfolioEntry | undefined> => {
  const projects = await getPortfolioProjects(lang);
  return projects.find((entry) => entry.data.translationKey === translationKey);
};

export const getPortfolioStaticPaths = async () => {
  const projects = await getCollection('portfolio');

  return projects.map((project) => ({
    params: {
      lang: project.data.locale,
      slug: project.data.translationKey,
    },
    props: { project },
  }));
};
