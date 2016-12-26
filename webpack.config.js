module.exports = {
  entry: './source/index.js',
  output: {filename: 'bundle.js'},
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      }
    ]
  }
}
