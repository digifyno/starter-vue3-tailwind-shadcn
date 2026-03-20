import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { reportError } from './error-tracking'

const app = createApp(App)

app.config.errorHandler = (err, _instance, info) => {
  reportError(err as Error, { vueInfo: info })
  console.error(err)
}

window.addEventListener('unhandledrejection', (event) => {
  reportError(new Error(String(event.reason)), { type: 'unhandledrejection' })
})

app.mount('#app')
