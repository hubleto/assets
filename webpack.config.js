const path = require('path');
const fs = require('fs');

function loadEntriesFromRepository(folder) {
  let entries = [];
  if (fs.lstatSync(folder).isDirectory()) {
    fs.readdirSync(folder).forEach(function(app){
      const stat = fs.statSync(folder + '/' + app);
      const loaderEntry = folder + '/' + app + '/Loader';
      if (stat && stat.isDirectory() && fs.existsSync(loaderEntry + '.tsx')) {
        entries.push(loaderEntry);
      }
    });
  }
  return entries;
}

module.exports = (env, arg) => {
  return {
    entry: {
      main: [
        './src/Main',
        ...loadEntriesFromRepository(path.resolve(__dirname, '../erp/apps')),
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
        '@hubleto/react-ui/core': path.resolve(__dirname, '../react-ui/core'),
        '@hubleto/react-ui/ext': path.resolve(__dirname, '../react-ui/ext'),
        // '@hubleto/framework': path.resolve(__dirname, '../framework'),
        '@hubleto/apps': path.resolve(__dirname, '../erp/apps'),
      },
    }
  }
};
