
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../../webpack.dev.config.js')
  const compiler = webpack(config)
  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
}
app.use(express.static(__dirname +'./../../public'));
app.listen(port);
