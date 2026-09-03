import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Portable Vite config for running this project outside the Figma Make platform
// (the original config depended on .figma/make/site.json and dev-only Figma plugins).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Exposes a stable global the app can read at runtime, independent of Vite's
  // import.meta.env — this keeps shared API modules consistent across environments.
  define: {
    __API_BASE_URL__: JSON.stringify(process.env.VITE_API_URL || 'http://localhost:4000/api'),
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})