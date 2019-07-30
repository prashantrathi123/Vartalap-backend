


let adminpermission=(req,res,next)=>{
  if(req.user){  
    if(req.user.userType=="admin"){
    return next();
  }
     else{
      res.redirect('/login');
     }
  }
    else{
      res.redirect('/login');
    }

};

let radminpermission=(req,res,next)=>{

  if(req.user!=undefined){ 

     req.done="done";
     return next();
  }
    if(req.user==undefined){
      
      req.done="notdone";
      return next();
    }

};

module.exports.adminpermission = adminpermission;
module.exports.radminpermission = radminpermission;