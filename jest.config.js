// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    testTimeout: 30000,
    testEnvironment: "node",
    testMatch: ["**/*.test.js"],
    setupFilesAfterEnv: ["<rootDir>/dist/tests/test-setup.js"],
};
