let renderer = require('../../renderers/render_html');
let querystring = require('querystring');
let dao = require('../../data_access/dao');

module.exports.edit = function (req, res) {
    if (req.method.toUpperCase() === 'GET') {
        let query = querystring.parse(req.url.split('?')[1]);
        console.log(query);
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Accept-Charset': 'utf-8'
        });
        renderer.viewHtml('form.html', req, res,{
            "{{ID}}": query.ID,
            "{{NAME}}": query.NAME,
            "{{PHONENUMBER}}" : query.PHONENUMBER,
            "{{PATH}}": "/edit"
        });
    } else if (req.method.toUpperCase() === 'POST') {
        req.setEncoding('utf8');
        req.on('data', data => {
            let query = querystring.parse(data);
            let cmd = `UPDATE contacts SET NAME = '${query.NAME}', PHONENUMBER = '${query.PHONENUMBER}' WHERE ID = '${query.ID}'`;
            let sql = new dao.excuteQuery(cmd);
            sql.on('data', data => {
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
        })
        
    }
}