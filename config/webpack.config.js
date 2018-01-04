const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const path = require('path');
const defaultSettings = require('./defaults');

const filePath = defaultSettings.filePath;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const pkgPath = path.join(__dirname, '../package.json');
const pkg = fs.existsSync(pkgPath) ? require(pkgPath) : {};
let theme = {};
if (pkg.theme && typeof (pkg.theme) === 'string') {
  let cfgPath = pkg.theme;
  // relative path
  if (cfgPath.charAt(0) === '.') {
    cfgPath = resolve(args.cwd, cfgPath);
  }
  const getThemeConfig = require(cfgPath);
  theme = getThemeConfig();
} else if (pkg.theme && typeof (pkg.theme) === 'object') {
  theme = pkg.theme;
}

const webpackConfig = {
  entry: {},
  output: {
    path: filePath.build,
    filename: '[name].js',
    publicPath: filePath.publicPath
  },
  cache: true,
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      components: path.join(__dirname, '../src/components'),
      pages: path.join(__dirname, '../src/pages'),
      localData: path.join(__dirname, '../src/testdata/localdata'),
      mockData: path.join(__dirname, '../src/testdata/mockdata'),
      util: path.join(__dirname, '../src/utils'),
      store: path.join(__dirname, '../src/store'),
      jquery: path.join(__dirname, '../node_modules/jquery/dist/jquery.min.js')
    }
  },
  module: {
    noParse: [
      path.join(__dirname, '../node_modules/jquery/dist/jquery.min.js')
    ],
    loaders: [
      {
        test: /.jsx?$/,
        loaders: ['react-hot', 'babel-loader', 'webpack-module-hot-accept'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=1&name=res/[name].[hash:8].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test(file) {
          return /\.less$/.test(file) && !/\.module\.less$/.test(file);
        },
        loader: ExtractTextPlugin.extract(
          'css?sourceMap!' +
          'postcss!' +
          `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
        )
      },
      {
        test: /\.module\.less$/,
        loader: ExtractTextPlugin.extract(
          'css?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!!' +
          'postcss!' +
          `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
        )
      }
    ]
  },
  postcss() {
    return [precss, autoprefixer];
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
};

function injectEntry() {
  webpackConfig.entry[defaultSettings.pagesToPath().name] = [
    defaultSettings.pagesToPath().entry
  ];
}

function injectHtmlWebpack() {
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: defaultSettings.pagesToPath().fln,
      template: defaultSettings.pagesToPath().templates,
      chunks: [defaultSettings.pagesToPath().name],
      inject: true
    })
  );
}

(function init() {
  injectEntry();
  injectHtmlWebpack();
}());

module.exports = webpackConfig;
