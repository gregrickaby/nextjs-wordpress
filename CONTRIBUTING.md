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
   nvm use && npm i
   ```

2. Copy `.env.example` to `.env.local` and configure your WordPress URLs

3. Start the development server:

   ```bash
   npm run dev
   ```

   **Note:** The dev server automatically runs GraphQL Code Generator to sync WordPress types before starting.

4. The app will be available at <http://localhost:3000>

**Available Scripts:**

- `npm run dev` - Start dev server (runs codegen + cleans `.next` directory)
- `npm run build` - Production build with TypeScript checking
- `npm run start` - Start production server
- `npm run codegen` - Generate GraphQL types from WordPress schema
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier and auto-fix ESLint issues
- `npm run typecheck` - Run TypeScript compiler checks
- `npm test` - Run all tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run validate` - Complete validation suite (format → lint → typecheck → test)

---

### Git Workflow

1. Fork the repo and create a feature/patch branch off `main`
2. Work locally adhering to coding standards
3. Run `npm run validate` to ensure all checks pass
4. Make sure the app builds locally with `npm run build && npm run start`
5. Push your code, open a PR, and fill out the PR template
6. After peer review, the PR will be merged back into `main`
7. Repeat ♻️

**Coding Standards:**

- Follow Next.js 16 patterns (async params, Server Components)
- Always check for null/undefined data with nullish coalescing (`??`)
- Import WordPress types from `@/lib/generated` (auto-generated via GraphQL Code Generator)
- Import non-WordPress types from `@/lib/types`
- Use TypeScript - no `any` types
- Add proper error handling - return `[]` or `null` instead of throwing
- Write tests alongside code changes (test-driven development)
- Target 80%+ test coverage on new features
- See [AGENTS.md](./AGENTS.md) for detailed patterns and best practices

**GraphQL Type Generation Workflow:**

- Types are auto-generated from your WordPress GraphQL schema
- `npm run dev` automatically runs `npm run codegen` before starting
- To manually regenerate types: `npm run codegen`
- Generated types use `Maybe<T>` - always use `??` for null safety
- WordPress types in `lib/generated.ts` (auto-generated, don't edit)
- Custom types in `lib/types.d.ts` (hand-written, edit as needed)

> Your PR must pass automated assertions, deploy to Vercel successfully, and pass a peer review before it can be merged.

---

### Testing

This project follows **test-driven development** practices. Tests are required alongside all code changes.

#### Testing Stack

- **Vitest** - Fast unit test framework with SWC plugin
- **React Testing Library** - Component testing with user-centric queries
- **MSW v2** - Mock Service Worker for API mocking (never mock `global.fetch`)
- **jest-axe** - Accessibility testing for WCAG compliance

#### Running Tests

```bash
# Development workflow
npm test              # Run all tests once
npm run test:watch    # Watch mode for active development
npm run test:ui       # Interactive UI mode (debugging)
npm run test:coverage # Generate coverage report

# Complete validation
npm run validate      # Runs: format → lint → typecheck → test
```

#### Writing Tests

**Test files must be co-located** with the code they test:

```
components/
  Header.tsx
  Header.test.tsx      # ✅ Component test next to component
lib/
  queries/
    getAllPosts.ts
    getAllPosts.test.ts  # ✅ Query test next to query
```

**Component Test Example:**

```tsx
import {render, screen, user} from '@/test-utils'
import {axe} from 'jest-axe'
import {SearchForm} from './SearchForm'

describe('SearchForm', () => {
  it('should render search input', () => {
    render(<SearchForm />)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('should handle user input', async () => {
    render(<SearchForm />)
    const input = screen.getByRole('searchbox')

    await user.type(input, 'test query')
    expect(input).toHaveValue('test query')
  })

  it('should have no accessibility violations', async () => {
    const {container} = render(<SearchForm />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

**GraphQL Query Test Example:**

```tsx
import {server, http, HttpResponse} from '@/test-utils'
import {getAllPosts} from './getAllPosts'

describe('getAllPosts', () => {
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

  it('should handle API errors', async () => {
    server.use(
      http.post(process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL, () => {
        return new HttpResponse(null, {status: 500})
      })
    )

    const posts = await getAllPosts()
    expect(posts).toEqual([]) // Graceful error handling
  })
})
```

#### Test Utilities

**Critical: Always import from `@/test-utils`, never directly from libraries.**

```tsx
// ✅ CORRECT
import {render, screen, user, waitFor, server} from '@/test-utils'

// ❌ WRONG
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
```

**Key exports from `@/test-utils`:**

- `user` - Pre-configured `userEvent.setup()` (use this for all interactions)
- `render` - Custom render with providers
- `renderHook` - Hook testing with providers
- `server` - MSW server instance
- `http`, `HttpResponse` - MSW utilities
- `screen`, `waitFor` - All React Testing Library exports

#### MSW v2 API Mocking

**Never mock `global.fetch`** - Always use MSW v2 for HTTP interception.

```tsx
import {server, http, HttpResponse} from '@/test-utils'

// Override handlers for specific test cases
it('should handle 404 error', async () => {
  server.use(
    http.post(process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL, () => {
      return new HttpResponse(null, {status: 404})
    })
  )

  const result = await fetchData()
  expect(result).toBeNull()
})
```

#### Best Practices

1. **Test behavior, not implementation** - Focus on what users see and do
2. **Use descriptive test names** - Explain the expected behavior
3. **Test edge cases** - Empty responses, errors, null values
4. **Check accessibility** - Use `jest-axe` on all components
5. **Keep tests focused** - One concept per test
6. **Use `it.each()`** - Minimize test duplication with data-driven tests
7. **Aim for 80%+ coverage** - Focus on meaningful tests, not 100%

#### Coverage Goals

- **Target: 80%+ test coverage** (not 100%)
- Focus on critical paths and user-facing features
- Some unreachable edge cases are acceptable
- Tests should add value, not just increase numbers

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
