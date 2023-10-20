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

---

### Git Workflow

1. Fork the repo and create a feature/patch branch off `main`
2. Work locally adhering to coding standards
3. Run `npm run lint`
4. Make sure the app builds locally with `npm run build && npm run start`
5. Push your code, open a PR, and fill out the PR template
6. After peer review, the PR will be merged back into `main`
7. Repeat ♻️

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
