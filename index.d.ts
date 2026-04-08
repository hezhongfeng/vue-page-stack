declare module 'vue-page-stack' {
  import type { App, DefineComponent } from 'vue'
  import type { Router } from 'vue-router'

  export const VuePageStackPlugin: {
    install: (app: App, options: { router: Router }) => void
  }

  export const VuePageStack: DefineComponent<
    Record<string, never>,
    {},
    {},
    {},
    {},
    {},
    {},
    {
      back: () => void
      forward: () => void
    }
  >
}
