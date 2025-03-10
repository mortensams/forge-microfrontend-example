const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.js',
    output: {
      filename: 'forge-microfrontend.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'system',
      publicPath: isProduction ? '/' : 'http://localhost:8080/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    require('tailwindcss'),
                    require('autoprefixer'),
                  ],
                },
              },
            },
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]'
          }
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name][ext]'
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    plugins: [
      // Only use HtmlWebpackPlugin for development mode (standalone mode)
      ...(!isProduction ? [
        new HtmlWebpackPlugin({
          template: './public/index.html',
          inject: false
        })
      ] : [])
    ],
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      port: 8080,
      historyApiFallback: true,
      hot: true,
      open: true,
      static: {
        directory: path.join(__dirname, 'src'),
        publicPath: '/'
      }
    },
    externals: isProduction ? ['react', 'react-dom', 'single-spa'] : []
  };
};
