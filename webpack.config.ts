import * as path from 'path';
import * as fs from 'fs';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { execSync } from 'child_process';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as MomentLocalesPlugin from 'moment-locales-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import * as ManifestPlugin from 'webpack-manifest-plugin';

const CopyWebpackPlugin = require('copy-webpack-plugin');

const HASH = execSync('git rev-parse HEAD').toString();
// const COMMIT_DATE = execSync('git log -1 --format='%at' | xargs -I{} date -d @{} +%Y/%m/%d_%H:%M:%S').toString()
const COMMIT_DATE = execSync('git log -1 --format=%ci').toString();
const BUILD_TIME = new Date().toLocaleString();

console.info(`[webpack.config] NODE_ENV: ${process.env.NODE_ENV}`);
console.info(`[webpack.config] platform: ${process.platform}`);
console.info(`[webpack.config] version: ${process.version}`);
console.info(`[webpack.config] HASH: ${HASH}`);
console.info(`[bamboo.config] TEST_ONE: ${process.env.TEST_ONE}`);
console.info(`[bamboo.config] TEST_TWO: ${process.env.TEST_TWO}`);

const PORT = Number(process.env.PORT || '3000');
const isDevelopment = process.env.NODE_ENV !== 'production';
const isPreprod = process.env.PLATFORM === 'preprod';
const isProd = process.env.PLATFORM === 'prod';

const DIR_ROOT = path.join(__dirname);
const DIR_APP_SRC = path.join(DIR_ROOT, 'src');
const DIR_APP_DIST = path.join(DIR_ROOT, 'dist', 'client');

const pkg = require(path.join(DIR_ROOT, 'package.json'));

const PATH_TO_INDEX_FILE = path.join(DIR_APP_SRC, 'index.tsx');
const PATH_TO_INDEX_MER_FILE = path.join(DIR_APP_SRC, 'index_mer.tsx');
// const PATH_TO_INDEX_FILE = path.join(DIR_APP_SRC, 'playground', 'catalog.ts');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(
  // fs.readFileSync(path.join(__dirname, 'node_modules', '@gostgroup/egip-rc/style/antd-overrides.less'), 'utf8')
  fs.readFileSync(path.join(__dirname, 'src', 'styles', 'antd-overrides.less'), 'utf8')
);

const DEV = {
  devServer: {
    // host: '0.0.0.0',
    contentBase: [DIR_APP_DIST],
    // allowedHosts: [
    // ],

  },
  output: {
    path: DIR_APP_DIST,
    // publicPath: 'http://0.0.0.0:3000'
    publicPath: '/'
  },
  htmlFileName: path.join(DIR_APP_DIST, 'index.html'),
};

const PROD = {
  output: {
    path: DIR_APP_DIST,
    publicPath: '/'
  },
  htmlFileName: path.join(DIR_APP_DIST, 'index.html'),
};

const BUILD = Object.assign({}, isDevelopment ? DEV : PROD, {
  htmlTemplateName: path.join(DIR_APP_SRC, 'html', 'index.template.hbs'),
  htmlTemplateMerName: path.join(DIR_APP_SRC, 'html', 'indexMer.template.hbs'),
});

const getPlugins = () => {
  const plugins = [
    new ManifestPlugin(),
    new MomentLocalesPlugin({
      localesToKeep: ['ru'],
    }),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: BUILD.htmlTemplateName,
      chunks: ['index'],
      filename: 'index.html',
      publicPath: '/',
      hash: true,
      title: 'Мониторинг чистоты города',
      meta: {
        'mobile-web-app-capable': 'yes',
        'viewport': 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui',
      }
    }),
    // generate Login Page
    new HtmlWebpackPlugin({
      template: BUILD.htmlTemplateMerName,
      chunks: ['indexMer'],
      filename: 'indexMer.html',
      hash: true,
      title: 'Мониторинг чистоты города',
      publicPath: '/',
      meta: {
        'mobile-web-app-capable': 'yes',
        'viewport': 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui',
        'defaultLogin': process.env.DEFAULT_LOGIN || 'Мэр',
        'defaultLoginPass': process.env.DEFAULT_PASSWORD || 'MeR_2013',
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      '__DEV__': isDevelopment,
      '_VERSION_': JSON.stringify(pkg.version),
      '_RELEASE_DATE_': JSON.stringify(pkg.releaseDate),
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV) || 'development',
      '_HASH_': JSON.stringify(HASH.slice(0,7)),
      '_COMMIT_DATE_': JSON.stringify(COMMIT_DATE),
      '_BUILD_TIME_': JSON.stringify(BUILD_TIME),
      '_WS_CAR_PATH_': JSON.stringify(getCarWsPath()),
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(DIR_APP_SRC, 'html', 'sw.js'),
        to: './'
      },
      {
        from: path.join(DIR_ROOT, 'src', 'static'),
        to: 'static'
      },
    ]),
  ];

  if (isDevelopment) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    // some only prod
  }

  if (false) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static'
      }),
    );
  }

  return plugins;
};

