import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; 

const imageSchema = z.object({
  src: z.string(),
  alt: z.string(),
});

const localizedPageBaseSchema = z.object({
  locale: z.enum(['en', 'tr', 'fa']),
});

const homePageSchema = localizedPageBaseSchema.extend({
  pageId: z.literal('home'),
  hero: z.object({
    image: imageSchema,
    headline: z.string(),
    highlight: z.string(),
    summary: z.string(),
    story: z.array(z.string()),
  }),
  pillars: z.object({
    title: z.string(),
    description: z.string(),
    items: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })),
  }),
  vision: z.object({
    title: z.string(),
    paragraphs: z.array(z.string()),
    goals: z.array(z.string()),
  }),
  phases: z.object({
    title: z.string(),
    items: z.array(z.object({
      label: z.string(),
      title: z.string(),
      steps: z.array(z.string()),
    })),
  }),
  experience: z.object({
    eyebrow: z.string(),
    title: z.string(),
    intro: z.string(),
    quote: z.string(),
    items: z.array(z.string()),
  }),
  portfolioPreview: z.object({
    eyebrow: z.string(),
    title: z.string(),
    description: z.string(),
  }),
  statusAndChallenges: z.object({
    reality: z.object({
      eyebrow: z.string(),
      title: z.string(),
      accent: z.string(),
      description: z.string(),
      items: z.array(z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
      })),
    }),
    currentSituation: z.object({
      eyebrow: z.string(),
      title: z.string(),
      accent: z.string(),
      description: z.string(),
      points: z.array(z.string()),
      quote: z.string(),
    }),
  }),
  whyContinue: z.object({
    eyebrow: z.string(),
    title: z.string(),
    accent: z.string(),
    paragraphs: z.array(z.string()),
    quote: z.string(),
  }),
  supportNeeds: z.object({
    eyebrow: z.string(),
    title: z.string(),
    accent: z.string(),
    quote: z.string(),
    items: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
    })),
  }),
  transparency: z.object({
    eyebrow: z.string(),
    title: z.string(),
    accent: z.string(),
    description: z.string(),
    items: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })),
  }),
  finalCta: z.object({
    title: z.string(),
    accent: z.string(),
    description: z.string(),
  }),
});

const storyPageSchema = localizedPageBaseSchema.extend({
  pageId: z.literal('story'),
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),
  hero: z.object({
    eyebrow: z.string(),
    title: z.string(),
    highlight: z.string(),
  }),
  sections: z.array(z.object({
    title: z.string(),
    paragraphs: z.array(z.string()),
    image: imageSchema,
  })).length(3),
});

const portfolio = defineCollection({
  
  loader: glob({ pattern: "**/*.md", base: "./src/content/portfolio" }),
  schema: z.object({
    locale: z.enum(['en', 'tr', 'fa']),
    translationKey: z.string(),
    title: z.string(),
    description: z.string(),
    mainImage: z.string(),
    mainImageAlt: z.string(),
    gallery: z.array(imageSchema),
    time: z.string(),
    category: z.string().optional(),
    sku: z.string().optional(),
    availability: z.enum(['in-stock', 'made-to-order', 'sold-out']).optional(),
    materials: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/pages" }),
  schema: z.discriminatedUnion('pageId', [homePageSchema, storyPageSchema]),
});

export const collections = { portfolio, pages };
