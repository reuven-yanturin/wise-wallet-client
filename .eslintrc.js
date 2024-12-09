module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  rules: {
    'no-console': import.meta.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': import.meta.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'none',
        endOfLine: 'auto'
      }
    ],
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'never']
  }
}
