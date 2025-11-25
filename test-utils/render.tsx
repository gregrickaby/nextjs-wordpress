import {render as rtlRender, type RenderOptions} from '@testing-library/react'
import type {PropsWithChildren, ReactElement} from 'react'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  // Add any custom options here if needed in the future
}

/**
 * Custom render function that wraps the UI with required providers.
 * For a simple Next.js app without Redux, this is a basic wrapper.
 * Extend as needed when adding providers (e.g., ThemeProvider, etc.).
 */
export function render(
  ui: ReactElement,
  {...renderOptions}: ExtendedRenderOptions = {}
) {
  const Wrapper = ({children}: PropsWithChildren) => <>{children}</>

  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
}
