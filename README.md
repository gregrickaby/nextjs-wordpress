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

- A WordPress website with the [WP GraphQL](https://www.wpgraphql.com/) plugin installed and activated.
- Use [Atlas Content Modeler (ACM)](https://wordpress.org/plugins/atlas-content-modeler/) to create CPTs and fields.
- A WordPress [application username and password](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/).

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
