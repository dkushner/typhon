module.exports = {
  verbose: true,
  roots: [
    '<rootDir>/test/unit',
    '<rootDir>/test/integration'
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^@/test$': '<rootDir>/test/index.js',
    '^@/test/(.*)$': '<rootDir>/test/$1',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}'
  ],
  snapshotSerializers: [
    'jest-serializer-html'
  ],
  globals: {
    ['ts-jest']: {
      useBabelrc: true,
      tsConfigFile: 'tsconfig.json'
    }
  }
}