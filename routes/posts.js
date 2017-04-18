var express = require('express');
var router = express.Router();
var multer = require('multer');
var uploading = multer({ dest: 'uploads/' });


router.get('/', function (req, res) {
    var db = req.db;
    var posts = db.get('posts');
    posts.find({}, function (err, posts) {
        res.json(posts);
    });
});
router.post('/', uploading.any(), function (req, res) {
    var db = req.db;
    var posts = db.get('posts');
    console.log(req.body);
    // posts.insert(req.body);
    // console.log(req.body)
    res.redirect("/");
});

module.exports = router;