import {renderHook as rtlRenderHook} from '@testing-library/react'
import React from 'react'

/**
 * Extended renderHook options.
 */
interface ExtendedRenderHookOptions {
  // Add any custom options here if needed in the future
}

/**
 * Custom renderHook function with providers.
 *
 * Returns Testing Library's renderHook result.
 *
 * @param callback - The hook function to test.
 * @param options - Optional render options.
 */
export function renderHook<Result, Props>(
  callback: (props: Props) => Result,
  {...renderOptions}: Readonly<ExtendedRenderHookOptions> = {}
) {
  // Create a wrapper component including all providers.
  function Wrapper({children}: Readonly<{children: React.ReactNode}>) {
    return <>{children}</>
  }

  // Render the hook with providers.
  return rtlRenderHook(callback, {wrapper: Wrapper, ...renderOptions})
}
