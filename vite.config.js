import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project site: https://nonchxlantdev.github.io/visionforge-portfoliowebsite/
const repoBase = '/visionforge-portfoliowebsite/'

export default defineConfig(({ mode }) => ({
  // Local `vite` / `vite preview` use `/`; production builds use the repo base.
  base: mode === 'production' ? repoBase : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['motion/react', 'gsap', 'ogl'],
  },
  build: {
    target: 'es2022',
    cssMinify: true,
    sourcemap: false,
  },
}))
