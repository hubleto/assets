// const path = require('path');
// const fs = require('fs');

import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findHubletoAppsInRepository(folder) {
  let apps = [];
  if (fs.existsSync(folder) && fs.lstatSync(folder).isDirectory()) {
    fs.readdirSync(folder).forEach(function(app) {
      const stat = fs.statSync(folder + '/' + app);
      const manifestFile = folder + '/' + app + '/manifest.yaml';
      const loaderEntry = folder + '/' + app + '/Loader';

      if (
        stat
        && stat.isDirectory()
        && fs.existsSync(manifestFile)
        && fs.existsSync(loaderEntry + '.tsx')
      ) {
        apps.push(loaderEntry);
      }
    });
  }

  return apps;
}

let communityApps = findHubletoAppsInRepository(path.resolve(__dirname, '../erp/apps'))
let enterpriseApps = findHubletoAppsInRepository(path.resolve(__dirname, '../enterprise/apps'))

console.log('Found ' + communityApps.length + ' community apps.');
console.log('Found ' + enterpriseApps.length + ' enterprise apps.');

export default {
  entry: {
    main: [
      './src/Main',
      ...communityApps,
      ...enterpriseApps
    ],
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
        community_apps: {
          test: /[\\/]erp[\\/]apps[\\/]/,
          name: 'community-apps',
          chunks: 'all'
        },
        enterprise_apps: {
          test: /[\\/]enterprise[\\/]apps[\\/]/,
          name: 'enterprise-apps',
          chunks: 'all'
        },
        custom_apps: {
          test: /[\\/]src[\\/]apps[\\/]/,
          name: 'custom-apps',
          chunks: 'all'
        },
        react_ui: {
          test: /[\\/]react-ui[\\/]/,
          name: 'react-ui',
          chunks: 'all'
        },
        modules: {
          test: /[\\/]node_modules[\\/]/,
          name: 'modules',
          chunks: 'all'
        },
        misc: {
          test: /[\\/]misc[\\/]/,
          name: 'misc',
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
      '@hubleto/react-ui': path.resolve(__dirname, '../react-ui'),
      '@hubleto/apps': path.resolve(__dirname, '../erp/apps'),
    },
  }
};
