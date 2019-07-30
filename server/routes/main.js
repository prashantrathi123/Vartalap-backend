let express = require('express'),
    router = express.Router(),
    path = require('path');
   var cors = require('cors') ;

var corsOptions = {
  origin: 'http://localhost:3006',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
  router.get('/', function(req,res){
    
   res.render('index.ejs');
    
 	
 });
 
  router.post('/main',async function(req,res){
    
res.json({ds:"done"});
  /* console.log("hi");*/
    
 	
 });

 
  module.exports = router;  