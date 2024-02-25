import { fileURLToPath, URL } from 'url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite 配置
    define: {
      __APP_ENV__: env.APP_ENV
    },
    server: {
      proxy: {
        //api是自行设置的请求前缀，任何请求路径以/api开头的请求将被代理到对应的target目标
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE, //目标域名
          changeOrigin: true, //需要代理跨域
          rewrite: (path) => path.replace(env.VITE_APP_BASE_API, '') //路径重写，把'/api'替换为''
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue'],
        // 生成自动导入的TS声明文件
        // dts: './auto-imports.d.ts',
        // resolvers: [
        //   ElementPlusResolver(),
        //   // 自动导入图标组件
        //   IconsResolver({
        //     prefix: 'Icon'
        //   })
        // ],
        eslintrc: {
          enabled: false // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
        }
      }),
      Components({
        resolvers: [VantResolver()]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
