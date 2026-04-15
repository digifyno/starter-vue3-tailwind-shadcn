<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-foreground mb-2">Component Gallery</h1>
    <p class="text-muted-foreground mb-8">A showcase of available UI components and their variants.</p>

    <section aria-labelledby="cards-heading" class="mb-10">
      <h2 id="cards-heading" class="text-xl font-semibold text-foreground mb-4">Cards</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <WelcomeCard title="Default Card" description="A standard card with title and description." />
        <WelcomeCard title="Card with Footer" description="This card includes a footer slot.">
          <template #footer>
            <p class="text-sm text-muted-foreground">Footer content here</p>
          </template>
        </WelcomeCard>
        <WelcomeCard>
          <template #header>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-green-500" aria-hidden="true"></span>
              <h2 class="text-lg font-semibold text-foreground">Custom Header</h2>
            </div>
          </template>
          <p class="text-sm text-muted-foreground">Card with a custom header slot.</p>
        </WelcomeCard>
        <WelcomeCard title="Disabled Card" description="This card is disabled." :disabled="true" />
      </div>
    </section>

    <section aria-labelledby="buttons-heading" class="mb-10">
      <h2 id="buttons-heading" class="text-xl font-semibold text-foreground mb-4">Buttons</h2>
      <div class="flex flex-wrap gap-3">
        <button class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
          Default
        </button>
        <button class="px-4 py-2 bg-destructive text-white rounded-md hover:bg-destructive/90 transition-colors font-medium text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
          Destructive
        </button>
        <button class="px-4 py-2 border border-border bg-background text-foreground rounded-md hover:bg-secondary transition-colors font-medium text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
          Outline
        </button>
        <button class="px-4 py-2 text-foreground rounded-md hover:bg-secondary transition-colors font-medium text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
          Ghost
        </button>
      </div>
    </section>

    <section aria-labelledby="badges-heading">
      <h2 id="badges-heading" class="text-xl font-semibold text-foreground mb-4">Badges</h2>
      <div class="flex flex-wrap gap-2">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
          Default
        </span>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
          Secondary
        </span>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive text-white">
          Destructive
        </span>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-border text-foreground">
          Outline
        </span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import WelcomeCard from '@/components/WelcomeCard.vue'
</script>
