var http= require('http');
var express =  require('express');
var app =  express();
var dburl = "mongodb://localhost:27017/nodejs?";
var mongoose =  require  ('mongoose');
var userSchema = new mongoose.Schema({
  id: {type: Number, required: true, index: true, unique: true},
  name: {type: String, required: true},
  desc: {type: String}
});
var userModel = mongoose.model("users",userSchema);

// server to serve the requests
var server = app.listen(9001,function(req,res){
console.log ('mongoose service is up');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create user(s)
app.post('/users',function(req,res){
  mongoose.connect(dburl,{ useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex: true});
  console.log(JSON.stringify(req.body));
  new userModel(req.body).save(function(err){
    if (err){
      console.log('Error is ----> '+err);
      console.error('save failed');
      res.status(500).send('Save failed');
    }
    else{
      console.log('searching for id : '+req.body.id);
      userModel.find({id: +req.body.id}).exec(function(err,doc){
        if (err){
          console.err('doc not found');
        }
        else { 
          console.log('rec ==> '+doc);
          res.status(202).json(doc);
        }
      });
    }
  });
});



