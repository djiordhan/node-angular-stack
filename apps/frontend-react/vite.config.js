import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 4300,
    strictPort: true,
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
});
