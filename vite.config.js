import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import postCssPxToRem from 'postcss-pxtorem';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 37.5, // 换算的基数(设计图375的根字体为37.5)
          propList: ['*'],
        })
      ],
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://ml-test.aiwobeauty.com',
        // target: 'https://ml-pre.aiwobeauty.com',
        // target: 'https://ml.aiwobeauty.com',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
