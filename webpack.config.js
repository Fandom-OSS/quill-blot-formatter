module.exports = {
  entry: './build/index.js',
  output: {
    filename: 'quill-blot-resize.min.js',
    path: `${__dirname}/build`,
    libraryTarget: 'umd',
    library: 'QuillBlotResize',
  },
  externals: {
    quill: 'Quill',
  },
};
