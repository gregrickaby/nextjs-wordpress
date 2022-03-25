# Next.js + WordPress <!-- omit in toc -->

💀 It's headless WordPress!

## Features <!-- omit in toc -->

- Next.js w/ TypeScript
- WordPress in a Docker container
- Apollo Client w/ WP GraphQL
- Date based blog routing (`YYYY/MM/DD/slug`)
- Custom Post Type support via CPT UI
- Custom Field support via Advanced Custom Fields
- Native WordPress comment support
- SEO support via Yoast SEO
- ESLint, Stylelint, Prettier, and more!

## Table of Contents <!-- omit in toc -->

- [Requirements](#requirements)
- [Next.js Install & Setup](#nextjs-install--setup)
  - [ENV Variables](#env-variables)
    - [ENV Variables Explained](#env-variables-explained)
- [WordPress Setup](#wordpress-setup)
- [Development](#development)
- [Get Ready for Production](#get-ready-for-production)

## Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Node / NPM

## Next.js Install & Setup

```bash
npx create-next-app nextjs-wordpress --example https://github.com/gregrickaby/nextjs-wordpress
```

### ENV Variables

Copy `.env.sample` to `.env.local`

```bash
cp .env.sample .env.local
```

#### ENV Variables Explained

The WordPress URL (without trailing slash):

```bash
NEXT_PUBLIC_WORDPRESS_URL="http://localhost:8000"
```

Domains for Next/Image component:

```bash
NEXT_PUBLIC_IMAGE_DOMAINS="localhost"
```

---

## WordPress Setup

See [backend/README.md](backend/README.md) for instructions on setting up WordPress.

---

## Development

Start the development server on <http://localhost:3000>

```bash
npm run dev
```

Lint the codebase:

```bash
npm run lint
```

## Get Ready for Production

Build the site and test pages on <http://localhost:3000>

```bash
npm run build && npm run start
```

---
