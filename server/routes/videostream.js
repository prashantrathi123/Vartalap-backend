let express = require('express'),
    router = express.Router(),
    path = require('path');
    var cors = require('cors') ;
    const fs = require('fs');
    const multer = require('multer');



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'views/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage });

var posts = require('../models/postschema');
let post=posts.post;

router.get('/video', function(req, res) {
  const path = req.query.path
  /*console.log(req.query.path);*/
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1

    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }

    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});

router.post('/videopost',upload.single('avatar'),async function(req,res){

console.log(req.file);
var d=new Date();
let response=[
{
posts:[req.file],
likes:0,
caption:"null",
comments:[],
time:d,
}
]
console.log(response);
let u=await post.findOne({email:req.user.email});
if(u==null){
let details={
  email:req.user.email,
  posts:response,
}
await post.create(details);
}
else{
   await post.findOneAndUpdate(
          { email: req.user.email },
          { $push: { posts: response } }
        );
}
res.end("done");
});

 module.exports = router; 