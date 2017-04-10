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
    users.findOne({ email: req.body.email }).then(function(data) {
        if (data.length == 0) {
            users.insert(req.body);
            res.send('0');
        } else {
            res.send('-1');
        }
    });

    // .then(function(err, data) {
    //     if (err) {
    //         collection.insert(req.body)
    //         res.render('index', { users: data });
    //     }
    //     console.log(req.body);

    //     console.log(data);
    //     console.log(err);

});

module.exports = router;