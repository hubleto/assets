// const path = require('path');
// const fs = require('fs');

import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findHubletoAppsInRepository(folder) {
  let apps = [];
  if (fs.lstatSync(folder).isDirectory()) {
    fs.readdirSync(folder).forEach(function(app){
      const stat = fs.statSync(folder + '/' + app);
      const loaderEntry = folder + '/' + app + '/Loader';
      if (stat && stat.isDirectory() && fs.existsSync(loaderEntry + '.tsx')) {
        apps.push(loaderEntry);
      }
    });
  }
  console.log('Found following apps in `' + folder + '`');
  console.log(apps);
  return apps;
}

let mainEntries = [
  './src/Main',
  ...findHubletoAppsInRepository(path.resolve(__dirname, '../erp/apps')),
];

if (fs.existsSync(path.resolve(__dirname, '../enterprise/apps'))) {
  mainEntries = [
    ...mainEntries,
    ...findHubletoAppsInRepository(path.resolve(__dirname, '../enterprise/apps')),
  ]
}

export default {
  entry: {
    main: mainEntries,
  },
  output: {
    path: path.resolve(__dirname, 'compiled/js'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        apps: {
          test: /[\\/]apps[\\/]/,
          name: 'apps',
          chunks: 'all'
        },
        react_ui_core: {
          test: /[\\/]core[\\/]/,
          name: 'react-ui-core',
          chunks: 'all'
        },
        react_ui_ext: {
          test: /[\\/]ext[\\/]/,
          name: 'react-ui-ext',
          chunks: 'all'
        },
        react_ui_vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'react-ui-vendor',
          chunks: 'all'
        },
      }
    },
  },
  resolve: {
    modules: [
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, '../react-ui/node_modules'),
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css'],
    alias: {
      '@babel/runtime': path.resolve(__dirname, 'node_modules/@babel/runtime'),
      '@hubleto/react-ui/core': path.resolve(__dirname, '../react-ui/core'),
      '@hubleto/react-ui/ext': path.resolve(__dirname, '../react-ui/ext'),
      '@hubleto/apps': path.resolve(__dirname, '../erp/apps'),
      // 'primereact/*': path.resolve(__dirname, '../react-ui/node_modules/primereact'),
      // '@primereact/*': path.resolve(__dirname, '../react-ui/node_modules/@primereact'),
    },
  }
};
