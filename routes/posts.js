var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    var db = req.db;
    var posts = db.get('posts');
    posts.find({}, function(err, posts) {
        res.json(posts);
    });
});

module.exports = router;