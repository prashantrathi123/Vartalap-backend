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


/*router.post('/issignedin',cors(),async function(req,res){

   console.log(req.user);

	res.json({ds:"done"});
});*/

router.post('/issignedin',async (req,res)=>{
let w=await User.find({});
   
   if(req.user){
   //	console.log(req.user);
   //	console.log(w);
      let ps= await post.find({email:req.user.email});
     // console.log(ps);

	res.json({ds:"done",w:w,post:ps,email:req.user.email,chat:req.user.chats});}
  else{
   res.json({ds:"notdone"}); 
  }
});



module.exports = router;