import * as matchers from 'vitest-axe/matchers'
import { expect, beforeEach } from 'vitest'
import type { AxeMatchers } from 'vitest-axe/matchers'
import { setActivePinia, createPinia } from 'pinia'

expect.extend(matchers)

beforeEach(() => {
  setActivePinia(createPinia())
})

declare module '@vitest/expect' {
  interface Assertion extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
