module.exports = {
  root: true,
  extends: [
    '@react-native',
    '@react-native/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // 可以在这里添加自定义规则
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-console': 'warn',
  },
  env: {
    'react-native/react-native': true,
  },
};
