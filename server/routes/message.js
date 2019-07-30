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


router.post('/message',async (req,res)=>{
   var io = req.app.get('socketio');
//console.log(io.engine.clientsCount);
//console.log(Object.keys(io.sockets.connected))
let sid=Object.keys(io.sockets.connected);
/*console.log(req.body.author)*/
let d=new Date();
let rs=[{

author:req.user.email,
time:d,
message:req.body.message,
multipart:"no",
multiparttype:"nil",

}]
let ins=await message.update(
    {_id:req.body.author},
    {$push:{messages:rs}}
	);
let ans=await message.find({_id:req.body.author});
let em=[];
let members=ans[0].members;
console.log(members);
for(var i=0;i<sid.length;i++){
   console.log(io.sockets.connected[sid[i]].userid);

  for(var j=0;j<members.length;j++){

  	if(members[j]==io.sockets.connected[sid[i]].userid){
       em.push(sid[i]);
  	}
  }
}
console.log(em);
for(var i=0;i<em.length;i++){
 io.sockets.to(em[i]).emit('userSet', [{username: req.body.message,author:req.user.email,time:rs[0].time}]);}

    /* console.log(io.sockets.connected);*/ 

res.end("done");
});

router.post('/getmessage',async(req,res)=>{
let ans=await message.find({_id:req.body.id});
//console.log(ans);
res.send(ans[0].messages);

});

module.exports = router;