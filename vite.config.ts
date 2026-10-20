import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';
import {piny} from '@pinegrow/piny/vite';

export default defineConfig({
  plugins: [piny(), react(), tailwind()],
  server: {host: '127.0.0.1', open: '/__piny/'},
});
