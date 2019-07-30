let express=require('express');
let app = express();
app.use(express.static(__dirname + "/views"));
let main = require('./routes/main');
let loginregister = require('./routes/loginregister');
let islogedin = require('./routes/islogedin');
let videostream = require('./routes/videostream');
let message = require('./routes/message');
let chat = require('./routes/create-and-find-chatgroup');
let all = require('./routes/all');

var http = require('http').createServer(app);
var server=app.listen(process.env.PORT || 8000);
var io = require('socket.io')(server);
/*module.exports.io=io;*/
const PORT = process.env.PORT || 8000;

let passport = require("passport");
  

let expressSession = require("express-session");
var cors = require('cors') ;

let path = require("path");
app.set('views', path.join(__dirname, 'views'));

app.use(cors())
app.use(main);
app.use(loginregister);
app.use(islogedin);
app.use(videostream);
app.use(message);
app.set('socketio', io);
app.use(chat);
app.use(all);

io.on('connection', function(socket) {
   console.log('A user connected');
   console.log(socket.id);
socket.emit("connected","connected");

    socket.on('setUsername', function(data) {
      console.log(data);
      console.log("userset");
      console.log(socket.id);
      socket.userid=data.email;
      
      });
      
      socket.on('disconnect',function(){
         console.log('disconnect' +socket.id);var w;
          
        
   });
  

  /*  socket.on('msg', function(data) {
      //Send message to everyone
      var reciever=data.reciever;
      var sender=data.sender;
       console.log(reciever);
       console.log("sender:"+sender);
      socket.emit('userSet', {username: data.message}); 
    
   })*/

});


/*app.listen(process.env.PORT || 8000);*/
/*http.listen(PORT, function() {
   console.log('listening on localhost:8000'+PORT);});*/
