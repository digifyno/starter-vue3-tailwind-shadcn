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

  it('has main-content id for skip navigation', () => {
    const wrapper = mount(App)
    expect(wrapper.find('#main-content').exists()).toBe(true)
  })

  it('toggles dark class on html element when button is clicked', async () => {
    document.documentElement.classList.add('dark')
    const wrapper = mount(App)
    const button = wrapper.find('button[aria-label]')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    await button.trigger('click')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    await button.trigger('click')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    document.documentElement.classList.remove('dark')
  })

  it('changes aria-label when dark mode is toggled', async () => {
    document.documentElement.classList.add('dark')
    const wrapper = mount(App)
    const button = wrapper.find('button[aria-label]')
    expect(button.attributes('aria-label')).toBe('Switch to light mode')
    await button.trigger('click')
    expect(button.attributes('aria-label')).toBe('Switch to dark mode')
    document.documentElement.classList.remove('dark')
  })

  it('documentation link has correct rel and target attributes', () => {
    const wrapper = mount(App)
    const link = wrapper.find('a[href]')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
    expect(link.attributes('aria-label')).toContain('opens in new tab')
  })
})
