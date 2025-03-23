const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './my-new-spotify-app/src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|ico)$/i, 
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]', 
              outputPath: 'assets/images', 
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './my-new-spotify-app/public/index.html',
      favicon: './my-new-spotify-app/public/favicon.ico'
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  target: 'web',
  mode: 'production',
};
