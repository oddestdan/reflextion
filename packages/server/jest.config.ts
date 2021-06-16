export default {
  clearMocks: true,
  // collectCoverage: true,
  // coverageDirectory: 'coverage',
  collectCoverage: false,
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'json', 'ts', 'node'],
  // moduleNameMapper: {
  //   '@enums': '<rootDir>/src/enums',
  //   '@models': '<rootDir>/src/models',
  //   '@types': '<rootDir>/src/types',
  //   '@utils': '<rootDir>/src/utils',
  //   '@services': '<rootDir>/src/services',
  //   '@data': '<rootDir>/src/data',
  // },
  notifyMode: 'success-change',
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testRegex: ['(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$'],
  transform: {},
  verbose: false, //
};
