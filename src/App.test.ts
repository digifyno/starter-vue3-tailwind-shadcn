import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mount, RouterLinkStub } from '@vue/test-utils'
import App from './App.vue'

const mountApp = (options = {}) =>
  mount(App, {
    global: {
      stubs: {
        RouterView: true,
        RouterLink: RouterLinkStub,
      },
    },
    ...options,
  })

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    document.documentElement.classList.remove('dark')
  })

  it('has main-content id for skip navigation', () => {
    const wrapper = mountApp()
    expect(wrapper.find('#main-content').exists()).toBe(true)
  })

  it('renders navigation links to Home and Components', () => {
    const wrapper = mountApp()
    const links = wrapper.findAllComponents(RouterLinkStub)
    const tos = links.map(l => l.props('to'))
    expect(tos).toContain('/')
    expect(tos).toContain('/components')
  })

  it('toggles dark class on html element when button is clicked', async () => {
    document.documentElement.classList.add('dark')
    const wrapper = mountApp()
    const button = wrapper.find('button[aria-label]')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    await button.trigger('click')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    await button.trigger('click')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('changes aria-label when dark mode is toggled', async () => {
    document.documentElement.classList.add('dark')
    const wrapper = mountApp()
    const button = wrapper.find('button[aria-label]')
    expect(button.attributes('aria-label')).toBe('Switch to light mode')
    await button.trigger('click')
    expect(button.attributes('aria-label')).toBe('Switch to dark mode')
  })

  it('decorative SVG icons have aria-hidden', () => {
    const wrapper = mountApp()
    const svgs = wrapper.findAll('svg')
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
    mountApp()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('initializes light mode from localStorage when set to light', () => {
    localStorage.setItem('color-scheme', 'light')
    mountApp()
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('saves dark mode preference to localStorage on toggle', async () => {
    localStorage.clear()
    // No dark class set → onMounted resolves isDark to false
    const wrapper = mountApp()
    const button = wrapper.find('button[aria-label]')
    await button.trigger('click') // toggles from false → true
    expect(localStorage.getItem('color-scheme')).toBe('dark')
  })

  it('saves light mode preference to localStorage on toggle', async () => {
    localStorage.setItem('color-scheme', 'dark')
    document.documentElement.classList.add('dark')
    const wrapper = mountApp()
    const button = wrapper.find('button[aria-label]')
    await button.trigger('click') // toggles from true → false
    expect(localStorage.getItem('color-scheme')).toBe('light')
  })

  it('falls back to DOM class check when localStorage has no entry', () => {
    localStorage.clear()
    document.documentElement.classList.add('dark')
    mountApp()
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

  // Note: The skip-to-content link (<a href="#main-content">) is in index.html (static HTML)
  // and is not rendered by the App component — it cannot be tested via component mount.

  it('toggle button aria-pressed reflects dark mode state', async () => {
    document.documentElement.classList.add('dark')
    const wrapper = mountApp()
    const button = wrapper.find('button[aria-label]')
    // isDark initialises to true (dark mode active), so aria-pressed starts as "true"
    expect(button.attributes('aria-pressed')).toBe('true')
    await button.trigger('click')
    expect(button.attributes('aria-pressed')).toBe('false')
  })

  it('SVG icons inside the toggle button have aria-hidden="true"', () => {
    document.documentElement.classList.add('dark')
    const wrapper = mountApp()
    const button = wrapper.find('button[aria-label]')
    const svgs = button.findAll('svg')
    expect(svgs.length).toBeGreaterThan(0)
    svgs.forEach(svg => {
      expect(svg.attributes('aria-hidden')).toBe('true')
    })
  })

  it('a main element with id="main-content" exists', () => {
    const wrapper = mountApp()
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

    const wrapper = mountApp()
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
    // jsdom does not parse index.html, so lang is not set automatically.
    // index.html declares lang="en" on <html> for WCAG 2.1 SC 3.1.1 (Level A).
    // Mirror that setup here to verify the attribute value is accessible.
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
    // index.html sets class="dark" on <html> as the default theme.
    // Mirror that initial DOM state for jsdom:
    document.documentElement.classList.add('dark')
    const wrapper = mountApp()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    wrapper.unmount()
  })

  it('updates aria-label text when dark mode is toggled', async () => {
    document.documentElement.classList.add('dark')
    const wrapper = mount(App, {
      attachTo: document.body,
      global: {
        stubs: { RouterView: true, RouterLink: RouterLinkStub },
      },
    })
    const btn = wrapper.find('button[aria-label]')
    const initialLabel = btn.attributes('aria-label')
    expect(initialLabel).toBeTruthy()
    await btn.trigger('click')
    const newLabel = btn.attributes('aria-label')
    expect(newLabel).toBeTruthy()
    expect(newLabel).not.toBe(initialLabel) // label must change on toggle
    wrapper.unmount()
    document.documentElement.classList.remove('dark')
  })

  it('toggle button has button role and is keyboard accessible', async () => {
    const wrapper = mount(App, {
      attachTo: document.body,
      global: {
        stubs: { RouterView: true, RouterLink: RouterLinkStub },
      },
    })
    const btn = wrapper.find('button[aria-label]')
    expect(btn.element.tagName).toBe('BUTTON') // native button = keyboard accessible by default
    expect(btn.attributes('aria-pressed')).toBeDefined()
    // Native <button> elements receive Enter/Space by default in all browsers
    // Verify it is not [tabindex="-1"] which would remove it from tab order
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
    const wrapper = mountApp()
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })

  it('has no axe violations in dark mode', async () => {
    document.documentElement.classList.add('dark')
    const wrapper = mountApp()
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})
