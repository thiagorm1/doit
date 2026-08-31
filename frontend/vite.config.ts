import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env.IS_PREACT': JSON.stringify('false'),
    'process.env': {},
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true, // Fix for Windows/Docker file watching
    }
  }
});
