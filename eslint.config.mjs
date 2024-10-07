import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: "@babel/eslint-parser", // استخدم المحلل الذي تحتاجه لمشروعك
      parserOptions: {
        ecmaVersion: 2021, // تأكد من استخدام النسخة المناسبة
        sourceType: "module",
      },
    },
    plugins: {
      // إضافات ESLint الخاصة بك
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
