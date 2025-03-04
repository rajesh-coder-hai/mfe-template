const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const federationConfig = require('./config/federation.config');
const path = require("path");

module.exports = {
  // entry: "./src/bootstrap.js",
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jp?g|gif|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
        ...federationConfig,
        ...(process.env.APP_TYPE === 'remote' && { 
          exposes: { './Widget': './src/bootstrap' }
        }),
        ...(process.env.APP_TYPE === 'shell' && {
          remotes: {}
        })
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html'
      }),
  ],
  devServer: {
    port: __PORT__,
    allowedHosts: 'all',
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    hot: true,
  },
};
