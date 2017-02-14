var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var udatas = [];
var previousid = 0;

// create application/json parser
// var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// POST /login gets urlencoded bodies
app.post('/', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

  res.send('welcome, ' + req.body.uid);
  if (previousid !== req.body.uid) {
    udatas = [];
    previousid = req.body.uid;
  }
  udatas.push(req.body.udata);
});

// POST /api/users gets JSON bodies
app.post('/kill', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
    res.send(udatas);
    udatas = [];

});

app.listen(3000);
