const onCreate = require('./onCreate')
const onUpdate = require('./onUpdate')
const onDelete = require('./onDelete')

const collection = 'products'

exports.onCreateProduct = onCreate(collection)
exports.onUpdateProduct = onUpdate(collection)
exports.onDeleteProduct = onDelete(collection)
