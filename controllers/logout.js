// It imports the Express framework and assigns it to the variable express.
var express = require('express');

// It creates a new router instance using express.Router() and assigns it to the variable router.
var router = express.Router();



// The router handles a GET request to the root path ("/") using the router.get() method.

// Inside the callback function for the GET request, req.session.destroy() is called to destroy the session associated with the request.

// Finally, the callback function redirects the user to the "/login" path using res.redirect('/login').

router.get('/', (req, res)=> {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;

// The purpose of this code snippet seems to be to handle a logout functionality. 
// When a user accesses the root path ("/"), their session is destroyed, and they are redirected to the login page ("/login").