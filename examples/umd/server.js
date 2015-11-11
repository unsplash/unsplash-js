var express = require('express');
var app = express();

app.use('/js', express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
