const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');
const _debug =  require('debug');

const debug = _debug('app:server');
const port = 3001;
const app = express();

const compiler = webpack(webpackConfig);
const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    }
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.join(__dirname,'../', '/src/static')));
// app.get('*', function response(req, res) {
//     res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
//     res.end();
// });

app.listen(port, 'localhost', function onStart(err) {
    if (err) {
        debug(err);
    }
    debug(`==> server is now running at http://localhost:${port}/ .`);
});