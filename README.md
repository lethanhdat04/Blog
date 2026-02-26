# Datto Portfolio Blog

A production-grade developer portfolio and blog built with Next.js 14, featuring MDX content, a PostgreSQL-backed admin dashboard, and modern UI with Tailwind CSS and Shadcn UI.

## Tech Stack

| Layer           | Technology                                   |
| --------------- | -------------------------------------------- |
| Framework       | Next.js 14 (App Router, Server Components)   |
| Language        | TypeScript                                   |
| Styling         | Tailwind CSS + Shadcn UI                     |
| Content         | MDX via Velite (type-safe, git-tracked)       |
| Database        | PostgreSQL + Prisma ORM                      |
| Authentication  | NextAuth v5 (GitHub & Google OAuth)          |
| Forms           | React Hook Form + Zod validation             |
| Animations      | Framer Motion                                |
| Email           | Resend + React Email                         |
| Syntax Highlighting | Shiki + Rehype Pretty Code               |
| Icons           | Lucide React                                 |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- GitHub and/or Google OAuth credentials (for admin login)

### Installation

```bash
# Clone the repository
git clone <repo-url> && cd blog

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Environment Variables

Edit `.env` with your values:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/blog?schema=public"
DIRECT_URL="postgresql://user:password@localhost:5432/blog?schema=public"

# NextAuth
AUTH_SECRET="generate-with-openssl-rand-base64-32"
AUTH_GITHUB_ID="your-github-oauth-client-id"
AUTH_GITHUB_SECRET="your-github-oauth-client-secret"
AUTH_GOOGLE_ID="your-google-oauth-client-id"
AUTH_GOOGLE_SECRET="your-google-oauth-client-secret"

# Admin access (comma-separated emails allowed to sign in)
ADMIN_EMAILS="you@example.com"

# Resend (email service)
RESEND_API_KEY="re_your-api-key"

# GitHub (contribution heatmap on landing page)
GITHUB_TOKEN="ghp_your-token"
GITHUB_USERNAME="your-username"

# Public site URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Database Setup

```bash
# Push the Prisma schema to your database
npm run db:push

# Seed with sample data (projects, experience, skills)
npm run db:seed

