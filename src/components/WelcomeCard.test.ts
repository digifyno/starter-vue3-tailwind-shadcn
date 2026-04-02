import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WelcomeCard from './WelcomeCard.vue'

describe('WelcomeCard', () => {
  it('renders title when provided', () => {
    const wrapper = mount(WelcomeCard, { props: { title: 'Hello World' } })
    expect(wrapper.find('h2').text()).toBe('Hello World')
  })

  it('renders description when provided', () => {
    const wrapper = mount(WelcomeCard, {
      props: { title: 'Test', description: 'A test description' },
    })
    expect(wrapper.find('p').text()).toBe('A test description')
  })

  it('omits description element when description prop is absent', () => {
    const wrapper = mount(WelcomeCard, { props: { title: 'No Desc' } })
    expect(wrapper.find('p').exists()).toBe(false)
  })

  it('renders default slot content', () => {
    const wrapper = mount(WelcomeCard, {
      props: { title: 'Card' },
      slots: { default: '<span data-testid="body">body content</span>' },
    })
    expect(wrapper.find('[data-testid="body"]').text()).toBe('body content')
  })

  it('renders footer slot when provided', () => {
    const wrapper = mount(WelcomeCard, {
      props: { title: 'Card' },
      slots: { footer: '<button>Action</button>' },
    })
    expect(wrapper.find('button').text()).toBe('Action')
  })

  it('omits footer section when footer slot is absent', () => {
    const wrapper = mount(WelcomeCard, { props: { title: 'Card' } })
    // footer div only renders when slot is provided
    const footerDivs = wrapper
      .findAll('div')
      .filter(d => d.classes().includes('bg-muted\\/30'))
    expect(footerDivs.length).toBe(0)
  })

  describe('disabled state', () => {
    it('adds opacity class when disabled prop is true', () => {
      const wrapper = mount(WelcomeCard, {
        props: { title: 'Disabled', disabled: true },
      })
      expect(wrapper.classes()).toContain('opacity-50')
    })

    it('sets aria-disabled when disabled', () => {
      const wrapper = mount(WelcomeCard, {
        props: { title: 'Disabled', disabled: true },
      })
      expect(wrapper.attributes('aria-disabled')).toBe('true')
    })

    it('does not set aria-disabled when enabled', () => {
      const wrapper = mount(WelcomeCard, { props: { title: 'Enabled' } })
      expect(wrapper.attributes('aria-disabled')).toBeUndefined()
    })

    it('root element has inert attribute when disabled', () => {
      const wrapper = mount(WelcomeCard, { props: { title: 'Disabled', disabled: true } })
      expect(wrapper.attributes('inert')).toBeDefined()
    })

    it('root element does not have inert attribute when enabled', () => {
      const wrapper = mount(WelcomeCard, { props: { title: 'Enabled' } })
      expect(wrapper.attributes('inert')).toBeUndefined()
    })
  })
})
