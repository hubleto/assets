import * as path from 'path';
import * as fs from 'fs';
import { pathToFileURL } from 'url';

export default async (env) => {
  const logCyan = (s) => console.log('\x1b[36m%s\x1b[0m', s);
  const logYellow = (s) => console.log('\x1b[33m%s\x1b[0m', s);
  const logGreen = (s) => console.log('\x1b[32m%s\x1b[0m', s);
  const logRed = (s) => console.log('\x1b[31m%s\x1b[0m', s);

  logCyan('HUBLETO ASSETS COMPILER');

  let loaderFullPath = path.resolve(process.cwd(), env.loader ?? 'assets.config.js');
  if (!fs.existsSync(loaderFullPath)) {
    loaderFullPath = path.resolve(process.cwd(), 'vendor', 'hubleto', 'assets', 'assets.config.js');
  }
  logYellow('Configuration file: ' + loaderFullPath);

  const loader = await import(pathToFileURL(loaderFullPath).href);

  const { entries, outputPath, aliases, modules } = loader.init();

  logGreen('');
  logGreen('entries = ' + Object.keys(entries).join(', '));
  logGreen('');
  logGreen('outputPath = ' + outputPath);
  logGreen('');
  logGreen('');

  return {
    entry: entries,
    output: {
      path: outputPath,
      publicPath: '/assets/',
      filename: '[name].js',
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
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          modules: { test: /[\\/]node_modules[\\/]/, name: 'modules', chunks: 'all', enforce: true },
          reactUi: { test: /[\\/]hubleto[\\/]src[\\/]react-ui[\\/]/, name: 'react-ui', chunks: 'all', enforce: true },
        },
      },
    },
    resolve: {
      modules: modules,
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css'],
      alias: aliases,
    }
  };
}