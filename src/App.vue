<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <header class="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center gap-6">
        <span class="text-lg font-bold text-white flex-1 select-none">Vue 3 + Tailwind</span>
        <nav aria-label="Main navigation">
          <!-- eslint-disable-next-line vuejs-accessibility/no-redundant-roles -- list-none removes Safari/VoiceOver list semantics; role="list" restores them -->
          <ul class="flex gap-6 list-none p-0 m-0" role="list">
            <li>
              <RouterLink
                to="/"
                class="text-white/90 hover:text-white transition-colors font-medium rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                active-class="text-white underline underline-offset-4"
              >Home</RouterLink>
            </li>
            <li>
              <RouterLink
                to="/components"
                class="text-white/90 hover:text-white transition-colors font-medium rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                active-class="text-white underline underline-offset-4"
              >Components</RouterLink>
            </li>
          </ul>
        </nav>
        <button
          @click="toggleDark"
          :aria-pressed="isDark"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          class="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
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
      </div>
    </header>
    <main id="main-content" class="flex-1">
      <RouterView />
    </main>
  </div>
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
