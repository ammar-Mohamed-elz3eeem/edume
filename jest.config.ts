/* eslint-disable no-undef */
/** @type {import('ts-jest').JestConfigWithTsJest} */
import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest';
const paths = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>/',
});

module.exports = {
  moduleDirectories: ['src', 'node_modules'],
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  transform: {
    '\\.ts$': 'ts-jest',
  },
  testRegex: '(./src/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)x?$',
  moduleNameMapper: paths,
};
