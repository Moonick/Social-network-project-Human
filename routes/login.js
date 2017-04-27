var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;


router.get('/', function (req, res) {
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.render('login', {});
    }
});

router.post('/', function (req, res) {
    var db = req.db;
    var users = db.get('users');
    var userLogin = req.body;

    users.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            return res.send();
        } else if (!user) {
            res.render('login', { error: 'Invalid email or password.' });
        } else {
            bcrypt.compare(userLogin.password, user.password, function (error, isMatch) {
                if (error) return res.render('login', { error: 'Invalid email or password.' });
                if (!isMatch) return res.render('login', { error: 'Invalid email or password.' });
                if (isMatch) {
                    req.session.user = user;
                    res.redirect('/');
                }
            });
        }
    });
});
module.exports = router;