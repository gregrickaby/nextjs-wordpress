# Next.js + WordPress

💀 It's headless WordPress! - <https://nextjswp.com>

This repo is a basic Next.js app which fetches data from WordPress and styles it with Tailwind. That's it.

Please consider it a starting point for you to build your own headless WordPress site.

---

## Features

- Next.js 13 with App Router
- Tailwind CSS
- Comments support
- TypeScript
- ESLint, Prettier, Stylelint and more!

---

## Development

### 1. Clone this repo

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

### 4. Start the dev servers

```bash
npm run dev
```

Once the dev servers have started, you can view the following: <http://localhost:3000>

---

## FAQ

### What sort of setup do I need for WordPress?

You'll need either a local or public WordPress site with the [WPGraphQL](https://www.wpgraphql.com/) plugin installed and activated.

### What happened to your old repo? The one with Docker, Mantine, and all the other stuff?

I've decided to simplify things based on the Next.js 13 App Router. You can still [view the old repo](https://github.com/gregrickaby/nextjs-wordpress/tree/1.0.0).

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
