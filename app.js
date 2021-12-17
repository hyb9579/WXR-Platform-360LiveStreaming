var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs =require('fs');
var nms = require('./media-server');

var http = require('http');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 같은 라우터에 연결된 HMD가 웹어 접속하게 하기위해 변경한 IP
app.listen(8888, '192.168.1.157');

app.get('/', function(request, response) {
      response.redirect('/360hls');
});

app.get('/360hls', function(request, response) {
  fs.readFile(__dirname + '/views/360hls.html', 'utf8', (error, data)=> {
      if(!error) {
          response.writeHead(200, {'Content-Type': 'text/html'});
          response.end(data);
      }
      else {
          response.writeHead(500);
          response.end('Internal Server Error');
          console.log(error);
      }
  });
});


app.get('/360videojs', function(request, response) {
  fs.readFile(__dirname + '/views/360videojs.html', 'utf8', (error, data)=> {
      if(!error) {
          response.writeHead(200, {'Content-Type': 'text/html'});
          response.end(data);
      }
      else {
          response.writeHead(500);
          response.end('Internal Server Error');
          console.log(error);
      }
  });
});


app.get('/hls', function(request, response) {
  fs.readFile(__dirname + '/views/hls.html', 'utf8', (error, data)=> {
      if(!error) {
          response.writeHead(200, {'Content-Type': 'text/html'});
          response.end(data);
      }
      else {
          response.writeHead(500);
          response.end('Internal Server Error');
          console.log(error);
      }
  });
});


app.get('/videojs', function(request, response) {
  fs.readFile(__dirname + '/views/videojs.html', 'utf8', (error, data)=> {
      if(!error) {
          response.writeHead(200, {'Content-Type': 'text/html'});
          response.end(data);
      }
      else {
          response.writeHead(500);
          response.end('Internal Server Error');
          console.log(error);
      }
  });
});

app.get('/videojsvr', function(request, response) {
  fs.readFile(__dirname + '/views/videojs-vr.html', 'utf8', (error, data)=> {
      if(!error) {
          response.writeHead(200);
          response.end(data);
      }
      else {
          response.writeHead(500);
          response.end('Internal Server Error');
          console.log(error);
      }
  });
});

nms.run()


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

module.exports = app;
