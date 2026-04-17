export const SUPPORTED_LANGS = ['en', 'tr', 'fa'] as const;

export type Lang = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: Lang = 'en';

const SUPPORTED_LANG_SET = new Set<string>(SUPPORTED_LANGS);

export const translations = {
  en: {
    brandHomeTitle: 'Home',
    portfolioTitle: 'Portfolio',
    siteDescription: 'MH Craft Studio - Traditional Persian Khatam craftsmanship preserved through family-led handmade work.',
    nav: {
      home: 'Home',
      mission: 'Mission',
      story: 'Our Story',
      milestones: 'Milestones',
      transparency: 'Transparency',
    },
    ui: {
      selectLanguage: 'Select language',
      openNavigationMenu: 'Open navigation menu',
      readOurStory: 'Read Our Story',
      viewFullPortfolio: 'View Full Portfolio',
      selectedMasterpieces: 'Selected',
      selectedMasterpiecesAccent: 'Masterpieces',
      backToCollection: 'Back to Collection',
      transparencyLog: 'Transparency Log',
      proposalPdf: 'Proposal PDF',
      supportTheProject: 'Support the Project',
      supportThisProject: 'Support This Project',
      buyMeACoffee: 'Buy Me a Coffee',
      downloadProposal: 'Download Full Proposal (PDF)',
      viewTransparencySection: 'View Transparency Section',
      durationLabel: 'Duration',
    },
    footer: {
      tagline: 'A family legacy preserved through patience and craft. Based in Izmit, Turkiye.',
      contact: 'Contact',
      credentials: 'Credentials',
      resources: 'Resources',
      rights: 'Handcrafted with precision. All rights reserved.',
      location: 'Izmit / Kocaeli / Turkiye',
    },
  },
  tr: {
    brandHomeTitle: 'Ana Sayfa',
    portfolioTitle: 'Portfolyo',
    siteDescription: 'MH Craft Studio - Aile emeğiyle sürdürülen geleneksel Pers hatem zanaati.',
    nav: {
      home: 'Ana Sayfa',
      mission: 'Misyon',
      story: 'Hikayemiz',
      milestones: 'Aşamalar',
      transparency: 'Şeffaflık',
    },
    ui: {
      selectLanguage: 'Dil seçin',
      openNavigationMenu: 'Gezinme menüsünü aç',
      readOurStory: 'Hikayemizi Oku',
      viewFullPortfolio: 'Tüm Portfolyoyu Gör',
      selectedMasterpieces: 'Seçilmiş',
      selectedMasterpiecesAccent: 'Eserler',
      backToCollection: 'Koleksiyona Dön',
      transparencyLog: 'Şeffaflık Kaydı',
      proposalPdf: 'Teklif PDF',
      supportTheProject: 'Projeyi Destekle',
      supportThisProject: 'Bu Projeyi Destekle',
      buyMeACoffee: 'Bir Kahve Ismarla',
      downloadProposal: 'Tam Teklifi İndir (PDF)',
      viewTransparencySection: 'Şeffaflık Bölümünü Gör',
      durationLabel: 'Süre',
    },
    footer: {
      tagline: 'Sabır ve zanaatla korunan bir aile mirası. İzmit, Türkiye merkezlidir.',
      contact: 'İletişim',
      credentials: 'Yetkinlikler',
      resources: 'Kaynaklar',
      rights: 'Titizlikle el işçiliğiyle üretildi. Tüm hakları saklıdır.',
      location: 'İzmit / Kocaeli / Türkiye',
    },
  },
  fa: {
    brandHomeTitle: 'خانه',
    portfolioTitle: 'نمونه‌کارها',
    siteDescription: 'MH Craft Studio - هنر سنتی خاتم با کار دست و تلاش یک خانواده حفظ می‌شود.',
    nav: {
      home: 'خانه',
      mission: 'ماموریت',
      story: 'داستان ما',
      milestones: 'مراحل',
      transparency: 'شفافیت',
    },
    ui: {
      selectLanguage: 'انتخاب زبان',
      openNavigationMenu: 'باز کردن منوی ناوبری',
      readOurStory: 'داستان ما را بخوانید',
      viewFullPortfolio: 'مشاهده همه نمونه‌کارها',
      selectedMasterpieces: 'آثار',
      selectedMasterpiecesAccent: 'برگزیده',
      backToCollection: 'بازگشت به مجموعه',
      transparencyLog: 'گزارش شفافیت',
      proposalPdf: 'فایل PDF پیشنهاد',
      supportTheProject: 'حمایت از پروژه',
      supportThisProject: 'حمایت از این پروژه',
      buyMeACoffee: 'برای من قهوه بخر',
      downloadProposal: 'دانلود نسخه کامل پیشنهاد (PDF)',
      viewTransparencySection: 'مشاهده بخش شفافیت',
      durationLabel: 'مدت زمان',
    },
    footer: {
      tagline: 'میراثی خانوادگی که با صبر و مهارت حفظ شده است. مستقر در ازمیت، ترکیه.',
      contact: 'ارتباط',
      credentials: 'اعتبارها',
      resources: 'منابع',
      rights: 'با دقت و ظرافت ساخته شده است. تمامی حقوق محفوظ است.',
      location: 'ازمیت / کوجائلی / ترکیه',
    },
  },
} as const;

export const isSupportedLang = (value: string | undefined | null): value is Lang => {
  return typeof value === 'string' && SUPPORTED_LANG_SET.has(value);
};

export const normalizeLang = (value: string | undefined | null): Lang => {
  if (!value) {
    return DEFAULT_LANG;
  }

  const [primaryTag] = value.toLowerCase().split('-');
  return isSupportedLang(primaryTag) ? primaryTag : DEFAULT_LANG;
};

export const getLangFromPath = (pathname: string): Lang => {
  const firstSegment = pathname.split('/').filter(Boolean)[0] ?? '';
  return isSupportedLang(firstSegment) ? firstSegment : DEFAULT_LANG;
};

export const stripLangFromPath = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return '/';
  }

  const pathSegments = isSupportedLang(segments[0]) ? segments.slice(1) : segments;
  return pathSegments.length === 0 ? '/' : `/${pathSegments.join('/')}`;
};

export const localizePath = (lang: Lang, pathname: string = '/'): string => {
  const normalizedPath = stripLangFromPath(pathname);
  return normalizedPath === '/' ? `/${lang}` : `/${lang}${normalizedPath}`;
};

export const localizeHashLink = (lang: Lang, sectionId: string): string => {
  if (sectionId === 'home') {
    return localizePath(lang, '/');
  }

  return `${localizePath(lang, '/')}#${sectionId}`;
};

export const buildLanguageSwitchPath = (targetLang: Lang, currentPath: string): string => {
  return localizePath(targetLang, currentPath);
};

export const matchBrowserLanguage = (languages: readonly string[]): Lang => {
  for (const language of languages) {
    const normalized = normalizeLang(language);
    if (normalized !== DEFAULT_LANG || language.toLowerCase().startsWith(DEFAULT_LANG)) {
      return normalized;
    }
  }

  return DEFAULT_LANG;
};

export const getTranslations = (lang: string | undefined | null) => {
  return translations[normalizeLang(lang)];
};