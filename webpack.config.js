const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: { index: path.resolve(__dirname, 'built/index.js') },
  output: {
    filename: './[name].min.js',
    path: path.resolve(process.cwd(), 'built'),
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['js/*', 'css/*', 'assets/*'],
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, './content/themes/bloginn'),
        to: path.join(__dirname, '../ghost-themes/bloginn')
      }
    ])
  ]
};
