# Agents Guide

This Next.js WordPress headless frontend uses specialized AI agents to help with development, testing, and documentation. Each agent has specific expertise and clear boundaries.

## Project Overview

**Tech Stack:** Next.js 16.0.4 (App Router), React 19, TypeScript 5.9, Tailwind CSS 4, WordPress (headless via WPGraphQL)

**Architecture:** Server-side rendered React application that fetches content from WordPress via GraphQL, with on-demand revalidation and static generation.

---

## Available Agents

We have three specialized agents located in `.github/agents/`:

### [@dev-agent](.github/agents/dev-agent.md) - Full Stack Developer

Expert in Next.js 16, TypeScript, and WordPress GraphQL integration. Writes components, API routes, and query functions.

**Use for:**

- Building new features and pages
- Fixing bugs and type errors
- GraphQL query optimization
- Next.js 16 migration work

### [@test-agent](.github/agents/test-agent.md) - QA Engineer

Writes comprehensive tests for components and API routes. Understands WordPress data structures and edge cases.

**Use for:**

- Writing unit and integration tests
- Creating E2E test scenarios
- Testing error handling
- Validating null safety

### [@docs-agent](.github/agents/docs-agent.md) - Technical Writer

Creates clear developer documentation with practical examples. Keeps docs up-to-date with Next.js 16 patterns.

**Use for:**

- Writing API documentation
- Creating developer guides
- Documenting architecture decisions
- Updating examples

---

## Quick Reference

### Project Structure

```
app/              - Next.js App Router pages and layouts
components/       - React components (Header, Footer, SearchForm, CommentForm)
lib/
  ├── queries/    - GraphQL query functions
  ├── mutations/  - GraphQL mutation functions
  ├── functions.ts - Main fetchGraphQL with caching
  ├── types.d.ts  - TypeScript definitions
  └── config.ts   - Site configuration
public/           - Static assets
.github/agents/   - AI agent definitions
```

### Essential Commands

```bash
npm run dev       # Start dev server (auto-cleans .next)
npm run build     # Production build with TypeScript check
npm run lint      # Run ESLint (not 'next lint')
npm run format    # Format with Prettier
```

### Key Patterns

**Next.js 16 Async Params:**

```typescript
// ✅ Correct
export default async function Page({
  params
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  // ...
}
```

**Null Safety for Images:**

```typescript
// ✅ Always check featuredImage
{post.featuredImage?.node && (
  <Image
    alt={post.featuredImage.node.altText || post.title}
    src={post.featuredImage.node.sourceUrl}
    // ...
  />
)}
```

**GraphQL Error Handling:**

```typescript
// ✅ Return empty array on error
export default async function getAllPosts(): Promise<Post[]> {
  const response = await fetchGraphQL(query)

  if (!response?.data?.posts?.nodes) {
    return []
  }

  return response.data.posts.nodes as Post[]
}
```

### Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=https://your-site.com/graphql
NEXT_PUBLIC_WORDPRESS_REST_API_URL=https://your-site.com/wp-json/wp/v2
NEXTJS_AUTH_REFRESH_TOKEN=your-token-here
NEXTJS_PREVIEW_SECRET=your-secret-here
NEXTJS_REVALIDATION_SECRET=your-secret-here
```

---

## Validation Protocol

**All agents MUST complete these validation steps before declaring work is complete:**

1. **Format Code** - Run `npm run format` to apply Prettier and ESLint auto-fixes
2. **Check Linting** - Run `npm run lint` and fix any errors
3. **Verify Build** - Run `npm run build` to ensure TypeScript compilation succeeds
4. **Review Changes** - Confirm all changes align with project patterns and standards

**Never skip validation steps.** These checks prevent bugs, maintain code quality, and ensure the project builds successfully.

---

## Common Tasks

### Adding a GraphQL Query

1. Create file in `lib/queries/`
2. Import `fetchGraphQL` from `lib/functions.ts`
3. Add null safety: `if (!response?.data) return []`
4. Export with proper TypeScript return type
5. **Run validation protocol** (format, lint, build)

### Creating a New Page

1. Create `app/[route]/page.tsx`
2. Use async params: `{params: Promise<{slug: string}>}`
3. Await params: `const {slug} = await params`
4. Add `generateMetadata` for SEO
5. Handle null data with `notFound()`
6. **Run validation protocol** (format, lint, build)

### Adding a Client Component

1. Add `'use client'` directive at top
2. Use only where interactivity is needed
3. Keep Server Components as default
4. **Run validation protocol** (format, lint, build)

---

## Validation Steps

After

---

## Getting Started

1. Read `README.md` for setup
2. Review `lib/types.d.ts` for data structures
3. Check `lib/queries/` for GraphQL patterns
4. Study `app/page.tsx` for basic page example
5. Examine `app/blog/[slug]/page.tsx` for dynamic routes

## Resources

- **Next.js 16 Docs:** https://nextjs.org/docs
- **WPGraphQL Docs:** https://www.wpgraphql.com/docs/intro
- **Contributing Guide:** See `CONTRIBUTING.md`
