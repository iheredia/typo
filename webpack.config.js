const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const nodeExternals = require('webpack-node-externals');

const babelConfig = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
  },
};

const clientConfig = {
  target: 'web',
  devtool: 'source-map',
  entry: {
    main: [
      path.resolve(__dirname, 'src/app/client/index.js'),
      path.resolve(__dirname, 'src/app/client/index.scss'),
    ]
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        { loader: MiniCssExtractPlugin.loader },
        { loader: 'css-loader' },
        { loader: 'sass-loader' },
        { loader: 'postcss-loader' },
      ]
    }, babelConfig]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new ManifestPlugin({ fileName: 'manifest.json' }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  }
};

const serverConfig = {
  target: 'node',
  devtool: 'source-map',
  node: {
    __dirname: true,
    __filename: true,
  },
  externals: [nodeExternals()],
  entry: {
    index: path.resolve(__dirname, 'src/server.js')
  },
  module: { rules: [babelConfig] },
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js',
    libraryTarget: 'umd',
  }
};

module.exports = [clientConfig, serverConfig];
