
var express = require('express');
var app  = express();
var path = require("path");
var port = process.env.PORT || 3010;

app.use(express.static(__dirname + '/public'));
app.use(express.static(path.normalize(__dirname + '../../../'))); // making the jasmine folder accessible through browse as a static content

// CORS
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use('/api/clservices',require('./api/clservices.js')());
app.use('/data', require('./api/datajson.js')());

app.listen(port);

console.log('Server running on port ' + port);

