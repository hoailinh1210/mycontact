let renderer = require('../../renderers/render_html');
let querystring = require('querystring');
let dao = require('../../data_access/dao');

module.exports.find = (req,res) => {
    if (req.method.toUpperCase() === 'GET'){
        let query;
        try{
            query = querystring.parse(req.url.split('?')[1]);
        }catch(err){
            console.log(err);
        }
        let cmd = `SELECT * FROM contacts where NAME = '${query.f_Name}'`;
        let sql = new dao.excuteQuery(cmd);
        sql.on('data',data => {
            console.log(data);
            let contacts = ``;
            data.forEach(element => {
                ID = element.ID;
                NAME = element.NAME;
                PHONENUMBER = element.PHONENUMBER;
                contacts += `
                <tr>
                    <th scope="row">${ID}</th>
                    <td>${NAME}</td>
                    <td>${PHONENUMBER}</td>
                    <td>
                        <a href="./edit?ID=${ID}&NAME=${NAME}&PHONENUMBER=${PHONENUMBER}">
                            <i class="material-icons">mode_edit</i>
                        </a>
                    </td>
                    <td>
                        <a href="./delete?ID=${ID}">
                            <i class="material-icons">delete</i>
                        </a>
                    </td>
                </tr>
             `;
            })
            renderer.viewHtml('index.html', req, res,{
                "{{data}}": contacts
            });
        })
        sql.on('error',data => {
            res.end('error');
        })
    }
    else{
        res.writeHead('404');
        res.end('File not found');
    }
}