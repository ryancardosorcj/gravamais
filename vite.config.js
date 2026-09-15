import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        // Site
        main: resolve(__dirname, 'index.html'),
        // Styleguide vivo — lê os mesmos tokens do site (/styleguide.html)
        styleguide: resolve(__dirname, 'styleguide.html'),
      },
    },
  },
});
