module.exports = {
  root: true,
  extends: [
    '@react-native-community', 
    'plugin:prettier/recommended'
  ],
  plugins: ['import'],
  rules: {
    'react-hooks/exhaustive-deps': [0],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'type', 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
