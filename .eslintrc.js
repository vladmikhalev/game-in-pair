module.exports = {
  env: {
    browser: true,
    es2021: true,
    "cypress/globals": true,
  },
  plugins: ["cypress", "prettier"],
  extends: ["eslint:recommended", "plugin:cypress/recommended", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-var": "error",
    "prettier/prettier": "error",
    // "cypress/no-assigning-return-values": "error",
    // "cypress/no-unnecessary-waiting": "error",
    // "cypress/assertion-before-screenshot": "warn",
    // "cypress/no-force": "warn",
    // "cypress/no-async-tests": "error",
    // "cypress/no-pause": "error",
  },
};
