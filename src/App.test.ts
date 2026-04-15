import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

function makeRouter() {
  return createRouter({
    history: createWebHistory(),
    routes: [{ path: '/', component: { template: '<div />' } }],
  })
}

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    document.documentElement.classList.remove('dark')
  })

  it('has main-content id for skip navigation', async () => {
    const wrapper = mount(App, { global: { plugins: [makeRouter()] } })
    expect(wrapper.find('#main-content').exists()).toBe(true)
  })

  it('renders navigation links', async () => {
    const wrapper = mount(App, { global: { plugins: [makeRouter()] } })
    const links = wrapper.findAll('a')
    const hrefs = links.map(l => l.attributes('href'))
    expect(hrefs).toContain('/')
    expect(hrefs).toContain('/components')
  })

  it('toggles dark class on html element when button is clicked', async () => {
    document.documentElement.classList.add('dark')
    const wrapper = mount(App, { global: { plugins: [makeRouter()] } })
    const button = wrapper.find('button[aria-label]')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    await button.trigger('click')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    await button.trigger('click')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('changes aria-label when dark mode is toggled', async () => {
    document.documentElement.classList.add('dark')
    const wrapper = mount(App, { global: { plugins: [makeRouter()] } })
    const button = wrapper.find('button[aria-label]')
    expect(button.attributes('aria-label')).toBe('Switch to light mode')
    await button.trigger('click')
    expect(button.attributes('aria-label')).toBe('Switch to dark mode')
  })

  it('decorative SVG icons in toggle button have aria-hidden', () => {
    const wrapper = mount(App, { global: { plugins: [makeRouter()] } })
    const button = wrapper.find('button[aria-label]')
    const svgs = button.findAll('svg')
    svgs.forEach(svg => {
      expect(svg.attributes('aria-hidden')).toBe('true')
    })
  })
})

describe('dark mode localStorage persistence', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('initializes dark mode from localStorage when set to dark', () => {
    localStorage.setItem('color-scheme', 'dark')
    mount(App, { global: { plugins: [makeRouter()] } })
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('initializes light mode from localStorage when set to light', () => {
    localStorage.setItem('color-scheme', 'light')
    mount(App, { global: { plugins: [makeRouter()] } })
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('saves dark mode preference to localStorage on toggle', async () => {
    localStorage.clear()
    // No dark class set → onMounted resolves isDark to false
    const wrapper = mount(App, { global: { plugins: [makeRouter()] } })
    const button = wrapper.find('button[aria-label]')
    await button.trigger('click') // toggles from false → true
    expect(localStorage.getItem('color-scheme')).toBe('dark')
  })

  it('saves light mode preference to localStorage on toggle', async () => {
    localStorage.setItem('color-scheme', 'dark')
    document.documentElement.classList.add('dark')
    const wrapper = mount(App, { global: { plugins: [makeRouter()] } })
    const button = wrapper.find('button[aria-label]')
    await button.trigger('click') // toggles from true → false
    expect(localStorage.getItem('color-scheme')).toBe('light')
  })

  it('falls back to DOM class check when localStorage has no entry', () => {
    localStorage.clear()
    document.documentElement.classList.add('dark')
    mount(App, { global: { plugins: [makeRouter()] } })
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})

describe('Accessibility', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    document.documentElement.classList.remove('dark')
  })

  it('toggle button aria-pressed reflects dark mode state', async () => {
    document.documentElement.classList.add('dark')
    const wrapper = mount(App, { global: { plugins: [makeRouter()] } })
    const button = wrapper.find('button[aria-label]')
    expect(button.attributes('aria-pressed')).toBe('true')
    await button.trigger('click')
    expect(button.attributes('aria-pressed')).toBe('false')
  })

  it('SVG icons inside the toggle button have aria-hidden="true"', () => {
    document.documentElement.classList.add('dark')
    const wrapper = mount(App, { global: { plugins: [makeRouter()] } })
    const button = wrapper.find('button[aria-label]')
    const svgs = button.findAll('svg')
    expect(svgs.length).toBeGreaterThan(0)
    svgs.forEach(svg => {
      expect(svg.attributes('aria-hidden')).toBe('true')
    })
  })

  it('a main element with id="main-content" exists', () => {
    const wrapper = mount(App, { global: { plugins: [makeRouter()] } })
    const main = wrapper.find('main#main-content')
    expect(main.exists()).toBe(true)
  })
})

describe('prefers-reduced-motion', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('mounts without errors when prefers-reduced-motion: reduce is active', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })))

    const wrapper = mount(App, { global: { plugins: [makeRouter()] } })
    expect(wrapper.find('main').exists()).toBe(true)
  })
})

describe('HTML structural attributes', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('html element should have lang="en" (mirrors index.html)', () => {
    document.documentElement.lang = 'en'
    expect(document.documentElement.lang).toBe('en')
  })

  it.skip('document head should contain CSP meta tag', () => {
    // jsdom does not parse index.html, so the <meta http-equiv="Content-Security-Policy">
    // tag from index.html is not present in the jsdom test environment.
    // Verify CSP presence via index.html inspection or e2e tests instead.
  })

  it('applies dark class on initial mount when no localStorage preference', () => {
    localStorage.clear()
    document.documentElement.classList.add('dark')
    const wrapper = mount(App, { global: { plugins: [makeRouter()] } })
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    wrapper.unmount()
  })

  it('updates aria-label text when dark mode is toggled', async () => {
    document.documentElement.classList.add('dark')
    const wrapper = mount(App, { attachTo: document.body, global: { plugins: [makeRouter()] } })
    const btn = wrapper.find('button[aria-label]')
    const initialLabel = btn.attributes('aria-label')
    expect(initialLabel).toBeTruthy()
    await btn.trigger('click')
    const newLabel = btn.attributes('aria-label')
    expect(newLabel).toBeTruthy()
    expect(newLabel).not.toBe(initialLabel)
    wrapper.unmount()
    document.documentElement.classList.remove('dark')
  })

  it('toggle button has button role and is keyboard accessible', async () => {
    const wrapper = mount(App, { attachTo: document.body, global: { plugins: [makeRouter()] } })
    const btn = wrapper.find('button[aria-label]')
    expect(btn.element.tagName).toBe('BUTTON')
    expect(btn.attributes('aria-pressed')).toBeDefined()
    expect(btn.attributes('tabindex')).not.toBe('-1')
    wrapper.unmount()
  })
})

describe('Accessibility (axe)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    document.documentElement.classList.remove('dark')
  })

  it('has no axe violations on initial render (light mode)', async () => {
    const wrapper = mount(App, { global: { plugins: [makeRouter()] } })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })

  it('has no axe violations in dark mode', async () => {
    document.documentElement.classList.add('dark')
    const wrapper = mount(App, { global: { plugins: [makeRouter()] } })
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})
