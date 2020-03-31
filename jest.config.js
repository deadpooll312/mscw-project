module.exports = {
  "transform": {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  moduleDirectories: ['node_modules', 'src'],
  collectCoverage: true,
  collectCoverageFrom: ['src/@next/utils/**/*.{ts,js}'],
  reporters: [ 'default', 'jest-junit' ],
  globals: {
    window: true,
  },
};
