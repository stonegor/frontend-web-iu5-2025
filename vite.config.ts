import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: '/frontend-web-iu5-2025/',
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg', 'AuthorPlaceholder.png'],
      manifest: {
        name: 'Author Predictor',
        short_name: 'AuthorAI',
        description: 'Predict authors from text analysis',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
    // },
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://192.168.1.2:8000',
        changeOrigin: true,
      },
    },
  },
}))