# Open Prisma Studio to inspect data
npm run db:studio
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
├── content/
│   └── blog/                   # MDX blog posts (processed by Velite)
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Seed script with sample data
├── public/
│   └── images/                 # Static images
├── src/
│   ├── app/
│   │   ├── (public)/           # Public pages (header + footer layout)
│   │   │   ├── blog/           # Blog listing and post pages
│   │   │   ├── projects/       # Project listing and detail pages
│   │   │   ├── experience/     # Timeline and skills
│   │   │   ├── about/          # About page
│   │   │   └── contact/        # Contact form
│   │   ├── (admin)/            # Admin dashboard (auth-protected)
│   │   │   └── admin/
│   │   │       ├── projects/   # CRUD for projects
│   │   │       ├── experience/ # CRUD for experience
│   │   │       ├── skills/     # Skill management
│   │   │       ├── messages/   # Contact message viewer
│   │   │       └── settings/   # Account and environment info
│   │   ├── (auth)/login/       # Login page
│   │   └── api/
│   │       ├── auth/           # NextAuth endpoints
│   │       ├── posts/[slug]/views/ # View counter
│   │       ├── github/contributions/ # GitHub heatmap data
│   │       └── feed/           # RSS feed
│   ├── components/
│   │   ├── ui/                 # Shadcn UI primitives
│   │   ├── layout/             # Header, Footer, MobileNav, Container
│   │   ├── landing/            # Hero, TechBadges, GitHubHeatmap, etc.
│   │   ├── blog/               # PostCard, BlogList, TOC, Search, Tags
│   │   ├── projects/           # ProjectCard
│   │   ├── experience/         # Timeline, SkillGrid
│   │   ├── contact/            # ContactForm
│   │   ├── mdx/                # MDX component overrides + renderer
│   │   ├── motion/             # Framer Motion wrappers (FadeIn, Stagger)
│   │   └── shared/             # ThemeToggle, BackToTop
│   ├── lib/
│   │   ├── actions/            # Server Actions (contact, projects, etc.)
│   │   ├── queries/            # Cached data-fetching with unstable_cache
│   │   ├── validations/        # Zod schemas
│   │   ├── seo/                # JSON-LD generators, constants
│   │   ├── auth.ts             # NextAuth config
│   │   ├── prisma.ts           # Prisma singleton
│   │   ├── resend.ts           # Resend email client
│   │   └── utils.ts            # cn(), formatDate(), slugify(), etc.
│   ├── config/                 # site.ts, nav.ts, social.ts
│   ├── hooks/                  # useDebounce
│   ├── providers/              # ThemeProvider, TooltipProvider
│   └── types/                  # NextAuth type augmentations
├── velite.config.ts            # Blog post collection schema
├── next.config.mjs             # Velite Webpack plugin integration
├── tailwind.config.ts          # Shadcn theme + animations
└── components.json             # Shadcn UI config
```

## Pages

### Public

| Route           | Description                                    |
| --------------- | ---------------------------------------------- |
| `/`             | Landing page with hero, tech stack, GitHub heatmap, featured projects, latest posts |
| `/blog`         | Blog listing with search and tag filtering     |
| `/blog/[slug]`  | Individual post with MDX, syntax highlighting, TOC, view counter |
| `/projects`     | Project gallery (ISR, 1hr revalidation)        |
| `/projects/[slug]` | Project detail page                         |
| `/experience`   | Work timeline + skill grid                     |
| `/about`        | Bio, social links, resume download             |
| `/contact`      | Contact form (saves to DB, sends email via Resend) |

### Admin (auth-protected)

| Route                      | Description                  |
| -------------------------- | ---------------------------- |
| `/admin`                   | Dashboard with stats         |
| `/admin/projects`          | List / create / edit / delete projects |
| `/admin/experience`        | List / create / edit / delete experience |
| `/admin/skills`            | Add / remove skills          |
| `/admin/messages`          | View / mark read / delete contact submissions |
| `/admin/settings`          | Account info and env status  |

### API

| Route                          | Description                          |
| ------------------------------ | ------------------------------------ |
| `/api/auth/[...nextauth]`      | NextAuth authentication handler      |
| `/api/posts/[slug]/views`      | GET/POST view counter per blog post  |
| `/api/github/contributions`    | GitHub contribution data for heatmap |
| `/api/feed`                    | RSS feed (XML)                       |

### SEO

| Route                  | Description         |
| ---------------------- | ------------------- |
| `/sitemap.xml`         | Dynamic sitemap     |
| `/robots.txt`          | Dynamic robots.txt  |
| `/manifest.webmanifest`| PWA manifest        |

## Writing Blog Posts

Create a new `.mdx` file in `content/blog/`:

```mdx
---
title: "Your Post Title"
description: "A short summary (max 300 characters)."
date: "2026-03-01"
published: true
featured: false
tags: ["next.js", "react"]
authors: ["Datto"]
---

## Your Content Here

Write standard Markdown with JSX support. Code blocks get automatic
syntax highlighting with dual themes (light/dark).
```

Posts are processed at build time by Velite. The schema enforces:
- `title`: max 120 characters
- `description`: max 300 characters
- `date`: ISO format
- `published`: controls visibility
- `featured`: shows on landing page
- `tags`: array of strings for filtering

## Database Models

| Model              | Purpose                                       |
| ------------------ | --------------------------------------------- |
| User               | Auth users with Role enum (USER/ADMIN)        |
| Account / Session  | NextAuth OAuth accounts and sessions          |
| Project            | Portfolio projects with tech stack, URLs, tags |
| Experience         | Work history with highlights and tech stack   |
| Skill              | Skills grouped by category with proficiency   |
| Tag / ProjectTag   | Many-to-many tagging for projects             |
| PostMeta           | View and like counts bridging MDX to DB       |
| ContactSubmission  | Contact form entries with read/replied status |

## Caching Strategy

| Content       | Strategy                                    |
| ------------- | ------------------------------------------- |
| Blog posts    | SSG at build time (Velite)                  |
| Projects      | ISR with 1hr revalidation + tag-based cache |
| Experience    | ISR with 1hr revalidation + tag-based cache |
| Admin pages   | Dynamic (no caching)                        |
| GitHub heatmap| API route with 1hr revalidation             |

Mutations via Server Actions call `revalidateTag()` to bust the cache.

## Authentication

Admin access is restricted to emails listed in the `ADMIN_EMAILS` environment variable. The NextAuth `signIn` callback rejects any email not in the allowlist. The middleware protects all `/admin/*` routes.

## Scripts Reference

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm start            # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push Prisma schema to database
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio
```

## Deployment

This project is ready for deployment on Vercel:

1. Push to GitHub
2. Connect the repository on Vercel
3. Set all environment variables from `.env.example`
4. Vercel auto-detects Next.js and deploys

For other platforms, ensure PostgreSQL is accessible and environment variables are configured.

## License

Private project.
