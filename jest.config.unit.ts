import type { Config } from 'jest';
import { compilerOptions } from './tsconfig.jest.json';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testMatch: ['**/tests/unit/**/*.test.ts'],
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true, tsconfig: 'tsconfig.jest.json' }],
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
    '^@database/entities$': '<rootDir>/src/database/entities/index.ts',
  },
  moduleDirectories: ['node_modules', '<rootDir>/src'],
};

export default config;
