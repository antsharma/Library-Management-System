var express = require('express');

// The express.Router() function is a built-in middleware function in Express that allows you to create modular, mountable route handlers
// . It provides a way to organize routes and related logic into separate modules, making your code more modular and maintainable.


var router = express.Router();

var userModel = require.main.require('./models/userModel');

var validationRules = require.main.require('./validation_rules/rules');

var asyncValidator = require('async-validator-2');


router.get('/', (req, res)=>{
    res.render('signup.ejs', {errs: []});
});


router.post('/', (req, res)=>{




    var data = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: req.body.password,
      gender: req.body.gender
    };



    
    var rules = validationRules.users.create;

    var validator = new asyncValidator(rules);

    validator.validate(data, (errors, fields)=>{
        if(!errors){
            userModel.createUser(data, function(result){
                if(result){
                    console.log(result);
                    res.redirect('/login');
                }
                else {
                    res.send('Invalid');
                }
            });
        }
        else {
            console.log(fields);
            res.render('signup', {errs: errors});
        }


    });


});

module.exports = router;
