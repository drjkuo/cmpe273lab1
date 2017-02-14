var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var udatas = [];
var previousid = 0;
var cors = require('cors');


app.use(cors());

// create application/json parser
// var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//if the connecting client changes, clear then add data; otherwiese, simply add data
app.post('/', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

  var msg = 'Client No' + req.body.uid + ' entered: ' + req.body.udata;
  res.send(msg);
  console.log(msg);
  if (previousid !== req.body.uid) {
    udatas = [];
    previousid = req.body.uid;
  }
  udatas.push(req.body.udata);
});

//kill and print all data stored in the server
app.get('/kill', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  console.log('Clear Data from Client No' + previousid);
  console.log('Data killed: ' + udatas);
  res.send(udatas);
  udatas = [];

});

app.listen(3000);
