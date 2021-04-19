import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/lib/index.ts'),
      name: 'VuePageStack',
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
    },
  },
});
