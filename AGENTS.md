# AGENTS.md

This Next.js WordPress headless frontend uses specialized AI agents to help with development, testing, and documentation. Each agent has specific expertise and clear boundaries.

## Project Overview

**Tech Stack:** Next.js 16.0.4 (App Router, React Compiler, Turbopack), React 19, TypeScript 5.9, Tailwind CSS 4, WordPress (headless via WPGraphQL)

**Architecture:** Server-side rendered React application that fetches content from WordPress via GraphQL, with on-demand revalidation and static generation.

---

## Available Agents

We have four specialized agents located in `.github/agents/`:

### [@plan-agent](.github/agents/plan-agent.md) - Technical Planner

Designs features and architecture for Next.js WordPress applications. Creates implementation roadmaps with clear phases and dependencies.

**Use for:**

- Designing new features with technical specifications
- Planning architecture decisions
- Creating implementation roadmaps
- Identifying technical risks and solutions

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

### [@code-review-agent](.github/agents/code-review-agent.md) - Senior Code Reviewer

Enforces quality, security, accessibility (WCAG 2.1 AA), and architectural standards. Acts as quality gatekeeper.

**Use for:**

- Reviewing code for quality and standards
- Verifying test coverage (80%+ target)
- Checking security best practices
- Ensuring WCAG 2.1 AA accessibility compliance

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
  ├── types.d.ts  - Non-WordPress TypeScript definitions
  ├── generated.ts - Auto-generated WordPress GraphQL types
  └── config.ts   - Site configuration
public/           - Static assets
.github/agents/   - AI agent definitions
codegen.ts        - GraphQL Code Generator configuration
```

### Essential Commands

```bash
npm run dev          # Start dev server (runs codegen + cleans .next)
npm run build        # Production build with TypeScript check
npm run codegen      # Generate GraphQL types from WordPress schema
npm run lint         # Run ESLint (not 'next lint')
npm run format       # Format with Prettier
npm run typecheck    # Run TypeScript compiler checks
npm test             # Run all tests once
npm run test:watch   # Run tests in watch mode
npm run test:ui      # Run tests with interactive UI
npm run test:coverage # Run tests with coverage report
npm run validate     # Run all checks: format, lint, typecheck, test
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
// ✅ Always check featuredImage and use nullish coalescing
{post.featuredImage?.node && (
  <Image
    alt={post.featuredImage.node.altText ?? post.title ?? ''}
    src={post.featuredImage.node.sourceUrl ?? ''}
    // ...
  />
)}
```

**GraphQL Types:**

```typescript
// ✅ Import WordPress types from generated.ts
import type {Post, Category, Tag, MenuItem} from '@/lib/generated'
import type {DynamicPageProps} from '@/lib/types'

// ✅ Use nullish coalescing for Maybe<T> types
const title = post.title ?? 'Untitled'

// ✅ Cast specific types in map functions when needed
post.categories?.nodes?.map((category: Category) => (
  <li key={category.databaseId}>{category.name}</li>
))
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

### Quick Validation (Recommended)

Run the complete validation suite:

```bash
npm run validate
```

This single command runs all checks in sequence:

1. **Format** - Applies Prettier and ESLint auto-fixes
2. **Lint** - Checks for linting errors
3. **TypeCheck** - Verifies TypeScript compilation
4. **Test** - Runs all unit tests

### SonarQube Analysis (End of Feature Development)

After completing feature development and passing all validation steps, run SonarQube analysis:

```bash
npm run sonar
```

This runs comprehensive code quality analysis including:

- **Code Smells** - Maintainability issues and best practice violations
- **Security Vulnerabilities** - Potential security risks
- **Code Coverage** - Validates test coverage meets standards
- **Technical Debt** - Identifies areas needing improvement

View results at: http://localhost:9000/dashboard?id=Next.js-WordPress

### Manual Validation (Alternative)

If needed, run steps individually:

