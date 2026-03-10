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
vue-tsc --noEmit

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── App.vue          # Root component
├── main.ts          # Entry point
├── style.css        # Tailwind directives + theme variables
└── vite-env.d.ts    # Type declarations
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
Toggle dark mode by adding/removing `dark` class on `<html>`:
```typescript
document.documentElement.classList.toggle('dark')
```

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

## Resources

- [Tailwind CSS Utilities](https://tailwindcss.com/docs)
- [shadcn-vue Components](https://www.shadcn-vue.com/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
