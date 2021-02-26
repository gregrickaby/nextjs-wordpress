# Next.js + WordPress with Apollo Client

Use [Apollo Client](https://www.apollographql.com/docs/react/) along with Next.js [data fetching](https://nextjs.org/docs/basic-features/data-fetching) via `getStaticProps()` and `getStaticPaths()`, to create pages sourced from [WP GraphQL](https://www.wpgraphql.com/).

## Requirements

- A WordPress website with the [WP GraphQL](https://www.wpgraphql.com/) plugin installed and activated.
- A WordPress [application username and password](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/).


## Install & Setup

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

```
WORDPRESS_URL="https://nextjs.wpengine.com"
```

Since version 5.6, WordPress supports [application passwords](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/) for Basic Auth. This is required for some queries:

```
WORDPRESS_APPLICATION_USERNAME="your_username"
WORDPRESS_APPLICATION_PASSWORD="ABC 123 XYZ 456"
```

If you're working locally, the following will tell Node to ignore self-signed certificates:

```
NODE_TLS_REJECT_UNAUTHORIZED="0"
```

---

## Development

Start the development server on http://localhost:3000

```bash
npm run dev
```

Build the site and test pages on http://localhost:3000

```bash
npm run build && npm run start
```

---
