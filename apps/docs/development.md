# Development <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [Managing The Frontend (Next.js)](#managing-the-frontend-nextjs)
  - [Dev Servers](#dev-servers)
  - [Linting](#linting)
  - [Run a Production Build](#run-a-production-build)
  - [Image Optimization](#image-optimization)
  - [On-Demand Revalidation](#on-demand-revalidation)
  - [Disable Static Site Generation (SSG)](#disable-static-site-generation-ssg)
  - [Incremental Static Regeneration (ISR)](#incremental-static-regeneration-isr)
  - [Redirects](#redirects)
  - [Reactions](#reactions)
- [Managing The Backend (WordPress)](#managing-the-backend-wordpress)
  - [@wordpress/wp-env](#wordpresswp-env)
  - [Headless Plugin \& Theme](#headless-plugin--theme)
  - [Page/Post Previews](#pagepost-previews)
  - [Comments](#comments)
  - [GraphQL](#graphql)
  - [WordPress Constants](#wordpress-constants)
  - [WP CLI](#wp-cli)
- [Other](#other)
  - [Bypass Pre-Commit Hooks](#bypass-pre-commit-hooks)
- [Up Next](#up-next)

## Managing The Frontend (Next.js)

### Dev Servers

From the the `/apps/wordpress/` directory, run the following command to start WordPress <http://localhost:8888>

```bash
wp-env start
```

From the root of this project, run the following command to start the Next.js development server on <http://localhost:3000>

```bash
npm run dev
```

> Note: Make sure WordPress is running first, otherwise Next.js wont be able to query any data.

---

### Linting

Regularly linting the codebase is highly encouraged (and is enforced via pre-commit hook) to ensure code quality and consistency.

```bash
npm run lint
```

---

### Run a Production Build

It's often helpful to run a production build locally to verify everything works before deploying. To run a production build, run the following command:

```bash
npm run build && npm run start
```

---

### Image Optimization

Next.js supports [image optimization](https://nextjs.org/docs/basic-features/image-optimization) out of the box. To use it, you can import the `Image` component from `next/image` and pass it the URL of the image you want to optimize, including images from WordPress.

In order to use [Remote Images](https://nextjs.org/docs/basic-features/image-optimization#remote-images), you'll need to update the list of hostnames in `next.config.js`.

For example, if you're loading remote images from `unsplash.com`:

```js
// next.config.js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**.unsplash.com'
    }
  ]
}
```

---

### On-Demand Revalidation

Next.js supports [on-demand revalidation](https://nextjs.org/docs/basic-features/data-fetching/overview#on-demand-revalidation). This means that if a post or page is updated in WordPress, then WordPress will ping the frontend and tell Next.js to re-generate that post or page in the background. The next visitor to that page will see the updated content.

If your site has a lot of traffic, this option provides the best user experience and prevents your WordPress server from becoming overwhelmed, since content will remain static until it has been updated.

To view the code for this feature, check out the [frontend](https://github.com/gregrickaby/nextjs-wordpress/blob/main/pages/api/wordpress/revalidate.ts) and [backend](https://github.com/gregrickaby/nextjs-wordpress-plugin/blob/main/inc/revalidation.php) repositories.

---

### Disable Static Site Generation (SSG)

If your WordPress install has hundreds or even thousands of pages and posts, it will take a long time to generate a static site at build time. Additionally, WP GraphQL caps the number of requests to 100, so querying more than that will likely overwhelm your server[[1]](https://github.com/WebDevStudios/nextjs-wordpress-starter/issues/1008#issue-1228084495).

Instead, you can [generate paths on-demand](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths#generating-paths-on-demand). This means pages and posts will be server-side rendered first, then cached, and then served statically for the next visitor. This is a good compromise for sites with a lot of content.

To disable static site generation, set the `DISABLE_STATIC_SITE_GENERATION` environment variable in `.env.local` to `true`:

```text
// .env.local
DISABLE_STATIC_SITE_GENERATION="true"
```

---

### Incremental Static Regeneration (ISR)

Next.js supports [ISR](https://nextjs.org/docs/basic-features/data-fetching/overview#incremental-static-regeneration) for pages that use `getStaticProps`. This means Next.js will re-generate a page or post in the background and serve the updated page to the next user.

If you open `pages/[...slug].js` and look at the `getStaticProps` function, you'll see that it has a `revalidate` property set to `false`. That's because this project uses [on-demand revalidation](#on-demand-revalidation) instead of ISR. If you want to use ISR, you can set `revalidate` to a number of seconds. For example, to re-generate a page or post every 60 seconds, set `revalidate` to `60`.

> In my experience, ISR has the potential to overwhelm your server if you have a large site with a lot of traffic[[2]](https://web.archive.org/web/20220928131746/https://webdevstudios.com/2021/03/09/next-js-headless-wordpress/). This is because pages/posts will be constantly querying WordPress in the background.

---

### Redirects

Next.js supports [redirects](https://nextjs.org/docs/api-reference/next.config.js/redirects). If you change the slug of a page or post, you can add a redirect to `next.config.js` redirect visitors to the new URL.

The current redirect forwards visitors from the `/homepage` path to the actual homepage:

```js
// next.config.js
async redirects() {
  return [
    {
      source: '/homepage',
      destination: '/',
      permanent: true
    }
  ]
}
```

---

### Reactions

Post reactions are supported. Simply click a "like", "dislike", or "love" icon on a blog post and you'll see the number increase.

Reactions are saved in the WordPress database as post meta, and can be easily edited in the "Post Fields" section under the WordPress block editor:

![screenshot of post meta under the block editor](images/post-meta-fields-in-block-editor.png)

---

## Managing The Backend (WordPress)

### @wordpress/wp-env

This project uses [@wordpress/wp-env](https://developer.wordpress.org/block-editor/packages/packages-env/) to manage the local WordPress environment.

To run any of the following commands, you must be in the `apps/wordpress` directory!

To start the WordPress environment:

```bash
wp-env start
```

Read updated config files and reload the WordPress environment:

```bash
wp-env start --update
```

To stop the WordPress environment:

```bash
wp-env stop
```

To destory the WordPress environment:

```bash
wp-env destroy
```

To reset the database and delete media in the WordPress environment:

```bash
wp-env clean all
```

View the full list of `wp-env` commands and options at <https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/#usage>

---

### Headless Plugin & Theme

There is a WordPress [plugin](https://github.com/gregrickaby/nextjs-wordpress/tree/main/packages/nextjs-wordpress-plugin) and [theme](https://github.com/gregrickaby/nextjs-wordpress/tree/main/packages/nextjs-wordpress-theme) that help support turing WordPress into a headless CMS.

By design, these helpers are lightweight and use old-school functional programming to keep things simple. If you need more robust functionality, please check out [Faust.js](https://faustjs.org/).

Contributions to the plugin and theme are welcome!

---

### Page/Post Previews

Previewing pages and posts is supported. Simply click "preview" in the WordPress admin and you'll be taken to the frontend where you can see a preview.

---

### Comments

Comments, Gravatars, nested comments, and comment moderation are all supported.

> Note: Comments are held for moderation by default. You can change this in the WordPress admin under "Settings" > "Discussion".

---

### GraphQL

GraphQL endpoint: `http://localhost:8888/graphql`

GraphiQL IDE: <http://localhost:8888/wp-admin/admin.php?page=graphiql-ide>

---

### WordPress Constants

Inside `apps/wordpress/.wp-env.json` there are several developer friendly constants you can enable to help with debugging. Feel free to add, remove, or change these values as needed.

> If you change the default values, run `wp-env start --update` to rebuild the containers.

---

### WP CLI

[WP-CLI](https://make.wordpress.org/cli/) is a command line interface for WordPress. It's a tool that makes it easy to manage WordPress sites. For example:

```bash
wp-env run cli wp --info
```

Will return:

```bash
[+] Running 2/0
 ⠿ Container 5b6d0fdac0955656fb8e35e083b7a348-mysql-1      Running 0.0s
 ⠿ Container 5b6d0fdac0955656fb8e35e083b7a348-wordpress-1  Running    0.0s
OS:     Linux 5.15.49-linuxkit
Shell:
PHP binary:     /usr/local/bin/php
PHP version:    8.0.28
php.ini used:
MySQL binary:   /usr/bin/mysql
MySQL version:  mysql  Ver 15.1 Distrib 10.6.12-MariaDB, for Linux (aarch64) using readline 5.1
SQL modes:
WP-CLI root dir:        phar://wp-cli.phar/vendor/wp-cli/wp-cli
WP-CLI vendor dir:      phar://wp-cli.phar/vendor
WP_CLI phar path:       /var/www/html
WP-CLI packages dir:
WP-CLI cache dir:       /etc/X11/fs/.wp-cli/cache
WP-CLI global config:
WP-CLI project config:
WP-CLI version: 2.7.1
✔ Ran `wp --info` in 'cli'. (in 1s 555ms)
```

See the full list of WP-CLI commands at: <https://developer.wordpress.org/cli/commands/>

---

## Other

### Bypass Pre-Commit Hooks

If you need to bypass the pre-commit hooks, you can use the `--no-verify` flag:

```bash
git commit -m "My commit message" --no-verify
```

---

## Up Next

Learn more about [Contributing](../../CONTRIBUTING.md).

---
