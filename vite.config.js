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
          const path = url.pathname;
          
          if (path.startsWith('/privacy-policy') || path === '/privacy') {
            req.url = '/privacy/index.html';
          } else if (path.startsWith('/terms-and-conditions') || path === '/terms') {
            req.url = '/terms/index.html';
          } else if (path.startsWith('/search') && !path.includes('.')) {
            req.url = '/search/index.html';
          } else if (path.startsWith('/dashboard') && !path.includes('.')) {
            req.url = '/dashboard/index.html';
          } else if (path.startsWith('/turf/') && !path.includes('.')) {
            req.url = '/turf/index.html';
          } else if (path.startsWith('/player/') && !path.includes('.')) {
            req.url = '/player/index.html';
          } else if (path.startsWith('/match/') && !path.includes('.')) {
            req.url = '/match/index.html';
          } else if (path.startsWith('/tournament/') && !path.includes('.')) {
            req.url = '/tournament/index.html';
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
        player: resolve(__dirname, 'player/index.html'),
        search: resolve(__dirname, 'search/index.html'),
        dashboard: resolve(__dirname, 'dashboard/index.html'),
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