const getTargetApi = () => {
  if (isProd) {
    return 'https://mmonitor.mos.ru';
  }
  if (isPreprod) {
    return 'https://mmonitor-test.mos.ru';    // https://212.11.154.16
  }

  return 'https://mmonitor.gost-group.com';   // https://188.127.226.173
};

const getCarWsPath = () => {
  if (isProd) {
    return 'eip-test.mos.ru:9091/vehicles/district';
  }
  if (isPreprod) {
    return 'eip-test.mos.ru:9091/vehicles/district';    // https://212.11.154.16
  }

  return 'eip-test.mos.ru:9091/vehicles/district';   // https://188.127.226.173
}

// не работает
// const getTargetEgip = () => {
//   if (isProd) {
//     return 'https://egip.mos.ru';
//   }
//   if (isPreprod) {
//     return 'http://egiptest.mos.ru';
//   }

//   return 'http://egiptest.gost-group.com';
// };

const config: webpack.Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  // mode: 'development',
  node: {
    fs: 'empty',
    __filename: true,
    __dirname: true
  },
  devtool: isDevelopment ? 'eval' : false,
  entry: {
    index: [
      'core-js/stable',
      'regenerator-runtime/runtime',
      'react-hot-loader/patch',
      'whatwg-fetch',
      PATH_TO_INDEX_FILE,
    ],
    indexMer: [
      'core-js/stable',
      'regenerator-runtime/runtime',
      'react-hot-loader/patch',
      'whatwg-fetch',
      PATH_TO_INDEX_MER_FILE,
    ],
  },
  output: {
    path: BUILD.output.path,
    publicPath: BUILD.output.publicPath,
    filename: isDevelopment ? '[name].bundle.js' : 'app.[name].[contenthash].js',
  },
  devServer: {
    hot: true,
    noInfo: true,
    quiet: false,
    inline: true,
    lazy: false,
    https: false,
    stats: 'minimal',
    public: '',
    host: '0.0.0.0',
    publicPath: BUILD.output.publicPath,
    contentBase: DEV.devServer.contentBase,
    compress: true,
    port: PORT,
    proxy: {
      '/api': {
        target: getTargetApi(),
        secure: false,
      },
      '/egip': {
        target: getTargetApi(),
        secure: false,
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
        preserveHeaderKeyCase: true
      },
      '/socket': {
        target: getTargetApi(),
        ws: true,
        secure: false,
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
        preserveHeaderKeyCase: true
      }
    },
    staticOptions: {
      extensions: ['html'],
    },
  },

  resolve: {
    alias: {
      'react-dom': isDevelopment ? '@hot-loader/react-dom' : 'react-dom',
    },
    extensions: [
      '.json',
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
    ],
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
  },
  optimization: {
    noEmitOnErrors: true,
    usedExports: true,
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        use: [
          'handlebars-loader',
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              esModule: false,
            }
          },
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              esModule: false,
            }
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              javascriptEnabled: true,
              modifyVars: themeVariables
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              minimize:
                true
                || {
                  /* CSSNano Options */
                },
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              esModule: false,
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              use: [] as any
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]',
          esModule: false,
        }
      },
      {
        test: /\.woff(2)?(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]',
          mimeType: 'application/font-woff',
          esModule: false,
        }
      },
      {
        test: /\.(eot|ttf|otf||wav|mp3)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          esModule: false,
        }
      }
      // {
      //  test: /\.(json|geojson)$/,
      //  use: 'json-loader'
      // }
    ]
  },
  plugins: getPlugins(),
};
module.exports = config;
