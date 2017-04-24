var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + ".jpg");
    }
});

var uploading = multer({ storage: storage });

//-----------------load all photos --------------------
router.get('/', function(req, res) {
    var db = req.db;
    var photos = db.get('photos');
    photos.find({}, { sort: { date: -1 } }, function(err, photos) {
        res.json(photos);
    });
});

//-------------------new post------------------------
router.post('/', uploading.any(), function(req, res) {
    var db = req.db;
    var posts = db.get('posts');
    var date = new Date();
    var picture;

    if (req.files[0] == undefined) {
        picture = "";
    } else {
        picture = req.files[0].path;
    }

    var newPost = {
        user_id: req.session.user._id,
        text: req.body.text,
        picture: picture,
        postedBy: req.session.user.fname + " " + req.session.user.lname,
        date: date.toLocaleString(),
        taggedFriends: [],
        location: "",
        comments: [],
        likes: []
    }

    posts.insert(newPost);
    res.redirect("/");
});

// //--------------like-----------------------
// router.post('/:postId', function(req, res) {
//     var db = req.db;
//     var posts = db.get('posts');
//     var postId = req.params.postId;

//     posts.find({ _id: postId, likes: { $in: [req.session.user._id] } }).then(function(data) {
//         if (data.length == 0) {
//             posts.update({ _id: postId }, { $addToSet: { likes: req.session.user._id } });

//         } else {
//             posts.update({ _id: postId }, { $pull: { likes: req.session.user._id } });
//         }

//     });

//     posts.find({ _id: postId }).then(function(data) {
//         res.send(data);
//     })

// });
module.exports = router;