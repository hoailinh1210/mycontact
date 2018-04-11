let renderer = require('../../renderers/render_html');
let querystring = require('querystring');;
let dao = require('../../data_access/dao');
module.exports.form = function (req, res) {
    if (req.method.toUpperCase() === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Accept-Charset': 'utf-8'
        });
        renderer.viewHtml('form.html', req, res,{
            "{{NAME}}": "",
            "{{PHONENUMBER}}": "",
            "{{PATH}}": "/new"
        });
    } else if (req.method.toUpperCase() === 'POST') {
        req.setEncoding('utf8');
        req.on('data', data => {
            let query = querystring.parse(data);
            console.log(query.NAME+ ' ' + query.PHONENUMBER);
            let cmd = `INSERT INTO contacts(NAME,PHONENUMBER) values('${query.NAME}','${query.PHONENUMBER}')`;
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