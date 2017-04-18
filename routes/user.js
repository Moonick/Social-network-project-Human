var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    var currentUser={
        fname:req.session.user.fname,
        lname:req.session.user.lname
    }
    res.json(currentUser);
});
module.exports = router;