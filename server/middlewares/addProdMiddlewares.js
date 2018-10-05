const path = require('path');
const express = require('express');
const compression = require('compression');

module.exports = function addProdMiddlewares(app, options) {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.use(publicPath, express.static(outputPath));

  app.get('/api/*', (req, res) => {
    var url = process.env.BACK_END_HOST + req.url;
    var r = null;
    if (req.method === 'POST') {
      r = request.post({ uri: url, json: req.body });
    } else {
      r = request(url);
    }

    req.pipe(r).pipe(res);
  });
  app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
};
