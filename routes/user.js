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

var uploading = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            return cb(null, false)
        }
        cb(null, true)
    },
});

// =================== GET CURRENT USER ====================
router.get('/', function (req, res) {
    var currentUser = {
        fname: req.session.user.fname,
        lname: req.session.user.lname,
        profImgUrl: req.session.user.profileImageUrl,
        userId: req.session.user._id,
        coverPhotoUrl: req.session.user.coverPhotoUrl
    }
    res.json(currentUser);
});
// =================== GET USER BY NAME ====================
router.get('/find/:userName', function (req, res) {
    var db = req.db;
    var users = db.get('users');
    var userName = new RegExp(req.params.userName, "i");

    users.find({ fullName: userName }, ["_id", "fname", "lname", "fullName", "profileImageUrl", "coverPhotoUrl", "friends"]).then(function (data) {
        res.json(data);
    });

});

//================== SEND FRIEND REQUEST ==============
router.post('/friendRequest/:userId', function (req, res) {
    var db = req.db;
    var users = db.get('users');
    var userId = req.params.userId;
    users.find({ _id: req.session.user._id, sendFriendRequests: { $in: [userId] } }).then(function (data) {
        if (data.length == 0) {
            users.update({ _id: req.session.user._id}, { $addToSet: { sendFriendRequests: userId } });
            users.update({ _id: userId}, { $addToSet: { receiveFriendRequests: req.session.user._id } });
        }
         res.end();
    });
   
});


//================== LOAD USER POSTS ==================
router.get('/posts', function (req, res) {
    var db = req.db;
    var posts = db.get('posts');
    var userID = req.session.user._id;

    posts.find({ user_id: userID }, { sort: { date: -1 } }).then(function (posts) {
        res.json(posts);
    });
});

//================== ADD NEW POST ===================
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
// ===================== ADD NEW PHOTO ============================
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

// ================ ADD AVATAR/COVER PHOTO ======================

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