var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'usersdb'
});
connection.connect();



connection.end();


function login(){
var name=document.getElementById("name").value;
var password=document.getElementById("password").value;
alert('username'+name+' password'+password);

connection.query('SELECT * FROM users where where username="'+name+'" and password="'+password+'"', function(err, rows, fields) 
{
  if (err) throw err;

  console.log(rows[0]);
});
};