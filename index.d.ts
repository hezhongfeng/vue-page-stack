declare module 'vue-page-stack' {
  import type { Router } from 'vue-router'
  export const VuePageStackPlugin: {
    install: (app: any, options: { router: Router }) => void
  }
  export const VuePageStack: import('vue').DefineComponent<
    {
      onForward: () => void,
      onBack: () => void,
    }
  >
}

