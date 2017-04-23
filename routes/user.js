var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    var currentUser = {
        fname: req.session.user.fname,
        lname: req.session.user.lname,
        profImgUrl: req.session.user.profileImageUrl,
        userId: req.session.user._id
    }
    res.json(currentUser);
});

router.get('/posts', function (req, res) {
    var db = req.db;
    var posts = db.get('posts');
    var userID = req.session.user._id;

    posts.find({ user_id: userID }, { sort: { date: -1 } }).then(function (posts) {
        res.json(posts);
    });
});
module.exports = router;