# Next.js + WordPress <!-- omit in toc -->

💀 It's headless WordPress!

## Features <!-- omit in toc -->

- Next.js w/ TypeScript
- WordPress in a Docker container
- Self-signed SSL certificate from Traefik
- Apollo Client w/ WP GraphQL
- Incremental Static Regeneration + On Demand Revalidation
- Native WordPress menus and comments
- Date based blog routing (`YYYY/MM/DD/slug`)
- SEO via Yoast
- Custom Post Types via CPT UI
- Custom Fields via Advanced Custom Fields
- ESLint, Stylelint, Prettier, and more!

## Table of Contents <!-- omit in toc -->

- [Requirements](#requirements)
- [Next.js Install & Setup](#nextjs-install--setup)
  - [ENV Variables](#env-variables)
- [WordPress Setup](#wordpress-setup)
- [Next.js Development](#nextjs-development)
- [Get Ready for Production](#get-ready-for-production)

## Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Node / NPM

## Next.js Install & Setup

```bash
npx create-next-app nextjs-wordpress --example https://github.com/gregrickaby/nextjs-wordpress
```

### ENV Variables

Copy `.env.sample` to `.env`

```bash
cp .env.sample .env
```

---

## WordPress Setup

See [backend/README.md](backend/README.md) for instructions on setting up WordPress.

---

## Next.js Development

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
