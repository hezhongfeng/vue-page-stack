// import { nodeResolve } from '@rollup/plugin-node-resolve'
import merge from 'webpack-merge'

import { commonConfig, outputConfig } from './rollup.config.common'

const devConfig = {
  output: outputConfig.es,
  watch: {
    clearScreen: true,
    include: 'src/**',
    exclude: 'node_modules/**'
  }
}

export default merge({}, commonConfig, devConfig)
