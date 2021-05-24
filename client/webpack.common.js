const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(?:|gif|jpeg|jpg|png|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './assets/[name].[contenthash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/, /\.spec\.ts$/],
        use: ['babel-loader', 'ts-loader'],
        include: [path.resolve(__dirname, './src')],
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, './src')],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin(),
  ],
};
