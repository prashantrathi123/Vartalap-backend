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

router.post('/all',async (req,res)=>{
let w=await User.find({});
   
   if(req.user){
   //	console.log(req.user);
   //	console.log(w);
      let ps= await post.find({});
      let p= await post.aggregate([
         {$unwind:"$posts"},
         {$sort:{"posts.time":-1}}
        ]);
      console.log(p);

	res.json({ds:"done",w:w,post:p,email:req.user.email,chat:req.user.chats});}
  else{
   res.json({ds:"notdone"}); 
  }
});



module.exports = router;