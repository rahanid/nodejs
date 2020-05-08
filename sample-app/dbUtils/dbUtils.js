
var mongo = require('mongodb');
var dburl = "mongodb://localhost:27017?useUnifiedTopology=true";


//function to get db connection
function getDb(){
  return new Promise(function(resolve,reject){
      mongo.connect(dburl, function (err,conn){
          if (err){
              console.error('Error aquiring db connection');
              return reject(err);
          }
          var db = conn.db('nodejs');
          return resolve (db);
      });
  });
}

exports.getCollection = (name) => {
  return new Promise(function (resolve, reject) {
    getDb().then(database => {
      database.collection(name).find().toArray(function (err, docs) {
        if (err) {
          return reject(err);
        }
        return resolve(docs);
      });
    });
  });
}