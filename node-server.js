const express = require('express')
const testplugin=require('./views/js/testcordovaplugin.js')  
var fs = require("fs");  
var mysql      = require('mysql');
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

app.get('/homepage.html', (request, response) => {  
  response.sendfile('views/homepage.html');
})

app.get('/signup.html', (request, response) => {  
  response.sendfile('views/signup.html');
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

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'usersdb'
});

connection.query('SELECT * FROM users', function(err, rows, fields) 
{
  if (err) throw err;

  console.log(rows[0]);
});
function checkUser(username,password,callback){
connection.query('SELECT * FROM users where username= "'+username+'" and password="'+password+'"', function(err, rows, fields) 
{
  if (err) throw err;

  console.log(rows[0]);
  if(rows[0]===undefined){
  console.log('no user found');
	callback(false);
  }else{
  console.log('user found');
	callback(true);
  }
});
}

app.get('/',function(request,response){
response.sendfile('views/login.html');
});

app.post('/check', function(req, res) {
	var username = req.body.username;
    var password = req.body.password;
	
	res.setHeader('Content-Type', 'application/json');
	checkUser(username,password,function(str){
		console.log('callback',str);
		if(str){
		res.send(JSON.stringify({
            username: username || null,
            password: password|| null
        }));
		}else{
		res.send(JSON.stringify({
            username: 'not valid'|| null
        }));
		}
	});
		
});

app.post('/login',function(req,res){
var username = req.body.firstname;
    var password = req.body.password;
	
	res.setHeader('Content-Type', 'application/json');
	console.log('/login'+username,' '+password);
	checkUser(username,password,function(str){
		console.log('callback',str);
		if(str){
		 res.redirect('/homepage.html');
		}else{
		res.redirect('/signup.html');
		}
	});
	
});

app.post('/signup',function(req,res){
	var username = req.body.username;
    var password = req.body.password;
	var gender=req.body.sex;
	res.setHeader('Content-Type', 'application/json');
	console.log('/signup '+username,' '+password+'  '+gender);	
	connection.query('insert into users (username,password,gender) values("'+username+'","'+password+'","'+gender+'")', function(err, rows, fields) 
	{
		if (err) throw err;
		res.redirect('/');
	});
	
});




