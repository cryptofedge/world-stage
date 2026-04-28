module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@store': './src/store',
            '@data': './src/data',
            '@types': './src/types',
            '@utils': './src/utils',
            '@navigation': './src/navigation',
          },
        },
      ],
    ],
  };
};
