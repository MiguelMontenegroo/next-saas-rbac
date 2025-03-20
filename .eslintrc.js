  /** @type {import('eslint').Linter.Config} */
  module.exports = {
    parser: '@typescript-eslint/parser', // To use the TypeScript parser
    plugins: ['@typescript-eslint'], // To use the TypeScript plugin
    extends: [
      'eslint:recommended', // Recommended ESLint rules
      'plugin:@typescript-eslint/recommended', // Recommended rules for TypeScript
      'next',
      'next/core-web-vitals'
    ],
    rules: {
      // Disable the empty block rule
      'no-empty': 'off', // Disable empty block statements
      
      // Disable the no-unused-vars for TypeScript
      '@typescript-eslint/no-unused-vars': 'off', // Disable warning for unused variables
      
      // Disable unused expressions rule
      '@typescript-eslint/no-unused-expressions': 'off', // Allow unused expressions
      
      // Disable empty object type rule
      '@typescript-eslint/no-empty-object-type': 'off', // Allow empty object type
      
      // Disable the no-console rule (optional)
      'no-console': 'off', // Allow console logs
      
      // Allow empty catch blocks
      'no-empty': ['error', { 'allowEmptyCatch': true }], // Allow empty catch blocks but show error for others
    },
  };
