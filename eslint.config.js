import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import vueA11y from 'eslint-plugin-vuejs-accessibility'
import globals from 'globals'

export default [
  { ignores: ['**/*.d.ts', 'dist/**'] },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  ...vueA11y.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off', // App.vue is single-word
    },
  },
]
