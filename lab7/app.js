var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');
var mongoDb = require('mongodb').MongoClient;
var {promisify} = require('util');


const indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var decryptMessageRouter = require('./routes/decryptMessage');

var app = express();

const hostname = "127.0.0.1";
const port = 4000;

// app.use(function (req, res, next) {
//   var myPromise = promisify(mongoDb.connect);
//   myPromise('mongodb://127.0.0.1:27017/lab7Mongodb')
//   .then(client => {
//       var db = client.db('homework7');
//       req.db = db;
//       req.client = client;
//       next();
//   }).catch(err => {
//       console.log(err)
//   });
// });

app.use('/secret',decryptMessageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(port,hostname,() => {
  console.log("port is listened");
});

module.exports = app;
