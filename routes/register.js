var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;


router.get('/', function(req, res, next) {
    res.render('register');
});

router.post('/', urlencodedParser, function(req, res, next) {
    var db = req.db;
    var users = db.get('users');
    var user = req.body;
    user.fullName = user.fname + " " + user.lname;
    user.profileImageUrl = "http://enadcity.org/enadcity/wp-content/uploads/2017/02/profile-pictures.png";
    user.friends = [];
    user.coverPhotoUrl = "";
    if (user.fname.length < 3 || user.lname.length < 3) {
        res.render('register', { error: "Your name must have at least 3 characters!" });
    } else {
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                users.find({ email: user.email }).then(function(data) {
                    if (data.length == 0) {
                        users.insert(user);
                        res.redirect('/login');
                    } else {
                        res.render('register', { error: 'Invalid email or password.' });
                    }
                });
            });
        });

    }
});

module.exports = router;