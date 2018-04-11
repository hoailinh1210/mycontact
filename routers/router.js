let routerIndex = require('./api/index');
let routerAssert = require('./api/assert');
let routerForm = require('./api/form');
let routerEdit = require('./api/edit');
let routerDelete = require('./api/delete');
let routerFind = require('./api/find');

module.exports.index = routerIndex.index;
module.exports.style = routerAssert.style;
module.exports.form = routerForm.form;
module.exports.edit = routerEdit.edit;
module.exports.delete = routerDelete.delete;
module.exports.find = routerFind.find;