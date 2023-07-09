//declaration

// inporting express module
var express = require('express');


var expressSession = require('express-session');
var bodyParser = require('body-parser');
// Body Parser is a middleware of Node JS used to handle HTTP POST request. 
//Body Parser can parse string based client request body into JavaScript Object 


// creating an express application 
var app = express();

// The port no on which we are listening the server
var port = 3000;

//common controllers
var signup = require('./controllers/signup');
var login = require('./controllers/login');
var logout = require('./controllers/logout');

//admin controllers
var admin = require('./controllers/admin');


//customer controllers
var customer = require('./controllers/customer');



//configure
// view engine is used to render web pages
//ejs ->view engine which  is a simple templating language/engine that 
//lets its user generate HTML with plain javascript.
// Used for dynamic pages
app.set('view engine', 'ejs');



//middlewares->The middleware in node.js 
// is a function that will have all the access for requesting an object, 
//responding to an object, and moving to the next middleware function in the
// application request-response cycle.

app.use(bodyParser.urlencoded({extended: false}));
// Parsing means analyzing and converting a program into an internal format that a runtime environment can actually run,
// It is used to set up the middleware for parsing URL-encoded form data in an Express.js application.
// It instructs the middleware to parse the URL-encoded data and make it available in the req.body object.
// extended: false means that the query string values will be parsed as strings or arrays and not nested objects


app.use(expressSession({secret: 'my top secret pass', resave: false, saveUninitialized: true}));
// secret: This option specifies the secret used to sign the session cookie. It should be a string
// that acts as a secret passphrase to encrypt the session data. Make sure to use a long, randomly
// generated, and secure secret to protect your sessions.

// resave: This option determines whether to save the session store even if the session was not 
//modified during the request. Setting it to false indicates that the session will be saved only 
//if it has been modified. This can help reduce unnecessary session store writes and improve performance.

// saveUninitialized: This option indicates whether to save uninitialized sessions. If set to true, the session will be stored in the session store, even if it is empty. This can be useful if you want to create sessions for anonymous users or have sessions ready for later use.


app.use('/css', express.static(__dirname + '/css'));
// express.static() is a built-in middleware function in Express.js used to serve static files from a directory.
// app.use() is a method in Express.js used to add middleware to the application's middleware stack.
// the  line of code is used to serve static files, specifically CSS files, in an Express.js application.

app.use('/images', express.static(__dirname + '/images'));




// '*' parameter specifies that the middleware will be applied to all routes.


// the middleware calls next() to pass control to the next middleware function without any further action.
app.use('*', function(req, res, next){

	if(req.originalUrl == '/login' || req.originalUrl == '/signup')
	{
		// if the session variables req.session.admin and req.session.customer are not set or are falsy

		next();
	}
	else
	{
		if(!req.session.admin && !req.session.customer)
		{
			res.redirect('/login');
			return;
		}
		next();
	}
});


//routes
app.use('/login', login);
app.use('/signup', signup);
app.use('/logout', logout);

//admin routes
app.use('/admin', admin);


//customer routes

app.use('/customer', customer);


//server start
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});
