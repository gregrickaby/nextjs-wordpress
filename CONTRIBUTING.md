# Contributing <!-- omit in toc -->

Here are the ways to get involved with this project:

- [Submitting issues](#submitting-issues)
- [Contributing code](#contributing-code)
  - [Development Setup](#development-setup)
  - [Git Workflow](#git-workflow)
  - [Vercel CLI](#vercel-cli)
- [Legal Stuff](#legal-stuff)

## Submitting issues

Before submitting your issue, make sure it has not been mentioned earlier. You can search through the [existing issues](https://github.com/gregrickaby/nextjs-wordpress/issues) or [Github Discussions](https://github.com/gregrickaby/nextjs-wordpress/discussions).

---

## Contributing code

Found a bug you can fix? Fantastic! Patches are always welcome.

### Development Setup

1. Clone your fork and install dependencies:
   ```bash
   git clone git@github.com:YOUR_USERNAME/nextjs-wordpress.git
   cd nextjs-wordpress
   npm install
   ```

2. Copy `.env.example` to `.env.local` and configure your WordPress URLs

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The app will be available at <http://localhost:3000>

**Available Scripts:**

- `npm run dev` - Start dev server (auto-cleans `.next` directory)
- `npm run build` - Production build with TypeScript checking
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier and auto-fix ESLint issues
- `npm run clean` - Remove `.next` directory

---

### Git Workflow

1. Fork the repo and create a feature/patch branch off `main`
2. Work locally adhering to coding standards
3. Run `npm run format` to format code with Prettier and ESLint
4. Run `npm run lint` to check for linting errors
5. Make sure the app builds locally with `npm run build && npm run start`
6. Push your code, open a PR, and fill out the PR template
7. After peer review, the PR will be merged back into `main`
8. Repeat ♻️

**Coding Standards:**

- Follow Next.js 16 patterns (async params, Server Components)
- Always check for null/undefined data (especially `featuredImage`)
- Use TypeScript - no `any` types
- Add proper error handling - return `[]` or `null` instead of throwing
- See [AGENTS.md](./AGENTS.md) for detailed patterns and best practices

> Your PR must pass automated assertions, deploy to Vercel successfully, and pass a peer review before it can be merged.

---

### Vercel CLI

I've found that running `vercel` locally is a great way to verify Edge Functions and Middleware are working as expected.

To install the [Vercel CLI](https://vercel.com/docs/cli), run:

```bash
npm i -g vercel
```

Start a Vercel development server locally:

```bash
vercel dev
```

---

## Legal Stuff

This repo is maintained by [Greg Rickaby](https://gregrickaby.com/). By contributing code you grant its use under the [MIT](https://github.com/gregrickaby/nextjs-wordpress/blob/main/LICENSE).

---
