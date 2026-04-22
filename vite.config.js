import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const CITY_SLUGS = [
  'shanghai','suzhou','kunshan','wuxi','changzhou','nanjing',
  'hangzhou','ningbo','jiaxing','huzhou',
  'hefei','wuhu','maanshan','chuzhou',
]

// dev-only：把 /<slug>/ 重写到 /<slug>/index.html，避免 SPA fallback 覆盖
const cityPagesDev = () => ({
  name: 'city-pages-dev-rewrite',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const m = req.url && req.url.match(/^\/([a-z]+)\/(\?.*)?$/i)
      if (m && CITY_SLUGS.includes(m[1])) {
        req.url = `/${m[1]}/index.html${m[2] || ''}`
      }
      next()
    })
  },
})

export default defineConfig({
  plugins: [react(), tailwindcss(), cityPagesDev()],
})
