const path = require('path');
const LoadableWebpackPlugin = require('@loadable/webpack-plugin');
const LoadableBabelPlugin = require('@loadable/babel-plugin');
const babelPresetRazzle = require('razzle/babel');
const ImageminPlugin = require('imagemin-webpack');

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
    // Stay immutable here
    const appConfig = Object.assign({}, config);
    // Disabled source maps on Production
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

    // Run Production only
    if (!dev) {
      appConfig.plugins = [
        ...appConfig.plugins,
        // Optimized images on Production
        new ImageminPlugin({
          bail: false, // Ignore errors on corrupted images
          cache: true,
          imageminOptions: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['mozjpeg', { quality: 75, progressive: true }],
              ['pngquant', { quality: [0.75, 0.75] }],
              [
                'svgo',
                {
                  plugins: [
                    {
                      cleanupAttrs: true,
                      inlineStyles: true,
                      removeDoctype: true,
                      removeXMLProcInst: true,
                      removeComments: true,
                      removeMetadata: true,
                      removeTitle: true,
                      removeDesc: true,
                      removeUselessDefs: true,
                      removeXMLNS: false,
                      removeEditorsNSData: true,
                      removeEmptyAttrs: true,
                      removeHiddenElems: true,
                      removeEmptyText: true,
                      removeEmptyContainers: true,
                      removeViewBox: false,
                      cleanupEnableBackground: true,
                      minifyStyles: true,
                      convertStyleToAttrs: true,
                      removeUnknownsAndDefaults: true,
                      removeUselessStrokeAndFill: true,
                      removeUnusedNS: true,
                      cleanupIDs: true,
                      moveElemsAttrsToGroup: true,
                      moveGroupAttrsToElems: true,
                      collapseGroups: true,
                      removeRasterImages: true,
                      mergePaths: true,
                      sortAttrs: true,
                      removeScriptElement: true,
                    },
                  ],
                },
              ],
            ],
          },
        }),
      ];
    }
    return appConfig;
  },

  modifyBabelOptions: () => ({
    babelrc: false,
    presets: [babelPresetRazzle],
    plugins: [LoadableBabelPlugin],
  }),
};
