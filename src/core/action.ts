import { Action } from 'src/config/enum'

const action = { value: Action.PUSH }

export const setAction = (value: Action) => {
  action.value = value
}

export const useAction = () => {
  return action
}
