let mysql = require('mysql');
let EventEmitter = require('events').EventEmitter;
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'MyContact'
});

function excuteQuery(cmd) {
    EventEmitter.call(this);
    let emitter = this;
    connection.query(cmd, function (err, results, fields) {
        if (err) {
            emitter.emit('error',err);
            throw err;
        }
     //   console.log(results);
        emitter.emit('data',results);
        return results;
    });
}

excuteQuery.prototype = new EventEmitter();
module.exports.excuteQuery = excuteQuery;