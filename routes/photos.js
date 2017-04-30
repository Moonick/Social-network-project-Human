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

// router.get('/allfriendsrequests', function(req, res) {
//     console.log('here')
//     var db = req.db;
//     var users = db.get('users');
//     var userID = req.session.user._id;
//     var userReceiveFriendRequests;
//     var usersRequests = [];

//     users.find({ _id: userID }).then(function(usersReceive) {
//         userReceiveFriendRequests = usersReceive[0].receiveFriendRequests;
//         console.log(userReceiveFriendRequests);
//         users.find({ _id: { $in: usersReceive[0].receiveFriendRequests } }, ["_id", "fname", "lname", "fullName", "profileImageUrl", "coverPhotoUrl", "friends"]).then(function(usersFriendRequests) {

//             res.json(usersFriendRequests);
//         });

//     });
// });

//================== LOAD ALL PHOTOS ==================
router.get('/:userId', function(req, res) {
    var db = req.db;
    var photos = db.get('photos');
    var userId = req.params.userId;

    photos.find({ user_id: userId }, { sort: { date: -1 } }, function(err, photos) {
        res.json(photos);
    });
});

//================== LIKE A PHOTO ======================
router.post('/:photoId', function(req, res) {
    var db = req.db;
    var photos = db.get('photos');
    var photoId = req.params.photoId;

    photos.find({ _id: photoId, likes: { $in: [req.session.user._id] } }).then(function(data) {
        if (data.length == 0) {
            photos.update({ _id: photoId }, { $addToSet: { likes: req.session.user._id } });
        } else {
            photos.update({ _id: photoId }, { $pull: { likes: req.session.user._id } });
        }
    });

    photos.find({ _id: photoId }).then(function(data) {
        res.send(data);
    })
});


module.exports = router;