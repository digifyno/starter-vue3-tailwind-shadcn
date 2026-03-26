<template>
  <div
    class="rounded-lg border border-border bg-card text-card-foreground shadow-sm overflow-hidden"
    :class="{ 'opacity-50 pointer-events-none': disabled }"
    :aria-disabled="disabled || undefined"
  >
    <div v-if="title || $slots.header" class="border-b border-border px-6 py-4 bg-primary/5">
      <slot name="header">
        <h2 class="text-lg font-semibold text-foreground">{{ title }}</h2>
      </slot>
    </div>
    <div class="px-6 py-5">
      <p v-if="description" class="text-sm text-muted-foreground mb-4">{{ description }}</p>
      <slot />
    </div>
    <div v-if="$slots.footer" class="border-t border-border px-6 py-4 bg-muted/30">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
    disabled?: boolean
  }>(),
  {
    disabled: false,
  }
)
</script>
