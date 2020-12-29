import { Action } from 'src/config/enum'

import { setAction } from './action'
import { useContext } from './context'

/**
 * 包装一层 router api，用于跟踪执行的动作
 */
export const initRouterProxy = () => {
  const { app, router } = useContext()

  const routerPush = router.push.bind(router)
  const routerGo = router.go.bind(router)
  const routerReplace = router.replace.bind(router)
  const routerBack = router.back.bind(router)
  const routerForward = router.forward.bind(router)

  // 还没安装 vue-router
  if (!app.config.globalProperties.$router) {
    app.use(router)
  }

  router.push = to => {
    setAction(Action.PUSH)
    return routerPush(to)
  }

  router.go = n => {
    setAction(Action.GO)
    routerGo(n)
  }

  router.replace = to => {
    setAction(Action.REPLACE)
    return routerReplace(to)
  }

  router.back = () => {
    setAction(Action.BACK)
    routerBack()
  }

  router.forward = () => {
    setAction(Action.FORWARD)
    routerForward()
  }
}
