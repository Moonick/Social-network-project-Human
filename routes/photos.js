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

//================== load all photos =========================
router.get('/', function(req, res) {
    var db = req.db;
    var photos = db.get('photos');
    var userId = req.session.user._id
    photos.find({ user_id: userId }, { sort: { date: -1 } }, function(err, photos) {
        res.json(photos);
    });
});

//================== like =========================
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
// ================ add avatar/cover ======================

module.exports = router;