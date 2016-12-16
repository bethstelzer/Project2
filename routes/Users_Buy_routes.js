var express = require('express');
var router = express.Router();
var Users_Buy_dal = require('../model/Users_Buy_dal');
var account_dal = require('../model/User_dal');


// View All Users_Buys
router.get('/all', function(req, res) {
    Users_Buy_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('Users_Buy/Users_BuyViewAll', { 'result':result });
        }
    });

});

// View the Users_Buys for the given id
router.get('/', function(req, res){
    if(req.query.Users_Buy_id == null) {
        res.send('Users_Buy_id is null');
    }
    else {
        Users_Buy_dal.getById(req.query.Users_Buy_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('Users_Buy/Users_BuyViewById', {'result': result});
            }
        });
    }
});

// Return the add a new Users_Buy form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    account_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('Users_Buy/Users_BuyAdd', {'account': result});
        }
    });
});

// insert a Users_Buy record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.Username == null) {
        res.send('Username Name must be provided.');
    }
    else if(req.query.code == null) {
        res.send('An code must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        Users_Buy_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/Users_Buy/all');
            }
        });
    }
});

// Delete a Users_Buy for the given Users_Buy_id
router.get('/delete', function(req, res){
    if(req.query.Users_Buy_id == null) {
        res.send('Users_Buy_id is null');
    }
    else {
        Users_Buy_dal.delete(req.query.Users_Buy_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/Users_Buy/all');
            }
        });
    }
});


module.exports = router;
