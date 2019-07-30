



let nodemailer = require("nodemailer");

var User = require('../models/userschema');
const morgan = require('morgan')
const dbConnection = require('../database/index') ;

var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");

const MongoStore = require('connect-mongo')(session);


const multer = require("multer");
const upload = multer({
  dest: "views/uploads/"
});

var posts = require('../models/postschema');
let post=posts.post;

//let addprop=propert.addproperty;

let express = require("express"),
  passport = require("passport"),
  router = express.Router(),
  path = require("path"),
  mongoose = require("mongoose");
  router.use(morgan('dev'));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());
var cors = require('cors') ;





/*
// Express Session
router.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
*/
router.use(
  session({
    secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false, //required
    saveUninitialized: false //required
  })
)

// Passport init
router.use(passport.initialize());
router.use(passport.session());








router.post("/register" ,(req, res) => {
 

    var password = req.body.password;
  var password2 = req.body.password2;

  if (password == password2){
    var newUser = new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      pNo: req.body.username
      
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
      res.end("done");
    });
  } else{
    res.status(500).send("{erros: \"Passwords don't match\"}").end()
  }
});


var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user){
         return done(null, false, {message: 'Unknown User'});
      }

      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid password'});
        }
      });
   });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});


router.post(
  "/login",  passport.authenticate("local"),(req, res) => {
    console.log(req.user);
    
   
  
   res.json({ds:"done",email:req.user.email});
    
  }
);


router.get('/user', function(req, res){
  
  if(req.user){
console.log("dsabubdjs");
  }
  res.send(req.user);
});


router.get("/logout", cors(),(req, res) => {
  req.logOut();
  res.end("done");
});


module.exports = router;
