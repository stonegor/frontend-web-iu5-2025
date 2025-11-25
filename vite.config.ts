import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { dest_root, api_proxy_addr } from './src/target_config'

// https://vitejs.dev/config/
export default defineConfig(({ }) => ({
  base: dest_root,
  plugins: [
    react(),
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
    port: 3000,
    proxy: {
      '/api': {
        target: api_proxy_addr,
        changeOrigin: true,
      },
    },
  },
}))