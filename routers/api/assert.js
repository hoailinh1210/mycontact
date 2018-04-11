let renderer = require('../../renderers/render_html');

module.exports.style = (req, res) => {
    res.writeHead(200, 'Content-Type: text/html');
    renderer.view('css/style.css', req, res);
}