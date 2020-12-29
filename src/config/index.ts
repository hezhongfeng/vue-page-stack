import { pick } from 'src/lib/utils'
import { VuePageStackConfig } from 'src/type/interface'

import { COMPONENT_NAME, KEY_NAME } from './constant'

const defaultConfig: VuePageStackConfig = {
  keyName: KEY_NAME,
  componentName: COMPONENT_NAME
}

let config: VuePageStackConfig

export const setConfig = (options: Partial<VuePageStackConfig>) => {
  config = {
    ...defaultConfig,
    ...pick(options, 'keyName', 'componentName')
  }
}

export const useConfig = () => {
  return config
}
