let mongoose = require('mongoose');
var User = require('../models/userschema');
dbPath ='mongodb://localhost:27017/sm';
mongoose.connect(dbPath, {useNewUrlParser: true, useFindAndModify: false});
mongoose.set('debug', true);
module.exports = mongoose.connection;
