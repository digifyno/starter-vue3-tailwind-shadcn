import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'color-scheme'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(true)

  onMounted(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    isDark.value = stored !== null ? stored === 'dark' : document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', isDark.value)
  })

  function toggleDark() {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
  }

  return { isDark, toggleDark }
})
