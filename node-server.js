const express = require('express')
const testplugin=require('./views/js/testcordovaplugin.js')  
var fs = require("fs");  
const app = express()  
const port = 3000

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/users', (request, response) => {  
  fs.readFile('users.json', function (err, data) {  
   if (err) {  
       return console.error(err);  
   }  
	response.send(data.toString());
});
})

app.get('/selects', (request, response) => {  
  response.send('Hello from Express!+selected')
})

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

app.get('/html', (request, response) => {  
  response.sendfile('views/hello.html');
})

app.get('/hello.html', (request, response) => {  
  response.sendfile('views/hello.html');
})
app.get('/myhtml.html', (request, response) => {  
  response.sendfile('views/myhtml.html');
})

app.get('/my2html.html', (request, response) => {  
  response.sendfile('views/my2html.html');
})

app.get('/api/users', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var user_id = req.param('id');
  var token = req.param('token');
  var geo = req.param('geo');  

  res.send(user_id + ' ' + token + ' ' + geo);
});

app.post('/api/users', function(req, res) {
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;
	res.setHeader('Content-Type', 'application/json');

    res.send(JSON.stringify({
            maziid: req.body.id || null,
            tokenre: req.body.token || null
        }));
});
app.use(express.static(__dirname + '/static'));