var mongoose = require('mongoose')
var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')

var app = express()
app.use(morgan('dev'))
app.use(express.static(__dirname + "/public"))

mongoose.connect('mongodb+srv://Adam_Hoffman:SLUvkwx943@cluster0-f2wbh.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.set("port", process.env.PORT || 4000)

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({
    extended: true
}))

require('./routes')(app)

var port = app.get('port')
app.listen(port, function () {
    console.log('App running at' + port)
})

