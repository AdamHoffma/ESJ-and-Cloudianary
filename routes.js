var controller = require("./app/controller")
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()

module.exports = function (app) {
    app.get('/', controller.index)
    app.get('/new', controller.new)
    // Use Middleware to handle uploaded files and access
    // uploaded files using req.files
    app.post('/create', multipartMiddleware, controller.create)
    app.post('destroy', controller.destroy)
    app.post('/edit', controller.edit)
    app.post('/update', controller.update)
}