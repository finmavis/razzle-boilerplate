const path = require('path');
const LoadableWebpackPlugin = require('@loadable/webpack-plugin');
const LoadableBabelPlugin = require('@loadable/babel-plugin');
const babelPresetRazzle = require('razzle/babel');

module.exports = {
  plugins: [
    {
      name: 'compression',
      options: {
        brotli: true,
        gzip: true,
        compressionPlugin: {
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          compressionOptions: { level: 9 },
          minRatio: 0.8,
        },
        brotliPlugin: {
          asset: '[path].br[query]',
          test: /\.(js|css|html|svg)$/,
          minRatio: 0.8,
        },
      },
    },
  ],
  modify: (config, { dev, target }) => {
    // stay immutable here
    const appConfig = Object.assign({}, config);
    appConfig.devtool = dev ? 'cheap-module-eval-source-map' : false;

    // Run client only
    if (target === 'web') {
      const filename = path.resolve(__dirname, 'build');

      appConfig.plugins = [
        ...appConfig.plugins,
        new LoadableWebpackPlugin({
          outputAsset: false,
          writeToDisk: { filename },
        }),
      ];

      appConfig.output.filename = dev
        ? 'static/js/[name].js'
        : 'static/js/[name].[chunkhash:8].js';

      appConfig.optimization = Object.assign({}, appConfig.optimization, {
        runtimeChunk: true,
        splitChunks: {
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
            },
          },
          chunks: 'all',
          name: dev,
        },
      });
    }

    return appConfig;
  },

  modifyBabelOptions: () => ({
    babelrc: false,
    presets: [babelPresetRazzle],
    plugins: [LoadableBabelPlugin],
  }),
};
