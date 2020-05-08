var http= require('http');
var express =  require('express');
var app =  express();
var mongo = require('mongodb').MongoClient;
var dburl = "mongodb://localhost:27017?useUnifiedTopology=true";


//service to list users
app.route('/users').get(function(req,res){
  getDb().then(db =>{
    getCollection(db,"userProfile").then((docs)=>{
       // console.log(docs);
        res.status(200).json(docs); 
    });
});
});

//function to get db connection
function getDb(){
    return new Promise(function(resolve,reject){
        mongo.connect(dburl, function (err,conn){
            if (err){
                console.error('Error aquiring db connection');
                return reject(err);
            }
            var db = conn.db('twitter');
            return resolve (db);
        });
    });
}

//function to get users list
function getCollection (database, name) {
    return new Promise(function(resolve, reject) {
       database.collection(name).find().toArray( function(err, docs) {
        if (err) {
          return reject(err);
        }
        return resolve(docs);
      });
    });
  }

// server to serve the requests
var server = app.listen(9000,function(req,res){
console.log ('service up aayiduchi');
});