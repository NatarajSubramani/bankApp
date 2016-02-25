var express = require('express');
var app = express();
var ejs = require('ejs');
var crypto = require('crypto-js');
var login = require('./route/login.js');
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('index.ejs');
});

login(app);

app.listen(port);