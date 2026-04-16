// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    react()
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr', 'fa'],
    routing: {
      prefixDefaultLocale: true
    },
    fallback: {
      fa: 'en',
      tr: 'en'
    }
  },

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});