var cloudinary = require('cloudinary')
// Mongoose Model
var Model = require('./model')

// configure Cloudinary with you Cloudinary credentials

cloudinary.config({
    cloud_name: "hoffman-house",
    api_key: "237152551455529",
    api_secret: "ekb3sIe-3B0ALRY0j_KzSAve7aw"
})

module.exports = {
    new: function (req, res) {
        res.render('pages/new')
    },
    create: function (req, res) {
        // Use Cloudinary uploader to upload to cloudinary server
        // Access files uploaded from the browser using req.files
        cloudinary.uploader.upload(req.files.images.path, function(result) {
            // Create a post model
            // by assembling data as object and passing to Model instance
        var post = new Model({
            title: req.body.title,
            description: req.body.description,
            created_at: new Date(),
            // store the url in a DB for future use
            image: result.url,
            image_id: result.public_id
        })
        // persist by saving
        post.save(function (err) {
            if(err){
                res.send(err)
            }
            // Redirect
            res.redirct('/')
            })
        })
    }
}