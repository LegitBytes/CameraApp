/* eslint-disable max-len */
const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const glob = require('glob');
const _ = require('lodash');

const migrationFiles = glob.sync('./api_database/migrations/*');
const migrationEntries = migrationFiles.reduce((acc, migrationFile) => {
  const entryName = migrationFile.substring(
      migrationFile.lastIndexOf('/') + 1,
      migrationFile.lastIndexOf('.'),
  );
  acc['data_review_api/src/functions/migrate/migrations/' + entryName] = migrationFile;
  return acc;
}, {});

/*
This line is only required if you are specifying `TS_NODE_PROJECT` for whatever reason.
 */
// delete process.env.TS_NODE_PROJECT;

module.exports = {
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: _.assign({...migrationEntries}, slsw.lib.entries),
  // entry: slsw.lib.entries,
  devtool: slsw.lib.webpack.isLocal ? 'eval-cheap-module-source-map' : 'source-map',
  resolve: {
    extensions: ['.mjs', '.json', '.ts'],
    symlinks: false,
    cacheWithContext: false,
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.paths.json',
      }),
    ],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  optimization: {
    concatenateModules: false,
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack'),
          ],
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {from: 'api_database/config/rds-combined-ca-bundle.pem', to: 'data_review_api/src/functions/rds-combined-ca-bundle.pem'},
      ]}),
  ],
  stats: 'minimal',
};
