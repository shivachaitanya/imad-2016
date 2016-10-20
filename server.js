var express = require('express');
var morgan = require('morgan');
var path = require('path');
var mysql = require("mysql");

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
  
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
var counter=0;
app.get('/counter', function (req, res) {
   counter = counter + 1;
  res.send(counter.toString());
});

app.get('/clientName/', function (req, res) {
   var clientNo = req.query.name;
   var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1",
  database : "airok"
  
});
 con.connect(function(err){
  if(err){
    res.send('Error connecting to Db');
    return;
  }
   res.send("Connection established");
});



con.query('CREATE TABLE IF NOT EXISTS ?? (timestamp int(10) AUTO_INCREMENT, pre real(6,3),temp real(6,3),humid real(6,3),PRIMARY KEY (timestamp))', [clientNo], function (error, results) {
  // error will be an Error if one occurred during the query
  // results will contain the results of the query (if any)
  if(error) throw error;
});
  
 
});




app.get('/clientData', function (req, res) {
var clientNo = req.query.name;
   var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1",
  database : "airok"
  
});
 con.connect(function(err){
  if(err){
    res.send('Error connecting to Db');
    return;
  }
   res.send("Connection established");
});

   var clientNo = req.query.name;
   var pre = req.query.pre;
   var hum = req.query.hum;
   var temp = req.query.temp;
  var data = { pre: pre, humid: hum,temp:temp };
var q = ('INSERT INTO '.concat(clientNo)).concat(' SET ?');
con.query(q,data, function(err,res){
  if(err) throw err;
  
  console.log('Last insert ID:', res.insertId);
});




});







app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/db.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'db.js'));
});




var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log('IMAD course app listening on port ${port}!');
});
