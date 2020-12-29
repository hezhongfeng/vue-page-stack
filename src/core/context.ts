import { VuePageStackContext } from 'src/type/interface'

let context: VuePageStackContext

export const setContext = (ctx: VuePageStackContext) => {
  context = ctx
}

export const useContext = () => {
  return context
}
