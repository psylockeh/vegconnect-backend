/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  collectCoverage: true,
  coverageReporters: ["json-summary", "text", "lcov"],
  coverageDirectory: "coverage",
};
