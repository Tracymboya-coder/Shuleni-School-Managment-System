/** @type {import('jest').Config} */
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: ['<rootDir>/src/**/*.test.{js,jsx}'],
  // Mirrors the __API_BASE_URL__ global that Vite injects via `define` in vite.config.js,
  // so src/store/api.js resolves identically whether running under Vite or Jest.
  globals: {
    __API_BASE_URL__: 'http://localhost:4000/api',
  },
}