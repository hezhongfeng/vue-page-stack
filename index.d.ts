declare module 'vue-page-stack' {
  import type { DefineComponent, Plugin, VNode } from 'vue'
  import type { Router } from 'vue-router'

  export interface VuePageStackPluginOptions {
    router: Router
  }

  export interface VuePageStackEvents {
    back: () => void
    forward: () => void
  }

  export interface VuePageStackSlots {
    default?: () => VNode | VNode[]
  }

  export type VuePageStackEventName = keyof VuePageStackEvents

  export type VuePageStackComponent = DefineComponent<
    Record<string, never>,
    {},
    {},
    {},
    {},
    {},
    {},
    VuePageStackEvents
  >

  export const VuePageStackPlugin: Plugin<[VuePageStackPluginOptions]>
  export const VuePageStack: VuePageStackComponent
}
