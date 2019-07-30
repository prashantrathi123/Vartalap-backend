
let mongoose = require("mongoose"),
  bcrypt = require("bcryptjs");

let Schema = mongoose.Schema;

let postschema=new Schema({

posts:{
	type:Array,
},
likes:{
	type:Number,
},
caption:{
	type:String,
},
comments:{
	type:Array,
},
time:{
   type:String,
}

});

let postdata = new Schema({
  email: {
    type: String,
    required: true
  },
posts:[postschema],
});

module.exports.postdata = postdata;


var post = mongoose.model('postdata', postdata);
module.exports.post=post;