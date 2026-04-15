<template>
  <header class="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
    <nav class="mx-auto flex max-w-4xl items-center justify-between px-4 py-3" aria-label="Main navigation">
      <div class="flex items-center gap-6">
        <RouterLink
          to="/"
          class="font-semibold text-foreground hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/components"
          class="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded"
        >
          Components
        </RouterLink>
      </div>
      <button
        @click="toggleDark"
        :aria-pressed="isDark"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        class="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <!-- Sun icon: shown in dark mode to switch to light -->
        <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z">
          </path>
        </svg>
        <!-- Moon icon: shown in light mode to switch to dark -->
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z">
          </path>
        </svg>
      </button>
    </nav>
  </header>
  <main id="main-content" class="min-h-[calc(100vh-3.5rem)]">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'color-scheme'

const isDark = ref(true)

onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored !== null) {
    isDark.value = stored === 'dark'
  } else {
    isDark.value = document.documentElement.classList.contains('dark')
  }
  // Sync DOM to stored preference
  document.documentElement.classList.toggle('dark', isDark.value)
})

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
}
</script>
