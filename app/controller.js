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
        cloudinary.v2.uploader.upload(req.files.images.path, {tags: req.body.tags}, function(result) {
            // Create a post model
            // by assembling data as object and passing to Model instance
        var post = new Model({
            title: req.body.title,
            description: req.body.description,
            created_at: new Date(),
            // store the url in a DB for future use
            image: req.body.image,
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
    },
    index: function (req, res) {
        Model.find({}, function (err, posts) {
            if(err) res.send(err)
            res.render(pages/index, {posts: posts})
        })
    },
    destroy: function (req, res) {
        var imageId = req.body.image_id
        // The destroy method take the Image Id which we need to remove
        cloudinary.v2.uploader.destroy(imageId, function (result) {
            // We also delete the image details from our DB
            Model.findOneAndRemove({image_id: imageId}, function (err) {
                if(err) res.send(err)
                res.redirect('/')
            })
        })
    },
    edit: function (req, res) {
        Model.find({image_id: req.params.id}, function (err, posts) {
            if(err) res.send(err)
            // render edit form with existing post
            res.render("pages/edit", {post: posts[0]})
        })
    },
    /***Update Action Method */
    update: function (req, res) {
        var oldName = req.body.old_id
        var newName = req.body.image_id
        cloudinary.v2.uploader.rename(oldName, newName,
            function(error, result) {
                if (error) res.send(error)
                Model.findOneAndUpdate({image_id: oldName},
                    Object.assign({}, req.body, {image: result.url}),
                    function (err) {
                        if (err) 
                            res.send(err)
                            res.redirct('/')                        
            })
        })
    }
}
    