# Next.js + WordPress

💀 It's headless WordPress! - <https://nextjswp.com>

## Features

- Next.js w/ TypeScript
- React Components from [Mantine](https://mantine.dev)
- WordPress in a Docker container with PHP 8.1
- Apollo Client w/ WP GraphQL
- On-demand revalidation
- Date based blog routing (`YYYY/MM/DD/slug`)
- Yoast SEO support
- CPT UI support
- Menus support
- Preview support
- Comments support
- Post reactions support
- Advanced Custom Fields support
- ESLint, Stylelint, Prettier, and more!

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
│   └── tsconfig
└── turbo.json
```

### `apps/`

The applications directory. This includes the documentation, Next.js (frontend), and WordPress (backend).

### `packages/`

Shared packages used by the apps. This includes ESLint, Prettier, and TypeScript configs. As well as the WordPress plugin and theme.

### `turbo.json`

The repo config file. Learn more about configuring [Turborepo](https://turborepo.org/docs/configuration).

---

## Quick Start

### Prequisites

1. [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. [Node LTS](https://nodejs.dev/)

3. Clone this repo:

```bash
npx degit gregrickaby/nextjs-wordpress nextjs-wordpress
```

4. Set up your dev environment:

```bash
npm run setup
```

---

## Full Documentation

The docs are a work in progress. You can view them [here](./apps/docs/index.md).

---

## Contributing

Contributions are welcome! Please see the [contributing guidelines](./CONTRIBUTING.md) for more information.

---

## Props

A special thanks to the following people:

- [Rae Van Epps](https://github.com/ravewebdev) wrote the bulk of the PHP code for the Next.js WordPress Plugin, giving this project a jumping off point.
- [Amor Kumar](https://github.com/itsamoreh) insipired me to deep dive into Docker with his [BYOB Headless WordPress](https://github.com/itsamoreh/byob-headless-wordpress) project.
- [John Jeeves](https://github.com/orgs/AEWP/people/john-jeeves-americaneagle) and [Adam Hollister](https://github.com/ahollister) for their work on registering Gutenberg Blocks in the WordPress REST-API.
- [Jason Bahl](https://github.com/jasonbahl) for his tireless work on [WP GraphQL](https://github.com/jasonbahl/wp-graphql), and all of our chats/DMs over the years.

I ❤️❤️❤️ the open source community, and hope this project inspires you to create something awesome.

Cheers! 🍻

---
