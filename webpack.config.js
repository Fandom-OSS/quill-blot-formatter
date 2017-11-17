module.exports = {
  entry: './dist/index.js',
  output: {
    filename: 'quill-blot-formatter.min.js',
    path: `${__dirname}/dist`,
    libraryTarget: 'umd',
    library: 'QuillBlotFormatter',
  },
  externals: {
    quill: 'Quill',
  },
};
