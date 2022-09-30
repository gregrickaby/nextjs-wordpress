# Next.js + WordPress <!-- omit in toc -->

💀 It's headless WordPress!

## Features <!-- omit in toc -->

- Next.js w/ TypeScript
- WordPress in a Docker container with PHP 8.0
- Self-signed SSL certificate from Traefik
- Apollo Client w/ WP GraphQL
- On-demand revalidation
- Date based blog routing (`YYYY/MM/DD/slug`)
- SEO via Yoast
- Menus support
- Preview support
- Comments support
- Post reactions support
- Custom Post Types via CPT UI
- Custom Fields via Advanced Custom Fields
- ESLint, Stylelint, Prettier, and more!

---

## Demo

See a fully working, production site running this stack at <https://gregrickaby.com>

---

## Monorepo

This project is a monorepo managed by [Turborepo](https://turborepo.org/).

```text
nextjs-wordpress
├── apps
│   ├── docs
│   ├── nextjs
│   └── wordpress
├── packages
│   ├── eslint-config-custom
│   ├── nextjs-wordpress-plugin
│   ├── nextjs-wordpress-theme
│   ├── prettier-config-custom
│   ├── stylelint-config-custom
│   └── tsconfig
└── turbo.json
```

### `apps/`

The applications directory. This includes the documentation, Next.js (frontend), and WordPress (backend).

### `packages/`

Shared packages used by the apps. This includes ESLint, Stylelint, Prettier, and TypeScript configs. As well as the WordPress plugin and theme.

### `turbo.json`

The repo config file. Learn more about configuring [Turborepo](https://turborepo.org/docs/configuration).

---

## Prequisites

1. [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. [Node LTS](https://nodejs.dev/)

---

## Quick Start

1. Clone this repo:

```bash
npx degit gregrickaby/nextjs-wordpress nextjs-wordpress
```

2. Install Next.js:

```bash
cd nextjs-wordpress && npm i
```

3. Install WordPress (Docker Desktop must be running):

```bash
cd apps/wordpress && chmod +x install.sh && ./install.sh
```

4. Import ACF Fields:

- Log into WordPress <https://nextjswp.test/wp-admin> (admin/password)
- Go to Custom Fields --> Tools --> Import Field Groups
- Click "Choose File"
- Select `apps/wordpress/acf-export-post-fields.json`
- Click "Import JSON"

5. Start the development server:

```bash
cd ../../ && npm run dev
```

---

## Full Documentation

The documentation is a work in progress. You can view them [here](./apps/docs/index.md).

---

## Contributing

Contributions are welcome! Please see the [contributing guidelines](./CONTRIBUTING.md) for more information.

---

## Props

A special thanks to the following people:

- [Rae Van Epps](https://github.com/ravewebdev) wrote the bulk of the PHP code for the [Next.js WordPress Plugin](https://github.com/gregrickaby/nextjs-wordpress-plugin), giving this project a jumping off point.
- [Amor Kumar](https://github.com/itsamoreh) insipired me to deep dive into Docker with his [BYOB Headless WordPress](https://github.com/itsamoreh/byob-headless-wordpress) project.
- [John Jeeves](https://github.com/orgs/AEWP/people/john-jeeves-americaneagle) and [Adam Hollister](https://github.com/ahollister) for their [nifty work](https://github.com/gregrickaby/nextjs-wordpress-plugin/blob/main/inc/blocks.php) registering Gutenberg Blocks in the WordPress REST-API.
- [Jason Bahl](https://github.com/jasonbahl) for his tireless work on [WP GraphQL](https://github.com/jasonbahl/wp-graphql), and all of our chats/DMs over the years.

I ❤️❤️❤️ the open source community, and hope this project inspires you to create something awesome.

Cheers! 🍻

---
