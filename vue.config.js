module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Pixel Art Institute of Chicago'
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/iiif-pixel-art/'
    : '/'
}