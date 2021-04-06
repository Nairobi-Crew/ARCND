module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: [
    '<rootDir>/src',
  ],
  testPathIgnorePatterns: [
    '/node_modules/*',
    '^.*\\.(css|sass|scss)$',
  ],
  verbose: true,
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  globals: {
    'ts-jest': {
      babelConfig: true,
      diagnostics: false,
    },
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/src/setupEnzyme.ts'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    'tests/(.*)': '<rootDir>/__tests__/$1',
    'UI/(.*)': '<rootDir>/src/components/ui/$1',
    'App/(.*)': '<rootDir>/src/App/$1',
    'Pages/(.*)': '<rootDir>/src/Pages/$1',
    'Config/(.*)': '<rootDir>/src/config/$1',
    'Util/(.*)': '<rootDir>/src/util/$1',
    'Reducers/(.*)': '<rootDir>/src/Store/reducers/$1',
    'Store/(.*)': '<rootDir>/src/Store/$1',
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',

  },
};
