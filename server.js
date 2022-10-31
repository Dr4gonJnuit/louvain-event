// load the things we need
var express = require('express');
var session = require('express-session');
var app = express ();
var bodyParser = require("body-parser");
var https = require('https');
var fs = require('fs');

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/static');
app.use(express.static(__dirname + '/static'));

//home page
app.get('/', function(req, res) {
    res.render('home.ejs');
});

//login page
app.get('/login', function(req, res) {
    res.render('login.ejs');
});

//addEvent page
app.get('/addEvent', function(req, res) {
    res.render('addEvent.ejs');
});

//create the server
https.createServer({
    key: fs.readFileSync('static/key/key.pem'),
    cert: fs.readFileSync('static/key/cert.pem'),
    passphrase: 'ingi'
  }, app).listen(8080);
console.log('Go to https://localhost:8080');