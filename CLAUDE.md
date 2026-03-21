# Vue 3 + Tailwind CSS Starter - Claude Development Guide

## Stack

- **Vue 3.4+** with Composition API (`<script setup>`)
- **Tailwind CSS 4** - Utility-first CSS (via `@tailwindcss/vite` plugin)
- **TypeScript 5.9+** in strict mode
- **Vite 7** - Build tool with HMR

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Type check without building
npm run typecheck

# Build for production
npm run build

# Preview production build
npm run preview

# Run unit tests (vitest)
npm test

# Lint source files
npm run lint

# Auto-fix lint issues
npm run lint:fix

```

## Project Structure

```
eslint.config.js  # ESLint config (vue3-essential + a11y rules)
public/
└── favicon.svg      # Site favicon

src/
├── App.vue                  # Root component (includes dark mode toggle)
├── App.test.ts              # Component tests (vitest + @vue/test-utils)
├── error-tracking.ts        # Client Error Intelligence Hub integration (no-op in dev)
├── error-tracking.test.ts   # Unit tests for error-tracking integration
├── main.ts                  # Entry point
├── style.css                # Tailwind directives + theme variables
└── vite-env.d.ts            # Type declarations (strict, no any)
```

## Key Patterns

### Component Structure
```vue
<template>
  <div class="p-4 bg-primary text-primary-foreground rounded-lg">
    <h1 class="text-2xl font-bold">{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const title = ref('Hello World')
</script>
```

### Tailwind Utilities
- **Layout**: `flex`, `grid`, `container`, `mx-auto`
- **Spacing**: `p-4`, `m-2`, `space-y-4`, `gap-4`
- **Typography**: `text-xl`, `font-bold`, `text-center`
- **Colors**: Use semantic tokens like `bg-primary`, `text-muted-foreground`
- **Dark Mode**: `dark:bg-gray-800`, `dark:text-white`

### Theme Variables
Colors are defined as CSS variables in `src/style.css`:
- `--background`, `--foreground` - Page background/text
- `--primary`, `--primary-foreground` - Primary action colors
- `--secondary`, `--muted`, `--accent` - Secondary UI elements
- `--destructive` - Error/danger states
- `--border`, `--input`, `--ring` - Form controls

Access via Tailwind: `bg-primary`, `text-foreground`, `border-border`

### Dark Mode
`App.vue` includes a working dark mode toggle button. The pattern uses an `isDark` ref synced to the `<html>` element's `dark` class:

```typescript
import { ref, onMounted } from 'vue'

// Initializes to true because index.html sets class="dark" on <html>.
// onMounted syncs the ref to actual DOM state.
const isDark = ref(true)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
```

The toggle button uses `v-if="isDark"` to swap between sun and moon icons and sets `aria-label` dynamically for accessibility.

> **Note:** The initial `ref(true)` assumes dark mode is the default (set by `class="dark"` on `<html>` in `index.html`). If you remove that class, change the initial value to `false`.

## Security

### Content Security Policy
`index.html` includes a CSP `<meta>` tag restricting resource loading to `'self'` (with `unsafe-inline` for Tailwind runtime styles in dev mode):

```html
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self';">
```

### HTML Language Attribute
`index.html` sets `lang="en"` on the `<html>` element, satisfying WCAG 2.1 SC 3.1.1 (Level A) so screen readers select the correct voice profile automatically.

### Type Safety
`src/vite-env.d.ts` uses strict `DefineComponent` without `any` type parameters to avoid unsafe widening of Vue component types.

## Testing

Tests use **Vitest** with `@vue/test-utils` and `jsdom`. Run with `npm test`. Test files follow the `*.test.ts` pattern alongside source files.

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'

describe('App', () => {
  it('renders h1 with text', () => {
    const wrapper = mount(App)
    expect(wrapper.find('h1').text()).toContain('Vue 3')
  })
})
```

Vitest is configured in `vite.config.ts` with `environment: 'jsdom'` and `globals: true`.

## Adding Features

### New Components
Create `.vue` files in `src/components/` and import them:
```typescript
import MyComponent from '@/components/MyComponent.vue'
```

### shadcn-vue Components
```bash
npx shadcn-vue@latest init
npx shadcn-vue@latest add button
npx shadcn-vue@latest add card
```

### Routing (Vue Router)
```bash
npm install vue-router@4
```

### State Management (Pinia)
```bash
npm install pinia
```

### Icons (Lucide)
```bash
npm install lucide-vue-next
```

## Tailwind Plugins

Tailwind CSS 4 uses the Vite plugin (`@tailwindcss/vite`) instead of `tailwind.config.js`. Install plugins as npm packages and import them in your CSS:
```css
/* src/style.css */
@import "tailwindcss";
@plugin "@tailwindcss/forms";
@plugin "@tailwindcss/typography";
```

## Common Utility Patterns

### Responsive Design
```vue
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- Mobile: 100%, Tablet: 50%, Desktop: 33% -->
</div>
```

### Hover/Focus States
```vue
<button class="bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-ring">
  Click me
</button>
```

### Flexbox Centering
```vue
<div class="flex items-center justify-center min-h-screen">
  <p>Centered content</p>
</div>
```

## Production Build

```bash
npm run build
# Output: dist/
```

Serve `dist/` with any static file server (nginx, Vercel, Netlify, etc.).

Build targets `es2022` (Chrome 94+, Firefox 93+, Safari 16+) with source maps enabled for production debugging.

## Resources

- [Tailwind CSS Utilities](https://tailwindcss.com/docs)
- [shadcn-vue Components](https://www.shadcn-vue.com/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)


## Error Tracking

Runtime errors are reported to the Client Error Intelligence Hub (production only). Configure via env vars:

- `VITE_HUB_TOKEN` — RSI Hub WorkerHub token (required to enable reporting)
- `VITE_HUB_URL` — Hub base URL (e.g., `https://rsi.digify.no`)

Implementation: `src/error-tracking.ts`. Captures:
- Unhandled Vue component errors (via `app.config.errorHandler`)
- Unhandled promise rejections (via `window.addEventListener('unhandledrejection', ...)`)

Error reporting is a no-op when `VITE_HUB_TOKEN` is not set or when running in development — no console noise, no errors thrown.
