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

This project is a monorepo managed by [Turborepo](https://turbo.build/repo).

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

The repo config file. Learn more about configuring [Turborepo](https://turbo.build/repo/docs/reference/configuration).

---

## Quick Start

### Prequisites

1. [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. [Node LTS](https://nodejs.dev/)
3. [Composer](https://getcomposer.org/download/)

4. Clone this repo:

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

## FAQ

### Do I have to use Docker?

No. You can use any WordPress install you want. Just make sure you follow [the documentation](https://github.com/gregrickaby/nextjs-wordpress/blob/main/apps/docs/index.md) and have the Next.js WordPress Plugin and Theme, and WP GraphQL activated.

---

### So this repo will work on any WordPress install?

Yes. The [demo site](https://nextjswp.com/) is not running Docker. See above ^^

---

### Why Mantine and not Tailwind, MUI, or \_\_\_\_?

I did not want to create/maintain UI components like forms, notifications, etc. from scratch. See [this issue](https://github.com/gregrickaby/nextjs-wordpress/issues/69#issuecomment-1426217207) for a more detailed explanation.

---

### Why Apollo and not \_\_\_\_?

While Apollo can sometimes introduce a large performance penalty, it was literally built for working with GraphQL... and _it works well_.

---

### When will you support the Next.js 13 `app` directory?

_As of March 2023, the `app` directory is still in `beta`_

First, The Next.js team [does not recommend using it in production](https://capture.dropbox.com/akVllqdUQTtzOPKd).

Second, Client-Side data fetching is [not supported](https://www.reddit.com/r/nextjs/comments/11a5vp9/comment/j9q0dx9/), and the limitations of React Context have been challenging.

Finally, Mantine (which uses Emotion) doesn't fully support Server Components yet (see [#2928](https://github.com/emotion-js/emotion/issues/2928) and [#2815](https://github.com/mantinedev/mantine/issues/2815)).

Please understand that I am as equally excited about the `app` directory as you are! However, Server Components represent a complete paradigm shift for React-based projects. Refactoring this repo will require a lot of work. Don't worry, because `pages` directory will be around [for years to come](https://www.reddit.com/r/nextjs/comments/11a5vp9/comment/j9x3e4h/)!

---

## Contributing

Contributions are welcome! Please see the [contributing guidelines](./CONTRIBUTING.md) for more information.

---

## Props

A special thanks to the following people:

- [Rae Van Epps](https://github.com/ravewebdev) wrote the bulk of the PHP code for the Next.js WordPress Plugin, giving this project a jumping off point.
- [Amor Kumar](https://github.com/itsamoreh) insipired me to deep dive into Docker with his [BYOB Headless WordPress](https://github.com/itsamoreh/byob-headless-wordpress) project.
- [John Jeeves](https://github.com/orgs/AEWP/people/john-jeeves-americaneagle) and [Adam Hollister](https://github.com/ahollister) for their work on registering Gutenberg Blocks in the WordPress REST-API.
- [Jason Bahl](https://github.com/jasonbahl) for his tireless work on [WP GraphQL](https://www.wpgraphql.com/), and all of our chats/DMs over the years.

I ❤️❤️❤️ the open source community, and hope this project inspires you to create something awesome.

Cheers! 🍻

---
