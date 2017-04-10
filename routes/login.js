var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('login', {});
});

router.post('/', function(req, res) {
    var db = req.db;
    var users = db.get('users');
    users.findOne({ email: req.body.email, password: req.body.password }, function(err, user) {

        if (err) {
            return res.status(500).send();
        } else if (!user) {
            console.log('banani');
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

// router.get('/moni', function(req, res) {
//     console.log('hi');
//     console.log(req.session.user);

//     if (!req.session.user) {
//         return res.status(404).send();
//     }
//     res.status(200).send('lqlql');
// })


module.exports = router;