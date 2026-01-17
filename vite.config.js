import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Handle SPA routing - redirect all routes to index.html
    historyApiFallback: true,
  },
  preview: {
    // Handle SPA routing in preview mode
    historyApiFallback: true,
  },
})
