# Next.js + WordPress

💀 It's headless WordPress! - <https://nextjswp.com>

This repo is a bare-bones Next.js app which fetches data from WordPress and styles it with Tailwind.

Please consider it a starting point for your next headless WordPress site.

---

## Features

- Next.js 13 with App Router and Tailwind CSS
- WordPress data via GraphQL
- Support for:
  - On-demand Revalidation
  - Custom Post Types
  - Custom Fields
  - Comments
  - Yoast SEO
  - TypeScript, ESLint, Prettier, and Stylelint
- Plus it's really fast!

![screenshot](https://dl.dropbox.com/s/xh6uq9mblx8rqm1/Screenshot%202023-10-21%20at%2009.58.44.png?dl=0)

---

## FAQ

### What do I need for WordPress?

You'll need either a local or public WordPress site with the following plugins:

- [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/) (free version is fine)
- [Next.js WordPress Plugin](https://github.com/gregrickaby/nextjs-wordpress-plugin)
- [Next.js WordPress Theme](https://github.com/gregrickaby/nextjs-wordpress-theme)
- [WPGraphQL Yoast SEO](https://wordpress.org/plugins/add-wpgraphql-seo/)
- [WPGraphQL for Advanced Custom Fields](https://www.wpgraphql.com/acf/)
- [WPGraphQL](https://www.wpgraphql.com/)
- [Yoast SEO](https://wordpress.org/plugins/wordpress-seo/)

### What happened to your old repo? The one with Docker, Mantine, and all the other stuff?

I've decided to simplify things based on the Next.js 13 App Router. You can still [view the old repo](https://github.com/gregrickaby/nextjs-wordpress/tree/1.0.0).

### Can I hire you to build my headless WordPress site?

Yes! I'm always interested in taking on headless projects. Send an email with your budget and requirements to `greg@gregrickaby.com`

---

## Development

### 1. Clone the repo

```bash
git clone git@github.com:gregrickaby/nextjs-wordpress.git
```

### 2. Install dependencies

```bash
npm i
```

### 3. Create a `.env.local` file

```bash
cp .env.example .env.local
```

Customize the URLs in `.env.local` to match your WordPress setup:

```txt
# WordPress GraphQL API URL. No trailing slash.
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL="https://wordpress.nextjswp.com/graphql"

# Preview Secret. Must match the constant in wp-config.php.
NEXTJS_PREVIEW_SECRET="preview"

# Revalidation Secret. Must match the constant in wp-config.php.
NEXTJS_REVALIDATION_SECRET="revalidate"
```

### 4. Configure `next.config.js`

Update the URL in `next.config.js` to match your WordPress site:

```ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wordpress.nextjswp.com' // <-- Change to your WordPress site
      },
      {
        protocol: 'https',
        hostname: '**.gravatar.com'
      }
    ]
  }
}

module.exports = nextConfig
```

### 5. Configure WordPress

After installing the companion [plugin](https://github.com/gregrickaby/nextjs-wordpress-plugin) and [theme](https://github.com/gregrickaby/nextjs-wordpress-theme), add the following constants to your `wp-config.php` file:

```php
// The URL of your Next.js frontend. Include the trailing slash.
define( 'NEXTJS_FRONTEND_URL', 'https://nextjswp.com/' );

// Any random string. This must match the .env variable in the Next.js frontend.
define( 'NEXTJS_PREVIEW_SECRET', 'preview' );

// Any random string. This must match the .env variable in the Next.js frontend.
define( 'NEXTJS_REVALIDATION_SECRET', 'revalidate' );
```

### 6. Start the dev servers

```bash
npm run dev
```

Once the dev servers have started, you can view the following: <http://localhost:3000>

---

## Querying WordPress with GraphQL

GraphQL is efficient because we can query multiple endpoints in a single request. If we were to use the WordPress REST-API, we would need to make multiple round trips to each respective endpoint.

We can build our queries in GraphiQL (or your favorite REST client) and let `JSON.stringify()` format it. Because this is all standard JavaScript, we can even pass variables to our queries-- no need for a 3rd party package!

Here is a query to fetch a single post (based on the slug), the featured image, author meta, categories, tags, SEO, and post comments:

```ts
import {Post} from '@/lib/types'

/**
 * Fetch a single post by slug.
 */
export async function getPostBySlug(slug: string) {
  // Define our query.
  const query = `
    query GetPost($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        databaseId
        content(format: RENDERED)
        title(format: RENDERED)
        featuredImage {
          node {
            altText
            mediaDetails {
              sizes(include: MEDIUM) {
                height
                width
                sourceUrl
              }
            }
          }
        }
        author {
          node {
            gravatarUrl
            name
          }
        }
        date
        tags {
          nodes {
            databaseId
            name
          }
        }
        categories {
          nodes {
            databaseId
            name
          }
        }
        seo {
          metaDesc
          title
        }
        comments(first: 10, where: {order: ASC}) {
          nodes {
            content(format: RENDERED)
            databaseId
            date
            status
            author {
              node {
                email
                gravatarUrl
                name
              }
            }
          }
        }
      }
    }
  `

  // Define our variables.
  const variables = {
    slug: slug
  }

  // Fetch the data using a reusable fetch function.
  const response = await fetchGraphQL(query, variables)

  // Return the post.
  return response.data.post as Post
}
```

This repo does not use a 3rd party GraphQL package, because Next.js automatically memoizes the `fetch()` requests in our custom fetch function. This means that if we fetch the same data twice, Next.js will only make one request to WordPress.

> If you prefer use a 3rd party GraphQL package, simply swap out the custom `fetchGraphQL()` function.

---

## Contributing

Contributions are welcome! Please see the [contributing guidelines](./CONTRIBUTING.md) for more information.

---
