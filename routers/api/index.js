let renderer = require('../../renderers/render_html')

module.exports.index = function (req, res) {
    res.writeHead(200, 'Content-Type: text/html');
    renderer.viewHome('index.html', req, res);
}