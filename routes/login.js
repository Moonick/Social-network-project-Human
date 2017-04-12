var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.render('login', {});
    }
});

router.post('/', function(req, res) {
    var db = req.db;
    var users = db.get('users');
    users.findOne({ email: req.body.email, password: req.body.password }, function(err, user) {
        if (err) {
            return res.send();
        } else if (!user) {
            res.render('login', { error: 'Invalid email or password.' });
        } else {
            if (req.body.password === user.password) {
                req.session.user = user;
                res.redirect('/');
            } else {
                res.render('login', { error: 'Invalid email or password.' });
            }
        }
    });
});

module.exports = router;