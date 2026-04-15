<template>
  <div class="max-w-4xl mx-auto px-6 py-12 space-y-10">
    <div>
      <h1 class="text-3xl font-bold text-white mb-2">Component Gallery</h1>
      <p class="text-slate-300">Example UI patterns built with Tailwind CSS and WelcomeCard.</p>
    </div>

    <WelcomeCard
      title="Button Variants"
      description="Common button styles using Tailwind utility classes."
    >
      <div class="flex flex-wrap gap-3">
        <button class="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Default
        </button>
        <button class="px-4 py-2 bg-destructive text-destructive-foreground font-medium rounded-md hover:bg-destructive/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Destructive
        </button>
        <button class="px-4 py-2 border border-border bg-transparent text-foreground font-medium rounded-md hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Outline
        </button>
        <button class="px-4 py-2 bg-transparent text-foreground font-medium rounded-md hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Ghost
        </button>
      </div>
    </WelcomeCard>

    <WelcomeCard
      title="Badge Variants"
      description="Status indicators for labelling items."
    >
      <div class="flex flex-wrap gap-3">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">Default</span>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">Secondary</span>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive text-destructive-foreground">Destructive</span>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-border text-foreground">Outline</span>
      </div>
    </WelcomeCard>

    <WelcomeCard description="A card demonstrating header and footer slots.">
      <template #header>
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <h2 class="text-lg font-semibold text-foreground">Card with Slots</h2>
        </div>
      </template>

      <p class="text-sm text-muted-foreground">
        The WelcomeCard component accepts <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">header</code>,
        default, and <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">footer</code> slots for flexible layouts.
      </p>

      <template #footer>
        <div class="flex justify-end gap-2">
          <button class="px-3 py-1.5 text-sm border border-border bg-transparent text-foreground rounded-md hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Cancel
          </button>
          <button class="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Confirm
          </button>
        </div>
      </template>
    </WelcomeCard>
  </div>
</template>

<script setup lang="ts">
import WelcomeCard from '@/components/WelcomeCard.vue'
</script>
