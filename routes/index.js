var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('users');
    collection.find({}).then(function(data) {
        res.render('index', { users: data });
    });
});

module.exports = router;