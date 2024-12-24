import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // localhost 대신 true로 변경
    port: 3002,
    open: true, // 브라우저 자동으로 열기
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
