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

console.log('Found ' + communityApps.length + ' community apps.');

let appEntries = {};

communityApps.map((app) => {
  const appName = /\/(.*?)\/Loader/.exec(app)[1];
  appEntries['community/' + appName] = { import: app, dependOn: 'main' };
})

export default {
  entry: {
    main: './src/Main',
    ...appEntries,
  },
  output: {
    path: path.resolve(__dirname, 'compiled/js'),
    filename: '[name].js',
    clean: true,
    chunkFilename: '[name].js',
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
    runtimeChunk: 'single',            // one shared runtime, no duplicate bootstraps
    splitChunks: {
      // delete your per-app cacheGroups; keep only shared code
      cacheGroups: {
        modules: { test: /[\\/]node_modules[\\/]/, name: 'modules', chunks: 'all', enforce: true },
        reactUi: { test: /[\\/]hubleto[\\/]src[\\/]react-ui[\\/]/, name: 'react-ui', chunks: 'all', enforce: true },
      },
    },
  },
  resolve: {
    modules: [
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