import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'

describe('App', () => {
  it('renders h1 with text', () => {
    const wrapper = mount(App)
    const h1 = wrapper.find('h1')
    expect(h1.exists()).toBe(true)
    expect(h1.text()).toContain('Vue 3')
  })

  it('renders feature items with data-testid', () => {
    const wrapper = mount(App)
    const items = wrapper.findAll('[data-testid="feature-item"]')
    expect(items.length).toBeGreaterThan(0)
  })
})
