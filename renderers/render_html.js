let fs = require('fs');
let Error_object = require('./error');
let dao = require('../data_access/dao');
let mime = require('mime');

function handleHomeData(rawData, res) {
    let users = new dao.excuteQuery('Select * from contacts');
    let ID = '';
    let NAME = '';
    let PHONENUMBER = '';
    users.on('data', sqlData => {
        let contacts = ``;
        sqlData.forEach(element => {
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
            </tr>`;
        });
        res.end(rawData.toString().replace(/{{data}}/g, contacts));
    })
}

function view(nameFile, req, res, callback) {
    let path = `./view/public/${nameFile}`;
    fs.stat(path, (err, stats) => {
        if (err) {
            Error_object.Error404(res);
            throw err;
        }
        console.log(path);
        fs.readFile(path, (err, rawData) => {
            if (err) {
                Error_object.Error404(res);
                throw err;
            }
            if (callback !== undefined)
                callback(rawData, res);
            else res.end(rawData);
        });
    })
}

function viewHtml(nameFile, req, res, dataHtml) {
    let path = `./view/public/${nameFile}`;
    fs.stat(path, (err, stats) => {
        if (err) {
            Error_object.Error404(res);
            throw err;
        }
        console.log(path);
        fs.readFile(path, (err, rawData) => {
            if (err) {
                Error_object.Error404(res);
                throw err;
            }
            for (const prop in dataHtml) {
                console.log(`obj.${prop} = ${dataHtml[prop]}`);
                let re = new RegExp(prop, "g");
                rawData =  rawData.toString().replace(re,dataHtml[prop]);
            }
            res.end(rawData);
        });
    })
}

module.exports = {
    view: view,
    viewHome: (nameFile, req, res) => {
        view(nameFile, req, res, handleHomeData);
    },
    viewHtml: viewHtml
}