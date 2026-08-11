import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
        terms: resolve(__dirname, 'terms/index.html'),
        tournament: resolve(__dirname, 'tournament/index.html'),
        match: resolve(__dirname, 'match/index.html'),
        turf: resolve(__dirname, 'turf/index.html'),
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'framer-motion',
      'lucide-react',
      'react-countup',
      'react-icons',
      'clsx',
      'bootstrap',
    ],
  },
  server: {
    port: 5173,
    host: true,
  },
})
