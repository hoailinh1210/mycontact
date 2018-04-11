let http = require('http');
let router = require("./routers/router");
let port = 8123;
let hostname = "localhost";

let server = http.createServer((req, res) => {
    if (req.url === '/')
        router.index(req, res);
    else if (req.url === '/new') {
        router.form(req, res);
    } else if (req.url.split('?')[0] === '/edit') {
        router.edit(req, res);
    } else if (req.url.split('?')[0] === '/delete') {
        router.delete(req, res);
    } else if (req.url.split('?')[0] === '/find') {
        router.find(req, res);
    } else if (req.url === '/css/style.css')
        router.style(req, res);
}).listen(port, hostname, () => {
    console.log(`Server is running http://${hostname}:${port} `);
});