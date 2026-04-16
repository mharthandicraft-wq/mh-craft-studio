/** @type {import('tailwindcss').Config} */
export default {
  // مشخص کردن مسیر تمام فایل‌هایی که از کلاس‌های Tailwind استفاده می‌کنند
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  
  // فعال کردن حالت تاریک بر اساس کلاس (برای کنترل دستی در آینده)
  darkMode: 'class', 
  
  theme: {
    extend: {
      // تعریف رنگ‌های اختصاصی برند MH Craft Studio
      colors: {
        brand: {
          dark: '#0a0a0a',   // مشکی عمیق برای پس‌زمینه (Awwwards Style)
          gold: '#c5a059',   // طلایی مات برای تم لایه‌های خاتم‌کاری
          accent: '#ffffff', // سفید خالص برای متون مهم
          gray: '#1a1a1a',   // خاکستری تیره برای کارت‌ها
        },
      },
      // تنظیمات فونت (بعداً فونت‌های فارسی و انگلیسی را اینجا ست می‌کنیم)
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    // پلاگین تایپوگرافی برای نمایش بهتر متون طولانی (مثل بخش درباره هنرمند)
    require('@tailwindcss/typography'),
  ],
}