const HtmlWebpackPlugin=require('html-webpack-plugin')
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
const CopyPlugin=require('copy-webpack-plugin')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
const path=require('path')

const production=process.env.NODE_ENV==='production'? true:false

const filename=(ext) => production? `bundle.[hash].${ext}`:`bundle.${ext}`
function jsLoaders() {
  const loaders=[
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/env'],
      }
    }
  ]
  if (!production) {
    loaders.push('eslint-loader')
  }
  return loaders
}

module.exports={
  devServer: {
    contentBase: 'src',
    inline: true,
    watchContentBase: true,
    hot: true,
  },
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core')
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {removeComments: production, collapseWhitespace: production},
    }),
    new CopyPlugin({
      patterns: [
        // eslint-disable-next-line max-len
        {from: path.resolve(__dirname, 'src/favicon.ico'), to: path.resolve(__dirname, 'dist')},
      ],
    }),
    new MiniCssExtractPlugin({filename: filename('css')}),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: jsLoaders(),
      },
    ],
  },
};
