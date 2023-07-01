const path = require('path');

module.exports = {
  mode: 'development', // Add this line

  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
