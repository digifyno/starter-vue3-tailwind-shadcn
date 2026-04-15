import * as matchers from 'vitest-axe/matchers'
import { expect, beforeEach } from 'vitest'
import type { AxeMatchers } from 'vitest-axe/matchers'
import { config } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

expect.extend(matchers)

declare module '@vitest/expect' {
  interface Assertion extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}

beforeEach(() => {
  const pinia = createPinia()
  setActivePinia(pinia)
  config.global.plugins = [pinia]
})
