import { useConfig } from 'src/config'
import { Action } from 'src/config/enum'
import { useAction } from 'src/core/action'
import { createKey, isEmpty } from 'src/lib/utils'

import { useContext } from './context'

export const initGuard = () => {
  const { keyName } = useConfig()
  const { router } = useContext()
  const action = useAction()
  router.beforeEach((to, from) => {
    if (isEmpty(to.query[keyName])) {
      to.query[keyName] = createKey()
      const replace =
        action.value === Action.REPLACE || isEmpty(from.query[keyName])
      return {
        hash: to.hash,
        path: to.path,
        name: to.name,
        params: to.params,
        query: to.query,
        meta: to.meta,
        replace: replace
        // force: replace
      }
    }
    return true
  })
}
