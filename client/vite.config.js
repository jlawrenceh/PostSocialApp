import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 8080,
    strictPort: false,
  },
  server: {
    port: 8080,
    strictPort: false,
    host: true,
    origin: "http://0.0.0.0:8080",
  },
});
