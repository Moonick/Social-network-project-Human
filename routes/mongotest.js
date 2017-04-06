var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongo ds151060.mlab.com:51060/social-network -u alen -p alen1234');

var users = db.get('users');
users.insert({ name: "Zvezdelin", age: "3.14" });