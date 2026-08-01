import type { TestingLibraryMatchers } from '@testing-library/jest-dom'
import '@testing-library/jest-dom/vitest'

// Vitest 4 defines Assertion in @vitest/expect, not in vitest itself
declare module '@vitest/expect' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Assertion<R = unknown> extends TestingLibraryMatchers<R, void> {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers<
    unknown,
    void
  > {}
}
