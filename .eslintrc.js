// .eslintrc.js
module.exports = {
  extends: ['next/core-web-vitals', 'prettier', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'import/no-anonymous-default-export': 'off',
    'react/no-children-prop': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
  },
};
