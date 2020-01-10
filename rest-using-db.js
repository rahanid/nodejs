var http= require('http');
var express =  require('express');
var app =  express();

var server = http.createServer(function(req,res){
    res.writeHead(200,'SUCCESS');
    res.end('My response');
});

server.listen(9000);



console.log("my rest client");

