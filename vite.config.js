import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/med-ed-chat-assistant/',
  build: {
    chunkSizeWarningLimit: 1600
  },
  plugins: [vue()],
})
