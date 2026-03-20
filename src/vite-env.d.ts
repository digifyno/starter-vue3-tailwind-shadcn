/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

interface ImportMetaEnv {
  readonly VITE_HUB_TOKEN: string | undefined
  readonly VITE_HUB_URL: string | undefined
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
