const path = require('path');
const request = require('request');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

function createWebpackMiddleware(compiler, publicPath) {
  return webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath,
    silent: true,
    stats: 'errors-only'
  });
}

module.exports = function addDevMiddlewares(app, webpackConfig) {
  const compiler = webpack(webpackConfig);
  const middleware = createWebpackMiddleware(compiler, webpackConfig.output.publicPath);

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  app.post('/api/*', (req, res) => {
    var url = process.env.BACK_END_HOST + req.url;
    console.log("POST " + url);
    var r = request.post({ uri: url, json: req.body });
    req.pipe(r).pipe(res);
  });

  app.get('/api/*', (req, res) => {
    var url = process.env.BACK_END_HOST + req.url;
    console.log("GET " + url);
    var r = request(url);
    req.pipe(r).pipe(res);
  });

  app.get('*', (req, res) => {
    console.log("*" + req.url);
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};
