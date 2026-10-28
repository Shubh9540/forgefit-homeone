# HomeOne Landing Page Blueprint & AI Agent Rules

> **Purpose:** This file is the universal, standardized blueprint for building "HomeOne" single-page landing pages and business templates (e.g., Wedding Planners, Real Estate, Law Firms, Agencies, Portfolios).
> Any developer or AI Agent building a project based on the "HomeOne" pattern MUST strictly follow these rules.

---

## 1. Core Tech Stack (FIXED — Do NOT change)

| Package | Version | Notes |
|---|---|---|
| **Next.js** | `15.x` / `16.x` | App Router (`app/` folder at project root) |
| **React** | `19.x` | Functional components only |
| **TypeScript** | `5.x` | Strict mode enabled |
| **Tailwind CSS** | **`3.4.17`** | **CRITICAL: v3 ONLY** — v4 breaks CSS generation |
| **PostCSS** | Latest | `tailwindcss` + `autoprefixer` plugins |
| **react-icons** | `^5.x` | Unified icon library |

### Tailwind CSS Version Rule
- **NEVER upgrade to Tailwind v4.**
- `postcss.config.mjs` must use `tailwindcss` and `autoprefixer`:
  ```javascript
  const config = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };
  export default config;
  ```
- `globals.css` must use standard v3 directives:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

---

## 2. Global CSS Variables & Color Architecture

All colors MUST be controlled via CSS variables in `app/globals.css` and accessed via Tailwind utility classes using CSS variables (e.g. `bg-[var(--color-primary)]`, `text-[var(--color-accent)]`, `border-[var(--color-border)]`).

### Variable Naming Standard (`app/globals.css`):
```css
:root {
  /* Fonts */
  --font-primary: var(--font-poppins), sans-serif;
  --font-heading: var(--font-poppins), sans-serif;

  /* Global Color Tokens */
  --color-bg-main: #ffffff;
  --color-bg-card: #ffffff;
  --color-bg-alt: #f7f9f7;
  --color-primary: #0f2c20;
  --color-accent: #1e4d3a;
  --color-accent-light: #c29d59;
  --color-accent-muted: #2d6a50;
  --color-text: #333d37;
  --color-text-light: #64746d;
  --color-border: #e3ebe6;
}

html,
body {
  color: var(--color-text);
  background-color: var(--color-bg-main);
  scroll-behavior: smooth;
  overflow-x: hidden;
  max-width: 100%;
}
```

### Color Usage Rule:
- **CORRECT:** `className="bg-[var(--color-primary)] text-[var(--color-accent)] border-[var(--color-border)]"`
- **WRONG:** Hardcoding random hex values inside components like `bg-[#0f2c20]` across multiple files. Keep them mapped to CSS variables.

---

## 3. Folder Structure (STRICT — No `src/` directory)

```
project-root/
├── app/
│   ├── globals.css               # Global styles, variables & Tailwind directives
│   ├── layout.tsx                # Root layout & global metadata
│   ├── page.tsx                  # Single-Page landing architecture
│   └── not-found.tsx             # 404 handler
│
├── components/
│   ├── common/                   # Global components
│   │   ├── Header.tsx            # Sticky / Glassmorphism nav with mobile menu
│   │   └── Footer.tsx            # Full site footer with quick links & info
│   │
│   └── sections/                 # HomeOne Section Components
│       ├── HeroSection.tsx
│       ├── AboutUsSection.tsx
│       ├── ServicesSection.tsx
│       ├── WhatWeDoSection.tsx
│       ├── GallerySection.tsx
│       ├── TestimonialSection.tsx
│       ├── FaqSection.tsx
│       └── ContactSection.tsx
│
├── data/
│   └── templates.json            # ALL website content — Single source of truth
│
├── types/
│   └── templates.types.ts        # ALL TypeScript interfaces & types
│
├── public/                       # Static images, assets, icons
├── tailwind.config.ts
├── postcss.config.mjs
└── HOMEONE_AGENT.md / AGENTS.md
```

### Folder Rules:
- **No `src/` folder:** All Next.js directories (`app/`, `components/`, `data/`, `types/`) must live at the root.
- `components/common/` contains universal elements (Header, Footer).
- `components/sections/` contains individual landing page sections.

---

## 4. Data Architecture — Single JSON Source of Truth

### Absolute Rule: Zero Hardcoded Content
- **100% of user-facing text, links, image URLs, icons, and button labels MUST come from `data/templates.json`.**
- ZERO hardcoded strings in JSX (e.g. no hardcoded `"Read More"`, `"Get in Touch"`, or `"Loading..."`).
- Fallbacks must read from `common.globalUI` (e.g. `loadingText`, `notFoundText`).

