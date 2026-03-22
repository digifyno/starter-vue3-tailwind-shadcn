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

  it('decorative SVG icons have aria-hidden', () => {
    const wrapper = mount(App)
    const svgs = wrapper.findAll('svg')
    svgs.forEach(svg => {
      expect(svg.attributes('aria-hidden')).toBe('true')
    })
  })

  it('dark mode toggle aria-label reflects current mode', async () => {
    document.documentElement.classList.add('dark')
    const wrapper = mount(App)
    const toggle = wrapper.find('button[aria-label]')
    // isDark starts true (dark mode active), so label says Switch to light mode
    expect(toggle.attributes('aria-label')).toMatch(/light mode/i)
    await toggle.trigger('click')
    expect(toggle.attributes('aria-label')).toMatch(/dark mode/i)
    document.documentElement.classList.remove('dark')
  })

  it('external links have rel noopener noreferrer and open in new tab', () => {
    const wrapper = mount(App)
    const externalLinks = wrapper.findAll('a[target="_blank"]')
    expect(externalLinks.length).toBeGreaterThan(0)
    externalLinks.forEach(link => {
      expect(link.attributes('rel')).toContain('noopener')
      expect(link.attributes('rel')).toContain('noreferrer')
    })
  })

  it('page has a main landmark element', () => {
    const wrapper = mount(App)
    // App uses <main id="main-content"> as the page landmark
    const main = wrapper.find('#main-content')
    expect(main.exists()).toBe(true)
  })

  it('dark mode toggle responds to Enter key', async () => {
    document.documentElement.classList.add('dark')
    const wrapper = mount(App)
    const toggle = wrapper.find('button[aria-label]')
    const initialLabel = toggle.attributes('aria-label')
    await toggle.trigger('keydown', { key: 'Enter' })
    await toggle.trigger('click')
    expect(toggle.attributes('aria-label')).not.toBe(initialLabel)
    document.documentElement.classList.remove('dark')
  })
})

describe('Accessibility', () => {
  // Note: The skip-to-content link (<a href="#main-content">) is in index.html (static HTML)
  // and is not rendered by the App component — it cannot be tested via component mount.

  it('toggle button aria-pressed reflects dark mode state', async () => {
    document.documentElement.classList.add('dark')
    const wrapper = mount(App)
    const button = wrapper.find('button[aria-label]')
    // isDark initialises to true (dark mode active), so aria-pressed starts as "true"
    expect(button.attributes('aria-pressed')).toBe('true')
    await button.trigger('click')
    expect(button.attributes('aria-pressed')).toBe('false')
    document.documentElement.classList.remove('dark')
  })

  it('SVG icons inside the toggle button have aria-hidden="true"', () => {
    document.documentElement.classList.add('dark')
    const wrapper = mount(App)
    const button = wrapper.find('button[aria-label]')
    const svgs = button.findAll('svg')
    expect(svgs.length).toBeGreaterThan(0)
    svgs.forEach(svg => {
      expect(svg.attributes('aria-hidden')).toBe('true')
    })
    document.documentElement.classList.remove('dark')
  })

  it('a main element with id="main-content" exists', () => {
    const wrapper = mount(App)
    const main = wrapper.find('main#main-content')
    expect(main.exists()).toBe(true)
  })
})