1. **Format Code** - Run `npm run format` to apply Prettier and ESLint auto-fixes
2. **Check Linting** - Run `npm run lint` and fix any errors
3. **Type Check** - Run `npm run typecheck` to verify TypeScript
4. **Run Tests** - Run `npm test` to ensure all tests pass
5. **Verify Build** - Run `npm run build` to ensure production build succeeds
6. **SonarQube Analysis** - Run `npm run sonar` for code quality analysis (at end of feature development)
7. **Review Changes** - Confirm all changes align with project patterns and standards

**Never skip validation steps.** These checks prevent bugs, maintain code quality, and ensure the project builds successfully.

---

## Common Tasks

### Adding a GraphQL Query

1. Create file in `lib/queries/`
2. Import `fetchGraphQL` from `lib/functions.ts`
3. Add null safety: `if (!response?.data) return []`
4. Export with proper TypeScript return type
5. Write unit tests in co-located `.test.ts` file
6. **Run `npm run validate`** to ensure everything passes
7. **Run `npm run sonar`** for code quality analysis (optional, recommended for major features)

### Creating a New Page

1. Create `app/[route]/page.tsx`
2. Use async params: `{params: Promise<{slug: string}>}`
3. Await params: `const {slug} = await params`
4. Add `generateMetadata` for SEO
5. Handle null data with `notFound()`
6. **Run `npm run validate`** to ensure everything passes
7. **Run `npm run sonar`** for code quality analysis (optional, recommended for major features)

### Adding a Client Component

1. Add `'use client'` directive at top
2. Use only where interactivity is needed
3. Keep Server Components as default
4. Write unit tests in co-located `.test.tsx` file
5. **Run `npm run validate`** to ensure everything passes
6. **Run `npm run sonar`** for code quality analysis (optional, recommended for major features)

---

## Testing Strategy

### Test-Driven Development Philosophy

This is a **test-driven codebase**. Tests must be written alongside code changes, not as an afterthought.

**Coverage Expectations:**

- Target **80%+ test coverage** (not 100%)
- Focus on meaningful tests that validate real behavior
- Some unreachable edge cases are acceptable
- Tests should add value, not just increase coverage numbers

**Testing Layers:**

- **Unit Tests**: All components and functions have co-located `.test.tsx` or `.test.ts` files
- **Integration Tests**: Use MSW v2 to mock WordPress GraphQL API calls
- **Accessibility**: Use jest-axe to validate WCAG compliance
- **Quality Gate**: npm run validate must pass before merge

### Running Tests

```bash
# Development workflow
npm test              # Run all tests once
npm run test:watch    # Watch mode for active development
npm run test:ui       # Interactive UI mode (debugging)
npm run test:coverage # Generate coverage report

# Most common workflow
npx vitest <path> --run  # Test specific file during development
npm run validate         # Complete validation before merge
```

### Test Utilities (@/test-utils)

**Critical: ALWAYS import test utilities from `@/test-utils`, never directly from libraries.**

**Pre-configured Exports:**

```typescript
// ✅ CORRECT
import {render, screen, user, waitFor, server} from '@/test-utils'

// ❌ WRONG
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
```

**Key Exports:**

- `user` - **Pre-configured userEvent.setup()** - Use this for all user interactions
- `render` - Custom render function (wraps providers if needed)
- `renderHook` - Hook testing utilities
- `server` - MSW server instance for request mocking
- `http`, `HttpResponse` - MSW utilities for handler creation
- All @testing-library/react exports (screen, waitFor, etc.)

**Why Use Pre-configured `user`?**

- ✅ Consistent setup across all tests
- ✅ Eliminates duplicate `userEvent.setup()` calls
- ✅ Single source of truth for test configuration
- ✅ Easier to update user-event options globally

### MSW v2 HTTP Mocking (CRITICAL)

**NEVER mock `global.fetch`** - Always use MSW v2 for HTTP interception.

**Global Setup** (handled in `vitest.setup.ts`):

- `beforeAll`: `server.listen()` - starts MSW server
- `afterEach`: `server.resetHandlers()` - resets to default handlers
- `afterAll`: `server.close()` - shuts down server

**Test Pattern:**

