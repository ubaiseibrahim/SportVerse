import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-rewrite-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
          if (url.pathname === '/privacy-policy' || url.pathname === '/privacy-policy/') {
            req.url = '/privacy/index.html';
          } else if (url.pathname === '/terms' || url.pathname === '/terms/') {
            req.url = '/terms/index.html';
          }
          next();
        });
      }
    }
  ],
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
