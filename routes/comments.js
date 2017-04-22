var express = require('express');
var router = express.Router();


//------------------load all comments ------------
router.get('/:postId', function(req, res) {
    var db = req.db;
    var comments = db.get('comments');
    var postID = req.params.postId;

    comments.find({ postId: postID }).then(function(data) {
        res.json(data);
    });
});

//-----------------add comment to a post --------

router.post('/', function(req, res) {
    var db = req.db;
    var comments = db.get('comments');
    var comment = req.body;

    comments.insert(comment).then(function(data) {
        res.status(201).json(data);
    });
});

//-------------- like a comment --------
router.put('/:comId', function(req, res) {
    var db = req.db;
    var comments = db.get('comments');
    var comId = req.params.comId;


    comments.find({ _id: comId, likes: { $in: [req.session.user._id] } }).then(function(data) {
        if (data.length == 0) {
            comments.update({ _id: comId }, { $addToSet: { likes: req.session.user._id } });

        } else {
            comments.update({ _id: comId }, { $pull: { likes: req.session.user._id } });
        }

    });

    comments.find({ _id: comId }).then(function(data) {
        res.send(data);
    });
});

module.exports = router;