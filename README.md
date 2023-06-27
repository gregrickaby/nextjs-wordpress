# Next.js + WordPress

💀 It's headless WordPress! - <https://nextjswp.com>

## Features

- Next.js w/ TypeScript
- WordPress environment with [@wordpress/wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/)
- React Components from [Mantine](https://mantine.dev)
- Apollo and WP GraphQL
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

View the [Quick Start instructions](https://github.com/gregrickaby/nextjs-wordpress/blob/main/apps/docs/setup.md#quick-start).

---

## Full Documentation

View the [full documentation](./apps/docs/index.md).

---

## Development Quick Start

Already set up? In your terminal, start the two dev servers:

```bash
npm run dev
```

Once the dev servers have started, you can view the following:

Next.js frontend <http://localhost:3000>

WordPress backend: <http://localhost:8888/wp-admin>

- user: `admin`
- pass: `password`

---

## FAQ

### Do I have to use @wordpress/env?

Nah, you can use any WordPress environment you want. I've tested with LocalWP and Dreamhost and both work fine. Using [@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) is just a convient way to shared and automate the setup process.

⚠️ If you choose not to use [@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/), you'll need to to do quite a bit of manual setup as well as update some of the scripts in the `package.json` file.

---

### Why Mantine and not Tailwind, MUI, or \_\_\_\_?

I did not want to create or maintain complex UI components such as forms, notifications, dropdowns, and so on. The reason for this is explained in more detail in [this discussion](https://github.com/gregrickaby/nextjs-wordpress/discussions/76#discussioncomment-5203206).

---

### Why Apollo and not \_\_\_\_?

Although Apollo can sometimes negatively impact performance, it was specifically designed for GraphQL and it is a reliable and effective tool for this purpose.

---

### When will you support the Next.js 13 `app` router?

This repository has not yet adopted the app router primarily because Mantine (which uses Emotion) doesn't _fully_ support Server Components yet (see [#2815](https://github.com/mantinedev/mantine/issues/2815) and [#2928](https://github.com/emotion-js/emotion/issues/2928))

While there is considerable enthusiasm for the app router and Server Components in React-based projects, it is essential to acknowledge that Server Components represent a substantial shift in the development of React-based projects. It will inevitably take time for both the tooling and the community to embrace this approach fully.

Nevertheless, **the pages directory is stable and will continue to be actively supported in future versions of Next.js**. As a matter of fact, a VP at Vercel has publicly stated that the pages directory will be around for years to come[[1](https://www.reddit.com/r/nextjs/comments/11a5vp9/comment/j9x3e4h/)]!

I am [actively exploring and experimenting](https://github.com/gregrickaby/nextjs-app-router-examples) with this new technology and am encouraged by the results. More information will be shared about this topic in the future.

---

## Contributing

Contributions are welcome! Please see the [contributing guidelines](./CONTRIBUTING.md) for more information.

---

## Props

A special thanks to the following people:

- [Rae Van Epps](https://github.com/ravewebdev) wrote the bulk of the PHP code for the Next.js WordPress Plugin, giving this project a jumping off point.
- [Amor Kumar](https://github.com/itsamoreh) insipired me to deep dive into Docker with his [BYOB Headless WordPress](https://github.com/itsamoreh/byob-headless-wordpress) project.
- [Jason Bahl](https://github.com/jasonbahl) for his tireless work on [WP GraphQL](https://www.wpgraphql.com/), and all of our chats/DMs over the years.

I ❤️ the open source community, and hope this project inspires you to create something awesome. Cheers! 🍻

---
