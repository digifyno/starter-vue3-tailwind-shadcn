<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <div class="max-w-2xl w-full mx-4">
      <div class="bg-card border border-border rounded-lg shadow-2xl overflow-hidden">
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center relative">
          <button
            @click="toggleDark"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            class="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
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
          <h1 class="text-4xl font-bold text-white mb-2">
            Vue 3 + Tailwind CSS
          </h1>
          <p class="text-blue-100">Modern utility-first CSS framework</p>
        </div>

        <div class="p-8">
          <div class="space-y-4">
            <div v-for="feature in features" :key="feature.title" data-testid="feature-item"
                 class="flex items-start space-x-3 p-4 rounded-md bg-secondary/50 hover:bg-secondary transition-colors">
              <div class="flex-shrink-0">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="font-semibold text-foreground">{{ feature.title }}</h3>
                <p class="text-sm text-muted-foreground">{{ feature.description }}</p>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-border">
            <div class="flex justify-center">
              <a href="https://tailwindcss.com/docs"
                 target="_blank"
                 rel="noopener noreferrer"
                 class="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors shadow-lg">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(true)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  }
})

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

const features = [
  {
    title: 'Vue 3 Composition API',
    description: 'Modern reactive framework with TypeScript support'
  },
  {
    title: 'Tailwind CSS Utilities',
    description: 'Rapidly build custom designs with utility classes'
  },
  {
    title: 'TypeScript Support',
    description: 'Full type safety and IntelliSense'
  },
  {
    title: 'Vite for Fast HMR',
    description: 'Lightning-fast development experience'
  }
]
</script>
