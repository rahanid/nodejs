var express =  require('express');
var app = express();
var {getCollection} = require('../dbUtils/dbUtils.js');

//service to list users
app.route('/users').get(function (req, res) {
        getCollection('users').then(docs => {
                res.status(200).json(docs);
        });
});

// server to serve the requests
var server = app.listen(9000, function (req, res) {
        console.log('service up aayiduchi');
});