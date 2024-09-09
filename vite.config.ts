import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import UnoCSS from "unocss/vite"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

// https://vitejs.dev/config/
export default defineConfig(({ mode, command, ssrBuild }) => {
  const { VITE_APP_ENV } = loadEnv(mode, process.cwd())
  return {
    plugins: [
      react(),
      UnoCSS(),
      // 处理svg，生成svg雪碧图
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons/svg")],
        symbolId: "icon-[dir]-[name]"
      })
    ],
    server: {
      open: true,
      host: true,
      port: 7777,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        "/dev-api": {
          // 开发环境
          // target: 'http://192.168.2.109:8080',
          // 测试环境
          target: "https://egs3.yuncanglian.com/prod-api",
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, "")
        }
      }
    },
    resolve: {
      alias: {
        // 设置路径
        "~": path.resolve(__dirname, "./"),
        // 设置别名
        "@": path.resolve(__dirname, "./src")
      }
    },
    preprocessorOptions: {
      less: {}
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString()
            }
          }
        }
      }
    },
    esbuild: {
      drop: VITE_APP_ENV === "production" ? ["console", "debugger"] : []
    }
  }
})
