/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",

  collectCoverage: true,
  coverageDirectory: "coverage",

  reporters: [
    "default",
    [
      "jest-badges",
      {
        outputDir: "./",
        badges: {
          branches: "coverage-branches.svg",
          functions: "coverage-functions.svg",
          lines: "coverage-lines.svg",
          statements: "coverage-statements.svg",
        },
      },
    ],
  ],
};
