const path = require('path');
const LoadableWebpackPlugin = require('@loadable/webpack-plugin');
const LoadableBabelPlugin = require('@loadable/babel-plugin');
const babelPresetRazzle = require('razzle/babel');
const ImageminPlugin = require('imagemin-webpack');

module.exports = {
  plugins: [
    /**
     * Disable Source Maps on Production build using razzle-plugin-disable-sourcemaps-production
     * Docs: https://github.com/finmavis/razzle-plugin-disable-sourcemaps-production
     */
    'disable-sourcemaps-production',
    /**
     * Remove unused CSS on Production build using razzle-plugin-purgecss
     * Docs: https://github.com/finmavis/razzle-plugin-purgecss
     */
    {
      name: 'purgecss',
      options: {
        path: path.resolve(__dirname, 'src/**/*'),
      },
    },
    /**
     * Compress all bundle to Gzip and Brotli
     * On compression process we optimize using razzle-plugin-compression
     * Which under the hood using compression-webpack-plugin and brotli-webpack-plugin
     * Docs: https://github.com/nimacsoft/razzle-plugin-compression
     */
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
    const isProduction = dev === false;
    const isWeb = target === 'web';

    // Stay immutable here
    const appConfig = Object.assign({}, config);

    // Run client only
    if (isWeb) {
      const filename = path.resolve(__dirname, 'build');

      appConfig.plugins.push(
        new LoadableWebpackPlugin({
          outputAsset: false,
          writeToDisk: { filename },
        }),
      );

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
    if (isProduction) {
      appConfig.plugins.push(
        /**
         * Optimized all our images using imagemin-webpack
         * Docs: https://github.com/itgalaxy/imagemin-webpack
         */
        new ImageminPlugin({
          bail: false, // Ignore errors on corrupted images
          cache: true,
          imageminOptions: {
            plugins: [
              /**
               * Optimized GIF using imagemin-gifsicle
               * Docs: https://github.com/imagemin/imagemin-gifsicle
               */
              ['gifsicle', { interlaced: true }],
              /**
               * Optimized JPG using imagemin-mozjpeg
               * Docs: https://github.com/imagemin/imagemin-mozjpeg
               */
              ['mozjpeg', { quality: 75, progressive: true }],
              /**
               * Optimized PNG using imagemin-mozjpeg
               * Docs: https://github.com/imagemin/imagemin-pngquant
               */
              ['pngquant', { quality: [0.75, 0.75] }],
              /**
               * Optimized SVG using imagemin-svgo
               * Docs: https://github.com/imagemin/imagemin-svgo
               * Playground to test config: https://jakearchibald.github.io/svgomg/
               */
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
      );
    }
    return appConfig;
  },

  modifyBabelOptions: () => ({
    babelrc: false,
    presets: [babelPresetRazzle],
    plugins: [LoadableBabelPlugin],
  }),
};
