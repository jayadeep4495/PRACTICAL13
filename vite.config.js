import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    // Bundle Optimization & Build Configuration
    build: {
      // Disable source maps in production to minimize deployment footprint
      sourcemap: !isProduction,

      // CSS Code Splitting: Splits CSS matching code chunks
      cssCodeSplit: true,

      // Warning threshold for chunk size (in kB)
      chunkSizeWarningLimit: 500,

      rollupOptions: {
        output: {
          // MANUAL CHUNKING: Segregate large third-party libraries into stable, long-term cached bundles
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // React Core chunk
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react'
              }
              // Icons library chunk
              if (id.includes('lucide-react')) {
                return 'vendor-icons'
              }
              // Other node_modules dependencies
              return 'vendor-libs'
            }
          },
          // Predictable file naming pattern for generated assets
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    // Server options for local development
    server: {
      port: 5173,
      open: false,
    },
  }
})
