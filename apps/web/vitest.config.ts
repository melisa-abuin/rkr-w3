import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/assets': resolve(__dirname, '../../packages/dls/src/assets'),
      '@/components': resolve(__dirname, '../../packages/dls/src/components'),
      '@/constants': resolve(__dirname, '../../packages/dls/src/constants'),
      '@/hooks': resolve(__dirname, '../../packages/dls/src/hooks'),
      '@/interfaces': resolve(__dirname, '../../packages/dls/src/interfaces'),
      '@/mocks': resolve(__dirname, '../../packages/dls/src/mocks'),
      '@/utils': resolve(__dirname, '../../packages/dls/src/utils'),
      '@': resolve(__dirname, '.'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    passWithNoTests: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/__tests__/**/*.{ts,tsx}', '**/*.{test,spec}.{ts,tsx}'],
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
})
