import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Inspect from 'vite-plugin-inspect';
import { visualizer } from 'rollup-plugin-visualizer';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Inspect({
      build: true,
      outputDir: '.vite-inspect',
    }),
    {
      ...visualizer({
        filename: './dist/bundle-stats.html',
        template: 'treemap',
        gzipSize: true,
        brotliSize: true,
        open: true,
      }),
      apply: 'build',
    },
  ],
  resolve: {
    alias: {
      '@app': '/src/app',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@features': '/src/features',
      '@pages': '/src/pages',
      '@lib': '/src/lib',
      '@styles': '/src/styles',
      '@types': '/src/types',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks',
      '@routes': '/src/routes',
    },
  },
  server: {
    proxy: {
      "/api/auth": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/auth/, ""),
      },
      "/api/payments": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/payments/, ""),
      },
    },
  },
  // build: {
  //   sourcemap: true,
  // },
});
