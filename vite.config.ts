import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 项目页：https://guLinga.github.io/home/
export default defineConfig({
  base: '/home/',
  plugins: [react()],
})
