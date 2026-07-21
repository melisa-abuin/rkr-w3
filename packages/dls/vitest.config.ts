import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/assets': resolve(__dirname, './src/assets'),
      '@/components': resolve(__dirname, './src/components'),
      '@/constants': resolve(__dirname, './src/constants'),
      '@/hooks': resolve(__dirname, './src/hooks'),
      '@/interfaces': resolve(__dirname, './src/interfaces'),
      '@/mocks': resolve(__dirname, './src/mocks'),
      '@/utils': resolve(__dirname, './src/utils'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/__tests__/**/*.{ts,tsx}', 'src/**/*.{test,spec}.{ts,tsx}'],
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
})
