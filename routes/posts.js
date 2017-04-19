var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + ".jpg");
    }
});

var uploading = multer({ storage: storage })


router.get('/', function (req, res) {
    var db = req.db;
    var posts = db.get('posts');
    posts.find({}, { sort: { date: -1 } }, function (err, posts) {
        res.json(posts);
    });
});
router.post('/', uploading.any(), function (req, res) {
    var db = req.db;
    var posts = db.get('posts');
    // posts.insert(req.body);
    function convertDate(dateString) {
        var date = new Date(dateString);
        return date.getHours()+":"+date.getMinutes()+" "+date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
    }
    var newPost = {
        user_id: req.session.user._id,
        text: req.body.text,
        picture: req.files[0].path,
        postedBy: req.session.user.fname + " " + req.session.user.lname,
        date: convertDate(Date.now()),
        taggedFriends: [

        ],
        location: "",
        comments: [],
        likes: 10
    }
    posts.insert(newPost);
    res.redirect("/");
});


module.exports = router;