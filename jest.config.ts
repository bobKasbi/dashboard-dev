import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',

  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],

  transform: {
    '^.+\\.(ts|js|mjs|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
      },
    ],
  },

  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$)',
  ],

  testPathIgnorePatterns: [
    '<rootDir>/e2e/'
  ],

  moduleFileExtensions: ['ts', 'js', 'html'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@env/(.*)$': '<rootDir>/src/environments/$1'
  }
};

export default config;
