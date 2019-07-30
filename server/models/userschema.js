
"use strict";

let mongoose = require("mongoose"),
  bcrypt = require("bcryptjs");

let Schema = mongoose.Schema;

let dp = new Schema({
  fieldname: {
    type: String,
    default: "a"
  },

  originalname: {
    type: String,
    default: "a"
  },

  encoding: {
    type: String,
    default: "a"
  },

  mimetype: {
    type: String,
    default: "a"
  },

  destination: {
    type: String,
    default: "a"
  },

  filename: {
    type: String,
    default: "a"
  },

  path: {
    type: String,
    default: "a"
  },

  size: {
    type: Number,
    default: 12
  }
});

let chat=new Schema({
  id:{
    type:String,
  },
  conversationname:{
    type:String,
  },
  members:{
    type:Array,
  }

});

let userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  pNo: {
    type: String,
    required: true,
    unique: true
  },
  profilepic: {
    type: { dp }
  },
  chats:{
    type:[chat],
  }
});


module.exports.userSchema = userSchema;


var User =module.exports= mongoose.model('user', userSchema);


module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByUsername = function(username, callback){
    var query = {pNo: username};
    User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}
