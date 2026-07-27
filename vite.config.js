import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'framer-motion',
      'lucide-react',
      'react-router-dom',
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