### JSON Template Hierarchy:
```json
{
  "common": {
    "globalUI": {
      "loadingText": "Loading...",
      "notFoundText": "Page Not Found"
    },
    "Footer": { ... }
  },
  "categories": {
    "HomeOne": {
      "sections": {
        "Header": { "variants": { "HomeOneHeader1": { ... } } },
        "Hero": { "variants": { "HomeOneHero1": { ... } } },
        "AboutUs": { "variants": { "HomeOneAboutUs1": { ... } } },
        "Services": { "variants": { "HomeOneServices1": { ... } } },
        "WhatWeDo": { "variants": { "HomeOneWhatWeDo1": { ... } } },
        "Gallery": { "variants": { "HomeOneGallery1": { ... } } },
        "Testimonials": { "variants": { "HomeOneTestimonials1": { ... } } },
        "Faq": { "variants": { "HomeOneFaq1": { ... } } },
        "Contact": { "variants": { "HomeOneContact1": { ... } } }
      }
    }
  }
}
```

### How Data is Read in `app/page.tsx`:
```tsx
import React from 'react';
import { HomeOneTemplateData } from '@/types/templates.types';
import rawData from '@/data/templates.json';

import { Header } from '@/components/common/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutUsSection } from '@/components/sections/AboutUsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { WhatWeDoSection } from '@/components/sections/WhatWeDoSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { TestimonialSection } from '@/components/sections/TestimonialSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/common/Footer';

export default function Home() {
  const templateData: HomeOneTemplateData = rawData;
  const sectionData = templateData?.categories?.HomeOne?.sections;
  const commonData = templateData?.common;

  if (!sectionData || !commonData) {
    return <div className="text-black p-10">{commonData?.globalUI?.loadingText}</div>;
  }

  return (
    <main className="bg-[var(--color-bg-main)] min-h-screen flex flex-col scroll-smooth w-full overflow-x-hidden">
      <Header data={sectionData.Header?.variants?.HomeOneHeader1} />
      <HeroSection data={sectionData.Hero?.variants?.HomeOneHero1} />
      <AboutUsSection data={sectionData.AboutUs?.variants?.HomeOneAboutUs1} />
      <ServicesSection data={sectionData.Services?.variants?.HomeOneServices1} />
      <WhatWeDoSection data={sectionData.WhatWeDo?.variants?.HomeOneWhatWeDo1} />
      <GallerySection data={sectionData.Gallery?.variants?.HomeOneGallery1} />
      <TestimonialSection data={sectionData.Testimonials?.variants?.HomeOneTestimonials1} />
      <FaqSection data={sectionData.Faq?.variants?.HomeOneFaq1} />
      <ContactSection data={sectionData.Contact?.variants?.HomeOneContact1} />
      <Footer data={commonData.Footer} />
    </main>
  );
}
```

---

## 5. TypeScript Conventions (STRICT)

1. **All types must live in `types/templates.types.ts`:**
   - NEVER create inline types inside component files.
   - NEVER use `any` or `as unknown as X`.
2. **Every mapped item must contain an `id: string`:**
   - When mapping arrays (`navLinks`, `services`, `features`, `faqItems`, `testimonials`), always use `key={item.id}`.
3. **Null Safety & Optional Props:**
   - Every component receives an optional `data?: SpecificSectionData` prop.
   - Every component starts with an early return:
     ```tsx
     if (!data) return null;
     ```

---

## 6. Component Guidelines & Smooth Scrolling

1. **Named Exports Only:**
   ```tsx
   export const HeroSection = ({ data }: { data?: HeroData }) => { ... };
   ```
2. **In-Page Smooth Anchor Scrolling:**
   - Every section must have an `id` that matches the header navigation links (e.g. `id="home"`, `id="about"`, `id="services"`, `id="gallery"`, `id="testimonials"`, `id="faq"`, `id="contact"`).
   - Use `scroll-mt-20` (or appropriate offset) on sections so sticky headers don't hide section titles when navigated to.
3. **No Inline Styles:**
   - Use Tailwind utility classes for all spacing, layout, typography, and borders.
   - Use standard breakpoint progression (`mobile-first` -> `sm:` -> `md:` -> `lg:` -> `xl:`).

---

## 7. Dynamic Icons Pattern

Store icon names as strings in JSON (e.g. `"FaPhone"`, `"FaEnvelope"`, `"FaCalendarAlt"`). Render them using a switch helper inside components:

```tsx
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'FaPhone': return <FaPhone />;
    case 'FaEnvelope': return <FaEnvelope />;
    case 'FaMapMarkerAlt': return <FaMapMarkerAlt />;
    case 'FaStar': return <FaStar />;
    default: return null;
  }
};
```

---

## 8. Spacing & Visual Rhythm Standards

- **Section Vertical Padding:** Use balanced, modern padding: `py-12 lg:py-16` or `py-16 lg:py-20`. Avoid excessive arbitrary padding (like `py-[100px]`).
- **Max Width Container:** Wrap content in `max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8` to maintain consistent alignment across all sections.
- **Card Spacing:** Use reasonable gaps (`gap-6` or `gap-8`).

---

## 9. 100% Sync Checklist (CRITICAL)

Whenever you add or change any feature, section, or field:
1. **`types/templates.types.ts`:** Update/add the interface.
2. **`data/templates.json`:** Add the corresponding keys and data values.
3. **Component:** Create/update component in `components/sections/` using only props from JSON.
4. **`app/page.tsx`:** Import and render the component.
