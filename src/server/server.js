const express = require('express')
const app = express()
const MySQL = require('mysql');
const Joi = require('joi');
const Bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const http = require("http");
const server = http.createServer(app);
var swig = require('swig');
var path = require('path');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../utils/config');

console.log(config.secret)

/**** Connect Your Mysql Database ****/
const connection = MySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test',
    database: 'node_db'
});

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
   // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


/**** view engine setup ****/
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

// server and routing
server.listen(3001);
app.get('/', function (req, res) {
  res.render('index');
});

/*
 * Test Api
 * Method : GET
 *
 */

app.get('/api/test', function (req, res) {
  res.status(200)
	.json({
		status: 'success',
		message: 'Test Api'
	});
});

/*
 * User Login Api
 * Method : POST
 * @email : Email Using for Login(String)
 * password : Password For login(String)
 *
 */
app.post('/api/login', function(req, res) {
	console.log("Login Api Called",req.body)
	var email = req.body.email;
   	var password = req.body.password;
	connection.query('SELECT uid, username FROM users WHERE email=? and password=?',[email,password], function (error, results, fields) {
            if (error)
            	{
            		console.log(error);

		            res.status(200)
						.json({
							status: 'failed',
							message: 'User Not Found'
						});
            	}
            	else
            	{
            		console.log(results);
            		var token = jwt.sign({ id: results[0].uid }, config.secret, {
				      expiresIn: 86400 // expires in 24 hours
				    });
		            res.status(200)
						.json({
							status: 'success',
							data:results,
							token:token,
							message: 'User Found'
						});
				        

            	}
            
	});
	 
          
});

/*
 * Create News  Api
 * Method : POST
 * @title : Title for news(String)
 * @content : Content For News(String)
 * @token : Auth Token(String)
 *
 */
app.post('/api/news', function(req, res) {
	console.log("Create News Api Called",req.body)
	var title = req.body.title;
   	var content = req.body.content;

   	var token = req.body.token;
   	console.log(config.secret);
  	if (!token)
  		{
  			res.status(200)
						.json({
							status: 'failed',
							message: 'No Token Provided'
						});

  		}
  
 	jwt.verify(token, config.secret, function(err, decoded) 
 	{
    	if(err) 
    	{
    		res.status(200)
						.json({
							status: 'failed',
							message: 'Failed to authenticate token.'
						});
    		
    	}
    	else
    	{
    		var uid = decoded.id;
    		var status = 1;
    		connection.query('INSERT INTO news(title,content,status,uid) VALUES(?,?,?,?)',[title,content,status,uid], function (error, results, fields) {
            if (error)
            	{
            		console.log(error);

		            res.status(200)
						.json({
							status: 'failed',
							message: 'News Creation Failed!!!'
						});
            	}
            	else
            	{
            		
				   	res.status(200)
						.json({
							status: 'success',
							message: 'News Created Successfully!!!'
						});     

            	}
            
			});
    		
    	}
    });

	 
          
});


/*
 * Get News  Api
 * Method : GET
 *
 */
app.get('/api/news', function(req, res) {

	
	connection.query('SELECT * FROM news N JOIN users U on U.uid=N.uid WHERE N.status=1', function (error, results, fields) {
    if (error)
    	{
    		console.log(error);

            res.status(200)
				.json({
					status: 'failed',
					message: 'No News Found!!!'
				});
    	}
    	else
    	{
    		
		   	res.status(200)
				.json({
					status: 'success',
					data: results,
					message: 'News Fetched Successfully!!!'
				});     

    	}
    

		});

	
	 
          
});
/*
 * Get My News  Api
 * Method : POST
 * @token : Auth Token(String)
 *
 */
app.post('/api/mynews', function(req, res) {

	var token = req.body.token;
   	console.log(config.secret);
  	if (!token)
  		{
  			res.status(200)
						.json({
							status: 'failed',
							message: 'No Token Provided'
						});

  		}
  
 	jwt.verify(token, config.secret, function(err, decoded) 
 	{

    	if(err) 
    	{
    		res.status(200)
						.json({
							status: 'failed',
							message: 'Failed to authenticate token.'
						});
    		
    	}
    	else
    	{
    		var uid = decoded.id;
    		var status = 1;
    		connection.query('SELECT * FROM news WHERE uid=?',[uid], function (error, results, fields) {
            if (error)
            	{
            		console.log(error);

		            res.status(200)
						.json({
							status: 'failed',
							message: 'No News Found!!!'
						});
            	}
            	else
            	{
            		
				   	res.status(200)
						.json({
							status: 'success',
							data: results,
							message: 'News Created Successfully!!!'
						});     

            	}
            
			});
    		
    	}
    });


		
	
          
});
var io = require('socket.io')(server);
// socket.io demo
io.on('connection', function (socket) {

	socket.emit('server event', { foo: 'bar' });
	socket.on('client event', function (data) {
		socket.broadcast.emit('update label', data);
	});

});

const port = 3000;
io.listen(port);
console.log('listening on port ', port);

