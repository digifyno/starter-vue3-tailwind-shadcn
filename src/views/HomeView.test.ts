import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import { mount } from '@vue/test-utils'
import HomeView from './HomeView.vue'

describe('HomeView', () => {
  it('renders h1 with text', () => {
    const wrapper = mount(HomeView)
    const h1 = wrapper.find('h1')
    expect(h1.exists()).toBe(true)
    expect(h1.text()).toContain('Vue 3')
  })

  it('renders feature items with data-testid', () => {
    const wrapper = mount(HomeView)
    const items = wrapper.findAll('[data-testid="feature-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('documentation link has correct rel and target attributes', () => {
    const wrapper = mount(HomeView)
    const link = wrapper.find('a[href]')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
    expect(link.attributes('aria-label')).toContain('opens in new tab')
  })

  it('external links have rel noopener noreferrer and open in new tab', () => {
    const wrapper = mount(HomeView)
    const externalLinks = wrapper.findAll('a[target="_blank"]')
    expect(externalLinks.length).toBeGreaterThan(0)
    externalLinks.forEach(link => {
      expect(link.attributes('rel')).toContain('noopener')
      expect(link.attributes('rel')).toContain('noreferrer')
    })
  })

  it('decorative SVG icons have aria-hidden', () => {
    const wrapper = mount(HomeView)
    const svgs = wrapper.findAll('svg')
    svgs.forEach(svg => {
      expect(svg.attributes('aria-hidden')).toBe('true')
    })
  })

  it('has no axe violations', async () => {
    const wrapper = mount(HomeView)
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})
