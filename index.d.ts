declare module 'vue-page-stack' {
  import type { DefineComponent, Plugin } from 'vue'
  import type { Router } from 'vue-router'

  export interface VuePageStackPluginOptions {
    router: Router
  }

  export interface VuePageStackEvents {
    back: () => void
    forward: () => void
  }

  export const VuePageStackPlugin: Plugin<[VuePageStackPluginOptions]>

  export const VuePageStack: DefineComponent<
    Record<string, never>,
    {},
    {},
    {},
    {},
    {},
    {},
    VuePageStackEvents
  >
}
