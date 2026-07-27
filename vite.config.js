import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Explicitly pre-bundle these to avoid "file does not exist in optimize deps" errors
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
    ],
  },
  server: {
    port: 5173,
    host: true, // expose to local network
  },
})
