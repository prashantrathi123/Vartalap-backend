
let mongoose = require("mongoose"),
  bcrypt = require("bcryptjs");

let Schema = mongoose.Schema;

let message=new Schema({

author:{
	type:String,
},
time:{
	type:String,
},
message:{
	type:String,
},
multipart:{
	type:Array,
},
multiparttype:{
	type:String,
},

});

let messageschema = new Schema({
  conversationname: {
    type: String,
    required: true
  },
  creatorid:{
    type:String,
  },
  welcome:{
    type:String
  },
  members:{
  	type:Array,
  },
messages:[message],
});




var messages= mongoose.model('messages', messageschema);
module.exports.message=messages;