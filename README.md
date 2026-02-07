# Vue 3 + Tailwind CSS Starter Template

A modern, production-ready starter template with Vue 3, Tailwind CSS, TypeScript, and Vite.

## Features

- **Vue 3** - Composition API with `<script setup>`
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Full type safety
- **Vite** - Lightning-fast HMR and builds
- **shadcn-vue Ready** - Pre-configured design system variables

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── src/
│   ├── App.vue          # Root component
│   ├── main.ts          # App entry point
│   ├── style.css        # Tailwind directives & theme
│   └── vite-env.d.ts    # TypeScript declarations
├── index.html           # HTML entry point
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
├── tsconfig.json        # TypeScript config
└── package.json
```

## Customization

### Theme Colors
Edit `src/style.css` to customize the color palette. Colors are defined using HSL CSS variables for easy light/dark mode switching.

### Tailwind Configuration
Modify `tailwind.config.js` to add custom utilities, plugins, or extend the theme.

### Dark Mode
The template includes dark mode by default. Toggle by adding/removing the `dark` class on the `<html>` element.

## Adding shadcn-vue Components

This template is ready for shadcn-vue components. To add components:

```bash
npx shadcn-vue@latest add button
npx shadcn-vue@latest add card
```

Components will be added to `src/components/ui/` and are fully customizable.

## Learn More

- [Vue 3 Documentation](https://vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [shadcn-vue Documentation](https://www.shadcn-vue.com/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## License

MIT
