import { terser } from 'rollup-plugin-terser'
import merge from 'webpack-merge'

import { commonConfig, outputConfig } from './rollup.config.common'

const prodConfig = {
  output: [outputConfig.es, outputConfig.cjs, outputConfig.umd].map(output => ({
    ...output,
    plugins: [terser()]
  }))
}

export default merge({}, commonConfig, prodConfig)
