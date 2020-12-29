import { App } from 'vue'
import { Router } from 'vue-router'

export type VuePageStackConfig = {
  /**
   * url 中的 key 参数标识
   */
  keyName: string

  /**
   * vue 组件的名称
   */
  componentName: string
}

export type VuePageStackOptions = Partial<VuePageStackConfig> & {
  /**
   * 路由实例
   */
  router: Router
}

export type VuePageStackContext = {
  app: App
  router: Router
}
