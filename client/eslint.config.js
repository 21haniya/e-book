import js from "@eslint/js"
import globals from "globals"
import pluginVue from "eslint-plugin-vue"
import {defineConfig} from "eslint/config"

export default defineConfig([
  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "no-extra-label": "error",
      "vue/no-unused-vars": "error",
      "vue/no-multi-spaces": "error",
      "vue/no-duplicate-attributes": "warn",
      "no-dupe-keys": "warn",
    },
  },
])
