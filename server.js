// load the things we need
var express = require('express');
var session = require('express-session');
var app = express ();
var bodyParser = require("body-parser");
var https = require('https');
var fs = require('fs');
var vm = require('vm');



// loading and using sessions
app.use(bodyParser.urlencoded({ extended: true })); 
var session = require('express-session');
app.use(session({
    secret: "JonasThomasChristos",
    resave: false,
    saveUninitialized: true,
    cookie: { 
      path: '/', 
      httpOnly: true, 
    }
  }));

// Loading DataBase 

const dbs = require("./database.js");


// Testing connection on DB

try {
    dbs.sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/static');
app.use(express.static(__dirname + '/static'));

var ajd = new Date();
var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]; 
var date =" "+ajd.getDate() + " "+ months[ajd.getMonth()] + " "+ ajd.getFullYear();

//home page
app.get('/', function(req, res) {
 

    let noti = req.session.notif;
    if(req.session.username){
        res.render('home', {
            year: date,
            logine: req.session.username + " (Disconnect)",
            notif: noti});
    }else{
        res.render('home', { 
            year: date,
            logine : "Login/Register",
            notif: noti});
    }

});

//login page
app.get('/login', function(req, res) {
    if(req.session.username){
        res.render('login', {
            year: date,
            logine: req.session.username + " (Disconnect)",
            });
    }else{
        res.render('login', { 
            year: date,
            logine : "Login/Register"});
    }
});

//Connexion
app.post('/connect', async (req, res) => {
    
    let user = await dbs.user.findOne({ where : { name: req.body.username }});
    //Verify username
    if (user !== null){
        //verify password
        if (user.pswd === req.body.password){
            req.session.username = req.body.username;
                req.session.notif = "Bon retour, "+req.session.username+" !";
                res.redirect('/');
        }else{
            //Message of error
            req.session.notif = "Nom d'utilisateur ou/et mot de passe érroné.";
            res.redirect("/login");
        }
    }else{
        //Message of error
        req.session.notif = "Nom d'utilisateur ou/et mot de passe érroné.";
        res.redirect("/login");
    }
    
});

//Regitering
app.post('/newUser', async (req, res) =>{

    const user = await dbs.user.findOne({where : { name: req.body.username }});
    console.log(user);
    const email = await dbs.user_email.findOne({where : {mail : req.body.email}});
    console.log(email);

    //Verify username
    if (user === null){

        //Verify Email
        if (email === null){
            let newUser = await dbs.user.create({name : req.body.username, pswd : req.body.password});
            console.log("c est bon 2 : " + newUser.name );
            await dbs.user_email.create({mail : req.body.email , user_name : newUser.name});
            req.session.username = req.body.username;
            req.session.notif = "Bienvenue sur notre site "+req.session.username+" !";
            console.log('connected')
            res.redirect('/');
        }else{
            req.session.notif = "L'e-mail que vous avez choisi: '"+req.body.mail+"' est déjà Utilisée.";
            console.log('email error');
            res.redirect("/login");
        }
    }else{
        req.session.notif = "Le nom d'utilisateur que vous avez choisi: '"+req.body.fname+"' est déjà pris, veuillez en choisir un nouveau.";
        console.log('name error');
        res.redirect("/login");
    }

});

//addEvent page
app.get('/addEvent', function(req, res) {
    if(req.session.username){
        res.render('addEvent', {
            year: date,
            logine: req.session.username + " (Disconnect)",
            });
    }else{
        res.render('addEvent', { 
            year: date,
            logine : "Login/Register"});
    }
});

//create the server
https.createServer({
    key: fs.readFileSync('static/key/key.pem'),
    cert: fs.readFileSync('static/key/cert.pem'),
    passphrase: 'ingi'
  }, app).listen(8080);
console.log('Go to https://localhost:8080');