```typescript
import {server, http, HttpResponse} from '@/test-utils'

// ✅ CORRECT - Use MSW v2 for API mocking
it('should handle API error', async () => {
  server.use(
    http.post(process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL, () => {
      return new HttpResponse(null, {status: 500})
    })
  )

  const result = await fetchFunction()
  expect(result).toBeNull()
})

// ❌ WRONG - Never mock global.fetch
it('should fetch data', async () => {
  global.fetch = vi.fn().mockResolvedValue({...})  // NEVER DO THIS
})
```

**When to Override Handlers:**

- Edge cases: 404, 500, network errors
- Empty/null responses
- Malformed data
- GraphQL errors

### Test Patterns

**Component Tests:**

```typescript
import {render, screen, user} from '@/test-utils'
import {axe} from 'jest-axe'

it('should render and be accessible', async () => {
  const {container} = render(<MyComponent />)
  expect(screen.getByText('Hello')).toBeInTheDocument()

  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

it('should handle user interaction', async () => {
  render(<MyComponent />)
  await user.click(screen.getByRole('button', {name: /submit/i}))
  expect(screen.getByText('Success')).toBeInTheDocument()
})
```

**GraphQL Query Tests:**

```typescript
import {server, http, HttpResponse} from '@/test-utils'

it('should fetch posts successfully', async () => {
  server.use(
    http.post(process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL, () => {
      return HttpResponse.json({
        data: {posts: {nodes: [{title: 'Test Post'}]}}
      })
    })
  )

  const posts = await getAllPosts()
  expect(posts).toHaveLength(1)
  expect(posts[0].title).toBe('Test Post')
})

it('should handle empty response', async () => {
  server.use(
    http.post(process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL, () => {
      return HttpResponse.json({data: {posts: {nodes: []}}})
    })
  )

  const posts = await getAllPosts()
  expect(posts).toEqual([])
})
```

**Async Server Component Tests:**

```typescript
import {server, http, HttpResponse} from '@/test-utils'

it('should render async Server Component', async () => {
  server.use(
    http.post(process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL, () => {
      return HttpResponse.json({data: {menu: {menuItems: {nodes: []}}}})
    })
  )

  // Server Components are async - must await
  const HeaderComponent = await Header()
  const {container} = render(HeaderComponent)

  expect(container).toBeInTheDocument()
})
```

**Testing Best Practices:**

- Use `it.each()` loops to minimize test duplication
- Test error states and edge cases, not just happy paths
- Always check accessibility with jest-axe
- Use descriptive test names that explain the behavior
- Keep tests focused - one concept per test
- Clean up side effects with proper mocks and handlers

### Common Testing Mistakes

**❌ WRONG:**

```typescript
// Don't mock global.fetch
global.fetch = vi.fn()

// Don't import from libraries directly
import {render} from '@testing-library/react'

// Don't call userEvent.setup() directly
const user = userEvent.setup()

// Don't create superfluous tests without value
it('should exist', () => {
  expect(MyComponent).toBeDefined() // Meaningless test
})
```

**✅ CORRECT:**

```typescript
// Use MSW v2 for HTTP mocking
import {server, http, HttpResponse} from '@/test-utils'

// Use pre-configured test utilities
import {render, screen, user} from '@/test-utils'

// Use pre-configured user instance
await user.click(screen.getByRole('button'))

// Write meaningful tests
it('should display error message when API fails', async () => {
  server.use(
    http.post(process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL, () => {
      return new HttpResponse(null, {status: 500})
    })
  )

  render(<MyComponent />)
  await user.click(screen.getByRole('button'))
  expect(screen.getByText(/error/i)).toBeInTheDocument()
})
```

### Documentation

See `CONTRIBUTING.md` for complete testing infrastructure, patterns, and best practices.

---

## Getting Started

1. Read `README.md` for setup
2. Review `lib/types.d.ts` for data structures
3. Check `lib/queries/` for GraphQL patterns
4. Study `app/page.tsx` for basic page example
5. Examine `app/blog/[slug]/page.tsx` for dynamic routes

## Resources

- **Contributing Guide:** See `CONTRIBUTING.md`
