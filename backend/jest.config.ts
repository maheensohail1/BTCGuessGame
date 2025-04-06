// backend/jest.config.ts
import type { Config } from 'jest';

const config: Config = {
    rootDir: './',
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',  // for TypeScript files
      '^.+\\.jsx?$': 'babel-jest', // for JavaScript files
    },
    testMatch: ['**/__tests__/**/*.test.ts'],
    transformIgnorePatterns: [
        '/node_modules/(?!axios|some-other-package).+\\.js$', // Transform axios and other problematic packages
      ],
};

export default config;
