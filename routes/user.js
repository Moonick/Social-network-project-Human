var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var currentUser = {
        fname: req.session.user.fname,
        lname: req.session.user.lname,
        profImgUrl: req.session.user.profileImageUrl,
        userId: req.session.user._id
    }
    res.json(currentUser);
});
module.exports = router;