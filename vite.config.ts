import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import hotReloadBackground from './scripts/hot-reload/background'
import { __DEV__, outputDir } from './const'
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export const r = (...args: string[]) => resolve(__dirname, '.', ...args)

export const commonConfig = {
  root: r('src'),
  define: {
    __DEV__,
  },
  resolve: {
    alias: {
      '~/': `${r('src')}/`,
      '@/': `${r('src')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/index.scss";'
      }
    }
  },
  plugins: [
    Vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue','src/**/*.ts']
    })
  ],
}

export default defineConfig({
  ...commonConfig,
  build: {
    watch: __DEV__ ? {} : null,
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: true,
    outDir: r(outputDir),
    rollupOptions: {
      input: {
        background: r('src/background/index.ts'),
        popup: r('src/popup/index.ts')
      },
      output: {
        assetFileNames: '[name].[ext]',
        entryFileNames: '[name]/index.js',
        extend: true,
        format: 'es',
      },
    },
  },
  plugins: [
    ...commonConfig.plugins,
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    hotReloadBackground()
  ]
})
