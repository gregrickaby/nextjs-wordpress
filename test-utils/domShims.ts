/**
 * Small DOM shims for the test environment.
 * Keeps these isolated so vitest.setup.ts can import them once.
 */
export function installDomShims(): void {
  // scrollIntoView is not implemented in jsdom.
  if (!('scrollIntoView' in Element.prototype)) {
    // Provide a no-op implementation for tests
    // @ts-ignore - test shim
    Element.prototype.scrollIntoView = function (): void {}
  }
}

export function removeDomShims(): void {
  // Clean up the shim if it was added
  // @ts-ignore - test shim
  if (Element.prototype.scrollIntoView?.toString?.().includes('function')) {
    // @ts-ignore - test shim
    Element.prototype.scrollIntoView = undefined
  }
}
