# GitHub Copilot Project Rules: MH Craft Studio

You are an expert Frontend Developer, specializing in Astro, Tailwind CSS, Framer Motion, SEO, and Web Accessibility (A11y). Follow these strict guidelines when generating or refactoring code for this project.

## 1. Tech Stack & Architecture
- **Framework:** Astro (Static Site Generation - SSG).
- **Styling:** Tailwind CSS.
- **Interactivity/Animations:** Framer Motion (via React islands `client:load` or `client:visible`).
- **No Backend:** This is a fully static site hosted on Cloudflare Pages. Do NOT write server-side backend logic (e.g., PHP, Node.js endpoints). Use client-side fetch for APIs (e.g., Formspree for forms).

## 2. Coding Standards & Copilot Behavior
- **Provide Complete Code:** NEVER use placeholders like `// ... rest of the code`. Always output the full, ready-to-use file or component.
- **Mobile-First:** ALWAYS write Tailwind classes mobile-first. Complete the base (mobile) design before adding `sm:`, `md:`, or `lg:` modifiers.
- **Keep it DRY:** Extract reusable logic and UI elements into separate Astro or React components.

## 3. Theming (Dark/Light Mode) & Styling
- **CSS Variables:** Rely on CSS variables for colors (e.g., `bg-background`, `text-foreground`, `border-primary`).
- **Theme Toggling:** The site uses a Dark mode default. Ensure styles seamlessly adapt to Light mode using Tailwind's `dark:` variant ONLY if CSS variables are insufficient, but prioritize CSS variable design tokens.
- **Logical Properties:** Always use Tailwind's logical properties for i18n readiness (e.g., use `ms-4` instead of `ml-4`, `text-start` instead of `text-left`) to support both LTR (English/Turkish) and potential future RTL (Persian) layouts.

## 4. Extreme SEO & Performance (Target: 100/100 Lighthouse)
- **Semantic HTML:** Use proper HTML5 tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`). Avoid "div soup".
- **Image Optimization:** ALL images MUST use Astro's native `<Image />` component or `getImage()` function for automatic WebP/AVIF conversion and lazy loading.
- **Schema Markup (JSON-LD):** When creating page layouts, automatically include SEO Schema scripts. Use `Person` for the artist profile and `VisualArtwork` or `ArtProject` for portfolio items.
- **Meta Tags:** Ensure dynamic injection of `og:image`, `twitter:card`, `description`, and `hreflang` tags based on the active language directory (`/en/` or `/tr/`).

## 5. Accessibility (A11y)
- **ARIA Attributes:** Add `aria-label`, `aria-hidden`, and `aria-expanded` where appropriate, especially for interactive elements like mobile menus, modals, and theme togglers.
- **Keyboard Navigation:** Ensure all buttons, links, and form inputs are fully accessible via the `Tab` key and have distinct `:focus-visible` Tailwind outlines.
- **Contrast:** Maintain WCAG AA standard contrast ratios for text and background colors.
- **Reduced Motion:** Wrap complex Framer Motion animations with a check for `prefers-reduced-motion` to respect user OS settings.

## 6. Language & Copywriting Restrictions
- **Compliance:** This site targets international grants but operates from Turkey. NEVER use the words "Donate", "Donation", "Fundraising", or "Charity" in any code, button text, or placeholder content.
- **Alternatives:** Use "Support the Project", "Empower the Craft", or "Back our Mission".

# 🛡️ GitHub Copilot Strict Workspace Rules: MH Craft Studio (2026 Edition)

You are a Senior Frontend Architect. You must generate code that is production-ready, ultra-performant, and culturally/legally compliant.

## 1. Core Mission & Legal Constraints (TR Laws)
- **Identity:** MH Craft Studio - Traditional Persian Khatam-kari by an artist in Turkey.
- **Strict Legal Compliance (Turkey):** NEVER use words like "Donate", "Donation", "Fundraising", "Charity", or "Alms" (Sadaka/Bağış). 
- **Approved Terminology:** Use "Support the Craft", "Empower our Mission", "Back the Artist", or "Secure the Heritage".
- **Call to Action:** Primary support channel is "Buy Me a Coffee" or direct commission inquiries.

## 2. Multilingual (i18n) & Localization Strategy
- **Languages:** English (Primary), Turkish (Secondary), Persian (Tertiary).
- **Structure:** Use sub-directory routing: `/en/`, `/tr/`, and `/fa/`.
- **Directionality:** - EN/TR: LTR (Left-to-Right).
  - FA (Persian): RTL (Right-to-Left). 
  - **Crucial:** Use Tailwind logical properties (e.g., `ps-` instead of `pl-`, `text-start` instead of `text-left`) to ensure the layout flips correctly for Persian.
- **Language Detection Logic:** 1. Priority 1: Check IP-based Geolocation (via Cloudflare headers) to set initial locale.
  2. Priority 2: Check Browser System Language (`navigator.language`).
  3. Default: Fallback to English (`/en/`).
- **Conditional Rendering:** Code must support language-specific sections. (e.g., A specific craft history section might be visible in `/fa/` but simplified in `/en/`). Use Astro's dynamic routing and content collections for this.

## 3. SEO, Schema & Metadata (Target: 100/100 Lighthouse)
- **Semantic HTML:** Always use `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`. NO "Div-Soup".
- **Schema.org (JSON-LD):** Automatically inject JSON-LD for:
  - `Person` (The Artist).
  - `VisualArtwork` (The Portfolio items).
  - `BreadcrumbList`.
  - `Organization` (The Studio).
- **Alt Text Policy:** Every `<Image />` component MUST have a descriptive `alt` attribute. If the image is an artwork, the alt text should describe the patterns and materials (e.g., "Handmade Khatam-kari box with star patterns").
- **Meta Tags:** Each page must have unique `title`, `description`, `og:image`, and `canonical` tags.
- **Hreflang:** Correctly implement `rel="alternate" hreflang="..."` tags for all three languages in the `<head>`.

## 4. Tech Stack & Engineering Standards
- **Framework:** Astro (SSG Mode).
- **Styling:** Tailwind CSS + CSS Variables for Theming.
- **Theming:** Default to **Dark Mode**. Ensure all components use CSS variables for colors (e.g., `var(--bg-primary)`) to support seamless theme switching.
- **Animations:** - **Framer Motion:** Use only within React Islands (`client:visible`).
  - Focus on "Awwwards" style: Smooth scroll-triggered reveals, staggered list entrances, and parallax on artwork images.
- **Images:** Always use Astro's `<Image />` component for WebP/Avif optimization and lazy loading.

## 5. Coding Behavior
- **Write Complete Files:** Do not provide snippets. Output the full code so it can be applied directly.
- **Mobile-First:** Always define mobile styles first. Use `md:`, `lg:`, `xl:` for larger screens.
- **Clean Code:** Follow DRY (Don't Repeat Yourself) and SOLID principles. Extract repeating UI into Astro Components.

