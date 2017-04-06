var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var db = req.db;
  var collection = db.get('users');
  collection.find({},{},function(err, data){
    console.log(data);
    res.render('index', {name : data});
  });

});

module.exports = router;
