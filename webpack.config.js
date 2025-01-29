const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const federationConfig = require('./config/federation.config');
const path = require("path");

module.exports = {
  entry: "./src/bootstrap.js",
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
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
  ],
  devServer: {
    port: __PORT__,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    hot: true,
  },
};
