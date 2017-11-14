module.exports = {
  entry: './dist/src/BlotResize.js',
  output: {
    filename: 'index.js',
    path: `${__dirname}/dist`,
    libraryTarget: 'umd',
    library: 'QuillBlotResize',
  },
};
