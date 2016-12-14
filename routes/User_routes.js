//copy code from school_routes.js and change where says school to User
//do the same

var express = require('express');
var router = express.Router();
var User_dal = require('../model/User_dal');


// View All Users
router.get('/all', function(req, res) {
    User_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('User/UserViewAll', { 'result':result });
        }
    });

});

// View the User for the given id
router.get('/', function(req, res){
    if(req.query.Username == null) {
        res.send('Username is null');
    }
    else {
        User_dal.getById(req.query.Username, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('User/UserViewById', {'result': result});
            }
        });
    }
});

// Return the add a new User form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    User_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('User/UserAdd', {'User': result});
        }
    });
});

// insert a User record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.Username == null) {
        res.send('Username must be provided.');
    }
    else if(req.query.Fname == null) {
        res.send('A first name must be selected');
    }
    else if(req.query.Lname == null) {
        res.send('A last name must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        User_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/User/all');
            }
        });
    }
});

// Delete a User for the given Username
router.get('/delete', function(req, res){
    if(req.query.Username == null) {
        res.send('Username is null');
    }
    else {
        User_dal.delete(req.query.Username, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/User/all');
            }
        });
    }
});


module.exports = router;
