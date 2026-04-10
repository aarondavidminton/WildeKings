import { defineConfig } from 'vite';

// GitHub Project Pages: https://aarondavidminton.github.io/WildeKings/
// Serve uses '/' so local dev stays at http://localhost:5173/
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/WildeKings/',
}));
