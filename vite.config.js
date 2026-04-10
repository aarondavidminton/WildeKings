import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// GitHub Project Pages: https://aarondavidminton.github.io/WildeKings/
// Serve uses '/' so local dev stays at http://localhost:5173/
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/WildeKings/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
}));
