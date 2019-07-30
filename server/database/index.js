let mongoose = require('mongoose');
/*dbPath= 'mongodb+srv://prashantrathi321:9557046589@insta-eyryk.mongodb.net/vartalap';*/
var User = require('../models/userschema');
dbPath ='mongodb://localhost:27017/sm';
mongoose.connect(dbPath, {useNewUrlParser: true, useFindAndModify: false});
mongoose.set('debug', true);
module.exports = mongoose.connection;