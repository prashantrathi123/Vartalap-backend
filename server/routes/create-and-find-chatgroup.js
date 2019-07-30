let express = require('express'),
    passport = require('passport'),
    router = express.Router(),
    path = require('path'),
    mongoose = require('mongoose');
     var cors = require('cors') ;
var User = require('../models/userschema');  
var posts = require('../models/postschema');
let post=posts.post;   

let permission=require('../middleware/loginmiddleware');
let adminpermission=permission.adminpermission; 
let radminpermission=permission.radminpermission;

var messages = require('../models/messageschema');
let message=messages.message; 


router.post('/creategroup',async (req,res)=>{

  let response={
  	 conversationname:req.body.conversationname,
  	 creatorid:"yep",
     welcome:"Welcome to Vartalap by Prashant Rathi",
     members:req.body.members,
     messages:[],
  }


  let u = await message.aggregate([
   
    { $match: { "conversationname": response.conversationname,"members":{$eq:response.members} } },
  ]);

console.log(u);
  if(u.length==0){
   let w =await message.create(response);
  
   console.log(w);
   for(var i=0;i<response.members.length;i++){
   	let rs=[{
   		id:w._id,conversationname:response.conversationname,members:response.members
   	}]
   	console.log(response.members[i]);
   	let q=await User.find({});
   	//console.log(q);
  let s= await User.findOneAndUpdate(
   
     {email:response.members[i]}  ,
    {$push:{chats:rs}}
  );

console.log(s)
}


    res.end("done");
}
else{
	res.end("notdone");
}
});



module.exports = router;