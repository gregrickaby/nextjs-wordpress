# Next.js + WordPress with Apollo Client <!-- omit in toc -->

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
npx create-next-app nextjs-wordpress-with-apollo --example https://github.com/gregrickaby/nextjs-wordpress-with-apollo
```

### ENV Variables

Copy `.env.sample` to `.env.local`

```bash
cp .env.sample .env.local
```

#### ENV Variables Explained

A WordPress URL (without trailing slash):

```bash
WORDPRESS_URL="https://nextjs.wpengine.com"
```

Since version 5.6, WordPress supports [application passwords](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/) for Basic Auth. This is required for some queries:

```bash
WORDPRESS_APPLICATION_USERNAME="your_username"
WORDPRESS_APPLICATION_PASSWORD="ABC 123 XYZ 456"
```

If you're working locally, the following will tell Node to ignore self-signed certificates:

```bash
NODE_TLS_REJECT_UNAUTHORIZED="0"
```

---

## WordPress Setup

1. Install and activate the following plugins:
   1. [WP GraphQL](https://wordpress.org/plugins/wp-graphql/)
   2. [Atlas Content Modeler (ACM)](https://wordpress.org/plugins/atlas-content-modeler/)
2. Create a page named "Homepage" with the slug of `homepage`
3. Create other pages
4. Use ACM to create CPTs and fields

That's pretty much it.

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
