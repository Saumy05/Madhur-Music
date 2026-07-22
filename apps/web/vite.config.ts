import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@/components': path.resolve(__dirname, './src/shared/components'),
      '@': path.resolve(__dirname, './src'),
      '@madhur/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@madhur/shared': path.resolve(__dirname, '../../packages/shared/src'),
      '@madhur/types': path.resolve(__dirname, '../../packages/types/src'),
      '@madhur/utils': path.resolve(__dirname, '../../packages/utils/src'),
      '@madhur/config': path.resolve(__dirname, '../../packages/config/src'),
      '@madhur/constants': path.resolve(__dirname, '../../packages/constants/src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
