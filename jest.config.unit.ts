import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.jest.json';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/unit/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: pathsToModuleNameMapper(
    tsconfig.compilerOptions?.paths || {},
    {
      prefix: '<rootDir>/',
    },
  ),
  moduleDirectories: ['node_modules', '<rootDir>/src'],
};

export default config;
