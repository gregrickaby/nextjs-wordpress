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

I'm planning support for additional features like menus, CPT's, SEO, and more.

### What happened to your old repo? The one with Docker, Mantine, and all the other stuff?

I've decided to simplify things based on the Next.js 13 App Router. You can however still [view the old repo](https://github.com/gregrickaby/nextjs-wordpress/tree/1.0.0).

---

## Contributing

Contributions are welcome! Please see the [contributing guidelines](./CONTRIBUTING.md) for more information.

---
