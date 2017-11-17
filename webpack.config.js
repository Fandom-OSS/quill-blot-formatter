module.exports = {
  entry: './dist/index.js',
  output: {
    filename: 'quill-blot-resize.min.js',
    path: `${__dirname}/dist`,
    libraryTarget: 'umd',
    library: 'QuillBlotResize',
  },
  externals: {
    quill: 'Quill',
  },
};
