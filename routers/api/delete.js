let querystring = require('querystring');
let dao = require('../../data_access/dao')
module.exports.delete = (req,res) => {
    let query = querystring.parse(req.url.split('?')[1]);
    let cmd = `DELETE FROM contacts WHERE ID = ${query.ID}`;
    let sql = new dao.excuteQuery(cmd);
    sql.on('data', () => {
        res.writeHead(302, {
            "location": "/",
        } );
        res.end();
    })
    sql.on('error', () => {
        res.writeHead(302, {
            "location": "/",
        } );
        res.end(); 
    })
}