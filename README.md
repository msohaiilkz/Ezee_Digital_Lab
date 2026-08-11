# Ezee Digital Labs — Website

Production-ready marketing and lead-generation website for **Ezee Digital Labs** (`digitallabs.ezeetechnologies.com`) — a digital transformation, AI automation, brand, ERP, LMS, and technology services company.

Built with the **Next.js App Router**, statically exported to plain HTML so it can be hosted on any web server (Hostinger, cPanel, Netlify, Cloudflare Pages, GitHub Pages, S3, etc.) without a Node.js runtime.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Static Build & Deployment](#static-build--deployment)
- [Form Integration (Web3Forms)](#form-integration-web3forms)
- [Site Live Toggle](#site-live-toggle)
- [Adding / Editing Content](#adding--editing-content)
- [SEO & Metadata](#seo--metadata)
- [Browser Support & Responsiveness](#browser-support--responsiveness)
- [Repository](#repository)

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) | React-based framework with static export |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Type-safe JavaScript |
| **UI Library** | [React 18](https://react.dev/) | Component-based UI |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first CSS framework |
| **Animation** | [Framer Motion 11](https://www.framer.com/motion/) | Scroll and interaction animations |
| **Icons** | [Lucide React](https://lucide.dev/) | Modern icon set |
| **Forms** | [Web3Forms](https://web3forms.com/) | Serverless form submission API |
| **Hosting** | Static HTML (any static host) | Deployed as pre-rendered pages |
| **Fonts** | Inter (system stack) | Native web font |

### Why Next.js App Router with Static Export?

- **Type-safe content model** — services, blogs, case studies, and industries are typed data objects.
- **SEO-first** — every page is pre-rendered as HTML with proper meta tags, Open Graph, structured data (JSON-LD Schema.org), sitemap, and robots.txt.
- **Zero runtime cost** — no Node server required. The `out/` folder can be uploaded to any static host.
- **Fast page loads** — ~87 kB shared JS, ~150 kB per page, prerendered HTML for instant first paint.

---

## Features

### Website
- **56 pre-rendered pages** — homepage, services hub, 11 service detail pages, industries, portfolio, case studies (with filters), insights (blog), about, process, contact, book consultation, free digital audit, thank-you, privacy, terms
- **Fully responsive** — mobile, tablet, laptop, desktop, and large desktop (custom breakpoints from 320px to 1920px+)
- **Sticky navbar** with mega menu dropdown (hover-delay UX, viewport-anchored positioning)
- **Sticky mobile CTA bar** ("Book Free Digital Audit")
- **Back-to-top** button
- **Smooth scroll animations** on section entry (`framer-motion` with reduced-motion support)
- **Premium visual system** — brand gradient cards, glow shadows, gradient accents, decorative lab-grid patterns

### Content-driven
- Typed service, blog, case study, industry, portfolio, and FAQ data models in [src/content/site.ts](src/content/site.ts)
- Dynamic OG image, meta title, meta description, canonical URL per page
- JSON-LD structured data: Organization, WebSite, Service, BreadcrumbList, FAQPage, ItemList, CreativeWork

### Forms
Six lead-capture forms wired to Web3Forms:
1. Contact form
2. Free Digital Audit request
3. Book Consultation
4. Newsletter subscription (footer)
5. Service inquiry (per service detail page)
6. Case study inquiry (per case study page)

### SEO
- Auto-generated `sitemap.xml` covering all 56 URLs
- `robots.txt` with proper index/crawl directives
- Schema.org structured data on every relevant page
- Open Graph + Twitter Card meta for each page
- Favicon (`app/icon.png`)

### Developer Experience
- Single toggle (`SITE_LIVE` flag) to hide the entire site behind a plain 404 (useful for staging or client-approval workflows)
- Bulk static export via `npm run build`
- Type-checked build (`npm run typecheck`)

---

## Project Structure

```
Ezee-Digital-Labs/
├── app/                             # Next.js App Router root
│   ├── [[...slug]]/
│   │   └── page.tsx                 # Catch-all dynamic route (renders every page)
│   ├── globals.css                  # Tailwind + custom animations
│   ├── icon.png                     # Favicon
│   ├── layout.tsx                   # Root layout, metadata, JSON-LD schemas
│   ├── not-found.tsx                # Plain 404 page
│   ├── robots.ts                    # Robots.txt generator
│   └── sitemap.ts                   # Sitemap.xml generator
│
├── public/
│   └── images/                      # Brand images (hero, service visuals, etc.)
│
├── src/
│   ├── components/
│   │   ├── forms.tsx                # LeadForm + NewsletterForm (Web3Forms wired)
│   │   ├── interactive.tsx          # MotionSection, FAQAccordion, BackToTop, etc.
│   │   ├── layout.tsx               # Header (mega menu), Footer, SiteShell
│   │   └── sections.tsx             # All page components (Home, Services, About, ...)
│   │
│   ├── content/
│   │   └── site.ts                  # Single source of truth for all content
│   │
│   └── lib/
│       ├── config.ts                # SITE_LIVE feature flag
│       ├── leads.ts                 # (legacy helper — kept for reference)
│       └── utils.ts                 # cn() classname helper
│
├── next.config.mjs                  # Static export config (output: 'export')
├── tailwind.config.ts               # Brand colors, shadows, keyframes
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites
- **Node.js 18.17+** (Node 20 LTS recommended)
- **npm 9+**

### Installation

```bash
git clone https://github.com/msohaiilkz/Ezee_Digital_Lab.git
cd Ezee_Digital_Lab
npm install
```

### Development server

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000). Hot module reload enabled.

---

## Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start development server (HMR) |
| `npm run build` | Build static export → `out/` folder |
| `npm start` | Not used (static export doesn't need a Node server) |
| `npm run lint` | ESLint checks |
| `npm run typecheck` | TypeScript type check without emit |

---

## Static Build & Deployment

### Build

```bash
npm run build
```

This generates the fully static site inside the `out/` folder:

```
out/
├── index.html                       # Homepage
├── about/index.html
├── services/index.html
├── services/social-media-management/index.html
├── ...                              # 40+ more pages
├── _next/static/                    # CSS, JS chunks
├── images/                          # Brand assets
├── icon.png
├── sitemap.xml
├── robots.txt
└── 404.html
```

### Deploy

Upload the **contents of `out/`** (not the folder itself) to any static host:

| Host | How |
|---|---|
| **Hostinger / cPanel** | File Manager → `public_html/` → upload & extract zip |
| **Netlify** | Drag-drop `out/` at [app.netlify.com/drop](https://app.netlify.com/drop) |
| **Vercel** | `npx vercel --prod` (auto-detects Next.js) |
| **Cloudflare Pages** | Connect GitHub repo, build command `npm run build`, output `out` |
| **GitHub Pages** | Push `out/` contents to `gh-pages` branch |
| **AWS S3 + CloudFront** | Sync `out/` to bucket, enable static hosting |

---

## Form Integration (Web3Forms)

All six forms POST directly to the [Web3Forms](https://web3forms.com/) API — no backend required.

### How it works
- Each form submission is sent to `https://api.web3forms.com/submit` as `FormData`
- Web3Forms emails the configured recipient with the submission contents
- Free plan: **250 submissions/month**

### Change the access key
Edit [src/components/forms.tsx](src/components/forms.tsx):

```ts
const WEB3FORMS_ACCESS_KEY = "your-new-access-key-here";
```

### Change the receiving email
Log in to [web3forms.com](https://web3forms.com/) → dashboard → your form → **Email Configuration** → change **Recipient Emails** → **Save Settings**. No code change needed.

The recipient must be a **verified linked email** on the Web3Forms account (managed under Account Settings → Linked Emails).

---

## Site Live Toggle

For staging, client-approval, or "coming soon" workflows, the entire site can be hidden behind a plain 404 without deleting anything.

Open [src/lib/config.ts](src/lib/config.ts):

```ts
// Toggle to `true` when ready to show the site to clients.
// While `false`, every URL returns a plain 404 with no project UI.
export const SITE_LIVE = true;
```

- `SITE_LIVE = false` → every route (`/`, `/services`, `/about`, etc.) returns the bare "Error 404 — This page could not be found" page. Header, footer, sticky CTAs, and all page content are hidden.
- `SITE_LIVE = true` → normal site rendering.

After toggling, rebuild:

```bash
npm run build
```

---

## Adding / Editing Content

All content lives in a single file: [src/content/site.ts](src/content/site.ts). Fully typed — TypeScript catches missing fields.

### To add a new service
1. Push a new object into the `services` array with `title`, `slug`, `category`, `hero`, `summary`, `problem`, `solution`, `deliverables`, `whoFor`, `benefits`, `faqs`, `relatedServices`, `relatedBlogs`, `relatedCaseStudies`, `cta`, `metaTitle`, `metaDescription`.
2. Add it to a group inside `serviceGroups` (drives the mega menu and services hub).
3. Rebuild — the new page is auto-generated at `/services/<slug>/`.

### To add a new blog post
Push into the `blogs` array. New page auto-created at `/insights/<slug>/`.

### To add a case study
Push into `caseStudies`. New page auto-created at `/case-studies/<slug>/`.

### To reorder nav items
Edit the `navigation` array in `site.ts`.

---

## SEO & Metadata

- Meta title/description are per-page and defined in [src/content/site.ts](src/content/site.ts) under `staticPages`, `services[].metaTitle`, `blogs[].metaTitle`, etc.
- Open Graph and Twitter Card images are dynamically selected per page in [app/[[...slug]]/page.tsx](app/[[...slug]]/page.tsx) (`metaImageForPath`).
- Structured data (JSON-LD) is emitted per page for rich results eligibility.
- Sitemap auto-updates from `allSitePaths()` in `src/content/site.ts`.

---

## Browser Support & Responsiveness

The site is designed and tested for:

| Breakpoint | Range | Layout |
|---|---|---|
| Mobile | 320 – 639 px | Single column, hamburger menu, sticky mobile CTA |
| Tablet | 640 – 1023 px | 2-column grids, hamburger menu |
| Laptop | 1024 – 1279 px | Multi-column grids, hamburger menu |
| Desktop | 1280 – 1535 px | Full nav, mega menu, orange CTA visible |
| Large Desktop | ≥ 1536 px | Full nav with secondary CTAs, wider container |

Browsers: latest Chrome, Firefox, Safari, Edge. Reduced-motion preferences honored.

---

## Repository

- **GitHub:** [msohaiilkz/Ezee_Digital_Lab](https://github.com/msohaiilkz/Ezee_Digital_Lab)
- **Live URL** (planned): [digitallabs.ezeetechnologies.com](https://digitallabs.ezeetechnologies.com)

---

## License

Proprietary — © Ezee Technologies. All rights reserved.
