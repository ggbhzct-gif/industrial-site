import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { cloudflare } from "@cloudflare/vite-plugin";

const STATIC_SLUGS = [
  // 城市页
  'shanghai','suzhou','kunshan','wuxi','changzhou','nanjing',
  'hangzhou','ningbo','jiaxing','huzhou',
  'hefei','wuhu','maanshan','chuzhou',
  // 业务中枢页
  'cable-recycling','transformer-recycling','factory-demolition',
]

// dev-only：把 /<slug>/ 重写到 /<slug>/index.html，避免 SPA fallback 覆盖
const cityPagesDev = () => ({
  name: 'static-pages-dev-rewrite',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const m = req.url && req.url.match(/^\/([a-z-]+)\/(\?.*)?$/i)
      if (m && STATIC_SLUGS.includes(m[1])) {
        req.url = `/${m[1]}/index.html${m[2] || ''}`
      }
      next()
    })
  },
})

export default defineConfig({
  plugins: [react(), tailwindcss(), cityPagesDev(), cloudflare()],
})