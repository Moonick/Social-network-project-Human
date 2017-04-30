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

var uploading = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            return cb(null, false)
        }
        cb(null, true)
    },
});

// =================== GET CURRENT USER ====================
router.get('/', function(req, res) {
    var db = req.db;
    var users = db.get('users');

    users.find({ _id: req.session.user._id }, ["_id", "fname", "lname", "fullName", "profileImageUrl", "coverPhotoUrl", "receiveFriendRequests", "sendFriendRequests", "friends"]).then(function(user) {
        res.json(user);
    });
});

// =================== GET USER PROFILE =======================
router.get('/:userId', function(req, res) {
    var db = req.db;
    var users = db.get('users');
    var userId = req.params.userId;

    users.find({ _id: userId }, ["_id", "fname", "lname", "fullName", "profileImageUrl", "coverPhotoUrl", "receiveFriendRequests", "sendFriendRequests", "friends"]).then(function(user) {
        res.json(user);
    });
});

// =================== SEARCH USER BY NAME ====================
router.get('/find/:userName', function(req, res) {
    var db = req.db;
    var users = db.get('users');
    var userName = new RegExp(req.params.userName, "i");

    users.find({ fullName: userName, _id: { $ne: req.session.user._id } }, ["_id", "fname", "lname", "fullName", "profileImageUrl", "coverPhotoUrl", "friends"]).then(function(data) {
        res.json(data);
    });

});

//================== SEND FRIEND REQUEST ==============
router.post('/friendRequest/:userId', function(req, res) {
    var db = req.db;
    var users = db.get('users');
    var userId = req.params.userId;
    users.find({ _id: req.session.user._id, sendFriendRequests: { $in: [userId] } }).then(function(data) {
        if (data.length == 0) {
            users.update({ _id: req.session.user._id }, { $addToSet: { sendFriendRequests: userId } });
            users.update({ _id: userId }, { $addToSet: { receiveFriendRequests: req.session.user._id } });
        }
        res.end();
    });
});

//================== LOAD USER POSTS ==================
router.get('/posts/:userId', function(req, res) {
    var db = req.db;
    var posts = db.get('posts');
    var userID = req.params.userId;

    posts.find({ user_id: userID }, { sort: { date: -1 } }).then(function(posts) {
        res.json(posts);
    });
});

//================== ADD NEW POST ===================
router.post('/newpost', uploading.any(), function(req, res) {
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
        userProfImg: req.session.user.profileImageUrl,
        postedBy: req.session.user.fname + " " + req.session.user.lname,
        date: date.toLocaleString(),
        taggedFriends: [],
        location: "",
        comments: [],
        likes: []
    };

    posts.insert(newPost);
    res.redirect("/#/profile/" + req.session.user._id);
});
// ===================== ADD NEW PHOTO ============================
router.post('/uploadphoto', uploading.any(), function(req, res) {
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
    res.redirect("/#/profile/"+req.session.user._id);
});

// ================ ADD AVATAR/COVER PHOTO ======================
router.post('/coverAvatar', uploading.any(), function(req, res) {
    var db = req.db;
    var photos = db.get('photos');
    var users = db.get("users");
    var posts = db.get('posts');
    var comments = db.get('comments');
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
        users.update({ _id: req.session.user._id }, { $set: { coverPhotoUrl: req.files[0].path } }).then(function(data) {
            photos.insert(picture);
            res.redirect('/#/profile/' + req.session.user._id);
        });
    } else if (req.files[0].fieldname === "avatar") {
        //===== update profile image in comments and posts ====================
        posts.update({ user_id: req.session.user._id }, { $set: { userProfImg: req.files[0].path } }, { multi: true });
        comments.update({ user_id: req.session.user._id }, { $set: { userProfImg: req.files[0].path } }, { multi: true });
        users.update({ _id: req.session.user._id }, { $set: { profileImageUrl: req.files[0].path } }).then(function(data) {
            photos.insert(picture);
            res.redirect('/#/profile/' + req.session.user._id);
        });

    }
});
// ======================= LOAD FRIEND REQUESTS ==================

router.get('/requestFriends', function(req, res) {
    var db = req.db;
    var users = db.get('users');
    var userID = req.session.user._id;
    var userReceiveFriendRequests;
    var usersRequests = [];

    users.find({ _id: userID }).then(function(usersReceive) {
        userReceiveFriendRequests = usersReceive[0].receiveFriendRequests;
        console.log(userReceiveFriendRequests);
        users.find({ _id: { $in: usersReceive[0].receiveFriendRequests } }, ["_id", "fname", "lname", "fullName", "profileImageUrl", "coverPhotoUrl", "friends"]).then(function(usersFriendRequests) {
            
            res.json(usersFriendRequests);
        });

    });
});

// ====================== CONFIRM FRIEND REQUEST ====================
router.post('/confirm/:reqFriendId', function(req, res) {
    var db = req.db;
    var users = db.get('users');
    var userID = req.session.user._id;
    var reqFriendId = req.params.reqFriendId;

    users.update({ _id: userID }, { $pull: { receiveFriendRequests: reqFriendId } });
    users.update({ _id: userID }, { $addToSet: { friends: reqFriendId } });

    users.update({ _id: reqFriendId }, { $pull: { sendFriendRequests: userID } });
    users.update({ _id: reqFriendId }, { $addToSet: { friends: userID } });
    res.status(201);
});

// ====================== REJECT FRIEND REQUEST ====================
router.post('/reject/:reqFriendId', function(req, res) {
    var db = req.db;
    var users = db.get('users');
    var userID = req.session.user._id;
    var reqFriendId = req.params.reqFriendId;

    users.update({ _id: userID }, { $pull: { receiveFriendRequests: reqFriendId } });
    users.update({ _id: reqFriendId }, { $pull: { sendFriendRequests: userID } });
    res.status(201);
});

// ====================== LOAD ALL FRIENDS =========================
router.get('/friends/:userId', function(req, res) {
    var db = req.db;
    var users = db.get('users');
    var userId = req.params.userId;
    var userFriends = [];

    users.find({ _id: userId }).then(function(user) {
        userFriends = user[0].friends;

        users.find({ _id: { $in: userFriends } }, ["_id", "fname", "lname", "fullName", "profileImageUrl", "coverPhotoUrl", "friends"]).then(function(friends) {
            res.json(friends);
        });
    });
});


module.exports = router;