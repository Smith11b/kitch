
import type { Config } from '@jest/types';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!node-fetch)',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}", // Include all files in `app` folder
    "!app/api/**", // Exclude the entire `app/api` folder
    "!app/auth/**", // Exclude the entire `app/auth` folder
    "!app/layout.tsx", // Exclude the `app/layout.tsx` file
    "app/api/service/**/*.{js,jsx,ts,tsx}", // Re-include only `app/api/service`
    "lib/**/*.{js,jsx,ts,tsx}", // Include all files in the `lib` folder
    "!**/node_modules/**", // Exclude node_modules
    "!**/.next/**", // Exclude Next.js build folder
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ["json", "lcov", "text", "clover"],
};

export default createJestConfig(config);
