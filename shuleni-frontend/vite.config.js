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
  // import.meta.env — this is what lets api.js work identically under Vite (browser)
  // and Jest (Node/CommonJS), where `import.meta` isn't valid syntax.
  define: {
    __API_BASE_URL__: JSON.stringify(process.env.VITE_API_URL || 'http://localhost:5000'),
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})