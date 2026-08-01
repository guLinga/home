import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 自定义域名部署在站点根路径；未绑定时也可用仓库 Pages
export default defineConfig({
  base: '/',
  plugins: [react()],
})
