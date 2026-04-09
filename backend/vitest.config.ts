import { defineConfig } from 'vite' // Usamos vite directamente ya que vitest lo re-exporta

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
})