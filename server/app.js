var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var cors = require('cors')

var index = require('./routes/index');
var users = require('./routes/users');
var question = require('./routes/question')
var answer = require('./routes/answer')
var vote = require('./routes/vote')

var app = express();
app.use(cors())
// menambahkan mongoDb atlas
mongoose.connect(`mongodb://jainal:pakuhaji@cluster0-shard-00-00-nlquw.mongodb.net:27017,cluster0-shard-00-01-nlquw.mongodb.net:27017,cluster0-shard-00-02-nlquw.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`, (err)=>{
  if(!err){
    console.log('Database sudah terhubung')
  } else {
    console.log('Database mati');
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/question', question)
app.use('/answer', answer)
app.use('/vote', vote)


module.exports = app;
