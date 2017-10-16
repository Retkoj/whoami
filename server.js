  // server.js
// where your node app starts

// init project
var navigator = require('navigator');
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get('/', (req, res) => {
  var lang = req.acceptsLanguages();
  var ipA = req.headers['x-forwarded-for']|| 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
  var regex = /[(]{1}[^(]*[)]{1}/g;
  var software = req.headers['user-agent'].match(regex)[0].replace('(', '').replace(')', ''); //.split(' ')[1].replace('()', ' ').replace(')', ' ');
  console.log(software);
  
  var obj = {ip: ipA.split(',')[0], language: lang[0], software: software};
  res.end(JSON.stringify(obj));
});
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
