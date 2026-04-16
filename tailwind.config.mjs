/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  
  darkMode: 'class', 
  
  theme: {
    extend: {
      colors: {
        brand: {
          // Dark Mode Palette
          dark: '#0a0a0a',   
          'dark-gray': '#1a1a1a',
          'dark-gold': '#c5a059', 

          // Light Mode Palette
          light: '#fdfcfb',  
          gray: '#f4f1ee',   
          
          // Refined Colors
          gold: '#b48a3d',   
          accent: '#1a1a1a', 
          white: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}