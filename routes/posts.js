var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    var db = req.db;
    var posts = db.get('posts');
    posts.find({}, function(err, posts) {
        res.json(posts);
    });
});
router.post('/', function(req, res) {
    var db = req.db;
    var posts = db.get('posts');
    // posts.insert(req.body);
    // console.log(req.body)

});

module.exports = router;