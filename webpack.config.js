const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const entryBaseDir = path.resolve(__dirname, "./pages");
const pages = fs.readdirSync(entryBaseDir);

// entries
const entryMap = {};
pages.forEach(function(page) {
  const jsName = page + '/' + page + ".js";
  entryMap[page] = "./pages/" + jsName;	
});

const config = {
  entry: entryMap,
  devtool: "inline-source-map",
  devServer: {
  	contentBase: "./",
  	host: "127.0.0.1",
    port: "9527",
  },
  output: {
  	filename: "./[name]/[name].bundle.js",
  	path: path.resolve(__dirname, "dist")
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          "html-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ]
  }
}

pages.forEach(function(page) {
  const htmlName = page + "/" + page + ".html"; 
  const conf = {
  	title: page,
    filename: htmlName,
    template: "./pages/" + page + "/" + page + ".html",
  };
  config.plugins.push(new HtmlWebpackPlugin(conf));	
});

module.exports = config;