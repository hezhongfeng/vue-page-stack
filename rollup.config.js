import ts from '@wessberg/rollup-plugin-ts';
import { uglify } from 'rollup-plugin-uglify';

const config = {
  input: './src/index.ts',
  plugins: [
    ts({
      browserslist: ['last 2 version', '> 1%']
    }),
    uglify()
  ],
  output: [
    {
      // CommonJS
      format: 'cjs',
      file: 'dist/vue-page-stack.common.js'
    }
    // umd
    // {
    //   format: 'umd',
    //   file: 'dist/vue-page-stack.umd.js',
    //   name: 'VuePageStack'
    // }
  ]
};

export default config;
