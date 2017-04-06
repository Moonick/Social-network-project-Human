var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://alen:alen1234@ds151060.mlab.com:51060/social-network');

var users = db.get('users');
users.insert({ name: "Zvezdelin", age: "3.14" });
urers.find({}, {})