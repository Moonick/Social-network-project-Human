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

var uploading = multer({ storage: storage });

router.get('/', function (req, res) {
    var currentUser = {
        fname: req.session.user.fname,
        lname: req.session.user.lname,
        profImgUrl: req.session.user.profileImageUrl,
        userId: req.session.user._id,
        coverPhotoUrl:req.session.user.coverPhotoUrl
    }
    res.json(currentUser);
});

//-------------load user posts -----------------
router.get('/posts', function (req, res) {
    var db = req.db;
    var posts = db.get('posts');
    var userID = req.session.user._id;

    posts.find({ user_id: userID }, { sort: { date: -1 } }).then(function (posts) {
        res.json(posts);
    });
});

//-------------------new post------------------------
router.post('/newpost', uploading.any(), function (req, res) {
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
    res.redirect("/#/profile");
});
// ===================== add new photo ============================
router.post('/uploadphoto', uploading.any(), function (req, res) {
    var db = req.db;
    var photos = db.get('photos');
    var date = new Date();


    if (req.files[0] == undefined) {
        res.send("");
    } else {
        var picture = {
            user_id: req.session.user._id,
            path: req.files[0].path,
            title: req.body.title,
            date: date.toLocaleString(),
            taggedFriends: [],
            location: req.body.location,
            comments: [],
            likes: []
        };
    }

    photos.insert(picture);
    res.redirect("/#/profile");
});
router.post('/coverAvatar', uploading.any(), function (req, res) {
    var db = req.db;
    var photos = db.get('photos');
    var users = db.get("users");
    var date = new Date();
    var picture = {
        user_id: req.session.user._id,
        path: req.files[0].path,
        title: req.body.title,
        date: date.toLocaleString(),
        taggedFriends: [],
        location: req.body.location,
        comments: [],
        likes: []
    };
    if (req.files[0].fieldname === "cover") {
        users.update({ _id: req.session.user._id }, { $set: { coverPhotoUrl: req.files[0].path } }).then(function (data) {
            res.redirect('/#/profile');
        });
    } else if (req.files[0].fieldname === "avatar") {
        users.update({ _id: req.session.user._id }, { $set: { profileImageUrl: req.files[0].path } }).then(function (data) {
            res.redirect('/#/profile');
        });
    }
});
module.exports = router;