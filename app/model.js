var mongoose = require('mongoose')
var Schema = mongoose.Schema

// create schema
var postSchema = new Schema({
    title: String,
    description: String,
    image: String,
    image_id: String,
    created_at: Date
})

// the schema is useless so far we need to create a model using it

var Post = mongoose.model('Post', postSchema)

module.exports = Post