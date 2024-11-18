import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This will proxy API calls to your backend server
      '/api/proxy': {
        target: 'http://localhost:3000', // Backend URL (Express server)
        changeOrigin: true,
        secure: false,
      },
      '/register': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      '/api/login': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      "/home/user": {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      '/logout': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
