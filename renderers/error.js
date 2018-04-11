module.exports.Error404 = function (res) {
    console.log('err');
    res.writeHead(404);
    res.end('File not found');
}