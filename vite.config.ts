import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { setupBuild } from './build'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    open: true,
    port: 3331,
    proxy: {
      '/web-scs-api': {
        target: 'http://43.136.23.105:9099', // 测试环境
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(new RegExp('^/web-scs-api'), '')
      },
      '/web-center-api': {
        target: 'http://43.136.23.105:9001', // 测试环境
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(new RegExp('^/web-center-api'), '')
      }
    }
  },
  build: setupBuild()
})
