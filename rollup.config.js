import ts from '@wessberg/rollup-plugin-ts';

export default {
  input: './src/index.ts',
  plugins: [
    ts({
      browserslist: ['last 2 version', '> 1%']
    })
  ],
  output: [
    {
      // CommonJS
      format: 'cjs',
      file: 'dist/vue-page-stack.common.js'
    },
    // umd
    {
      format: 'umd',
      file: 'dist/vue-page-stack.umd.js'
    }
  ]
};
