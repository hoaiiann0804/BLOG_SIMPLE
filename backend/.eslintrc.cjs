const js = require("@eslint/js");
const globals = require("globals");
const { defineConfig } = require("eslint/config");

export default defineConfig([
  {
    files: ["**/*.{js,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
]);
