<template>
  <div class="max-w-4xl mx-auto p-8 space-y-10">
    <h1 class="text-3xl font-bold text-foreground">Component Gallery</h1>

    <!-- Buttons -->
    <section aria-labelledby="buttons-heading">
      <h2 id="buttons-heading" class="text-xl font-semibold text-foreground mb-4">Buttons</h2>
      <div class="flex flex-wrap gap-3">
        <button class="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Default
        </button>
        <button class="px-4 py-2 bg-destructive text-white rounded-md font-medium hover:bg-destructive/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Destructive
        </button>
        <button class="px-4 py-2 border border-border bg-transparent text-foreground rounded-md font-medium hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Outline
        </button>
        <button class="px-4 py-2 bg-transparent text-foreground rounded-md font-medium hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Ghost
        </button>
      </div>
    </section>

    <!-- Badges -->
    <section aria-labelledby="badges-heading">
      <h2 id="badges-heading" class="text-xl font-semibold text-foreground mb-4">Badges</h2>
      <div class="flex flex-wrap gap-3">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
          Default
        </span>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive text-white">
          Destructive
        </span>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-border text-foreground">
          Outline
        </span>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
          Secondary
        </span>
      </div>
    </section>

    <!-- Card -->
    <section aria-labelledby="card-heading">
      <h2 id="card-heading" class="text-xl font-semibold text-foreground mb-4">Card</h2>
      <div class="bg-card border border-border rounded-lg shadow-sm overflow-hidden max-w-sm">
        <div class="px-6 py-4 border-b border-border bg-muted/30">
          <h3 class="font-semibold text-foreground">Card Header</h3>
          <p class="text-sm text-muted-foreground">Optional header slot content</p>
        </div>
        <div class="px-6 py-4">
          <p class="text-foreground">
            This is the main card body. It accepts any content via the default slot.
          </p>
        </div>
        <div class="px-6 py-4 border-t border-border bg-muted/30 flex justify-end gap-2">
          <button class="px-3 py-1.5 text-sm border border-border bg-transparent text-foreground rounded-md hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Cancel
          </button>
          <button class="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Confirm
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
