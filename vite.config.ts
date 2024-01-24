import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',  // Target should not include the "/api/v1/"
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // Rewrite the path to remove "/api" prefix
      },
    },
  },
})
