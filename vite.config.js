import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/': {
        target: 'http://127.0.0.1:8000', // Backend interno
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
