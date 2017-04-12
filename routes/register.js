var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/', function(req, res, next) {
    res.render('register');
});

router.post('/', urlencodedParser, function(req, res) {
    var db = req.db;
    var users = db.get('users');
    users.find({ email: req.body.email }).then(function(data) {
        if (data.length == 0) {
            users.insert(req.body);
            res.redirect('/login');
        } else {
            res.render('register', { error: 'Invalid email or password.' });
        }
    });

});

module.exports = router;