import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Configurações React otimizadas
      jsxRuntime: 'automatic'
    })
  ],
  
  // Otimizações de build para melhor performance
  build: {
    // Divide o código em chunks menores
    rollupOptions: {
      output: {
        manualChunks: {
          // Separa bibliotecas grandes em chunks próprios
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom']
        }
      }
    },
    
    // Compressão e otimizações
    minify: 'esbuild',
    cssMinify: true,
    
    esbuild: {
      drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
    },
    
    sourcemap: process.env.NODE_ENV === 'development',
    
    assetsInlineLimit: 4096, // Inline assets menores que 4kb
    
    chunkSizeWarningLimit: 500,
    
    target: 'es2015',
    
    cssCodeSplit: true
  },
  
  // Dependency optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: []
  },
  
  // Otimizações de servidor de desenvolvimento
  server: {
    port: 3000,
    open: true,
    host: true,
    preTransformRequests: true
  },
  
  preview: {
    port: 4173,
    host: true
  },
  
  assetsInclude: ['**/*.woff2', '**/*.woff'],
  
  css: {
    devSourcemap: true
  }
})
