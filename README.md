# Next.js + WordPress <!-- omit in toc -->

Use [Apollo Client](https://www.apollographql.com/docs/react/) along with Next.js [data fetching](https://nextjs.org/docs/basic-features/data-fetching) via `getStaticProps()` and `getStaticPaths()`, to create pages sourced from [WP GraphQL](https://www.wpgraphql.com/).

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

A WordPress URL (without trailing slash):

```bash
NEXT_PUBLIC_WORDPRESS_URL="http://localhost:8000"
```

---

## WordPress Setup

See [backend/README.md](backend/README.md#install) for instructions on setting up WordPress.

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
