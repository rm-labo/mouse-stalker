/* eslint-disable @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
const CopyPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const ImageminMozjpeg = require('imagemin-mozjpeg')
const globule = require('globule')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const mode = process.env.NODE_ENV
const isDevelopment = mode === 'development'

const srcImagesPass = path.resolve(__dirname, './src/images')
const publicDirDistPass = path.resolve(__dirname, '../docs')
const publicAssetsImagesDirPath = path.resolve(__dirname, '../docs/assets/images')
const publicAssetsDirPath = './assets'
const pugTemplates = globule.find('./src/pug/**/*.pug', {
  ignore: ['./src/pug/**/_*.pug'],
})

const app = {
  mode: mode,
  entry: {
    index: './src/ts/index.ts',
    'main.css': './src/scss/main.scss',
  },
  output: {
    filename: publicAssetsDirPath + '/js/[name].js',
    path: publicDirDistPass,
  },
  devtool: isDevelopment ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },
      {
        test: /\.(scss|sass|css)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: true,
              sourceMap: isDevelopment,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      //stage: 0,
                      browsers: 'last 2 versions',
                      autoprefixer: { grid: true },
                    },
                  ],
                  [
                    'css-declaration-sorter',
                    {
                      order: 'alphabetical',
                    },
                  ],
                  [
                    'postcss-sort-media-queries',
                    {
                      sort: 'mobile-first',
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|eot|wof|woff|woff2|ttf|svg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.ts/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.join(__dirname, 'src'), 'node_modules'],
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: publicAssetsDirPath + '/css/[name]',
    }),
    new CleanWebpackPlugin({
      // dry: true, // 破壊的処理のため事前にテストを行う
      verbose: isDevelopment, // コンソールに出力
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        // '!**/*.html',
      ],
      cleanAfterEveryBuildPatterns: [
        // '**/*.map',
        '.DS_Store.',
        '.DS_Store',
      ],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: srcImagesPass,
          to: `${publicAssetsImagesDirPath}/[path][name][ext]`,
        },
      ],
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      plugins: [
        ImageminMozjpeg({
          quality: 85,
          progressive: true,
        }),
      ],
      pngquant: {
        quality: '70-85',
      },
      gifsicle: {
        interlaced: false,
        optimizationLevel: 10,
        colors: 256,
      },
      svgo: {},
    }),
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
}

//pugファイルがある分だけhtmlに変換する
pugTemplates.forEach((template) => {
  const fileName = template.replace('./src/pug/', '').replace('.pug', '.html')
  app.plugins.push(
    new HtmlWebpackPlugin({
      filename: `${fileName}`,
      template: template,
      inject: 'body', // false, head, body, true
      minify: !isDevelopment,
    })
  )
})

module.exports = app
