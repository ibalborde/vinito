export default {
  test: {
    globals:      true,
    environment:  'node',
    include:      ['tests/**/*.test.ts'],
    setupFiles:   ['tests/setup.ts'],
    server: {
      deps: {
        inline: ['supertest'],
      },
    },
  },
}
