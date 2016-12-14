//copy code from school_routes.js and change where says school to User_Orders
//do the same
var express = require('express');
var router = express.Router();
var User_Orders_dal = require('../model/User_Orders_dal');


// View All User_Orderses
router.get('/all', function(req, res) {
    User_Orders_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('User_Orders/User_OrdersViewAll', { 'result':result });
        }
    });

});

// View the User_Orders for the given id
router.get('/', function(req, res){
    if(req.query.User_Orders == null) {
        res.send('User_Orders is null');
    }
    else {
        User_Orders_dal.getById(req.query.User_Orders, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('User_Orders/User_OrdersViewById', {'result': result});
            }
        });
    }
});

// Return the add a new User_Orders form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    User_Orders_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('User_Orders/User_OrdersAdd', {'User_Orders': result});
        }
    });
});

// insert a User_Orders record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.Username == null) {
        res.send('Username must be provided.');
    }
    else if(req.query.Order_number == null) {
        res.send('A Order_number must be added');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        User_Orders_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/User_Orders/all');
            }
        });
    }
});

// Delete a User_Orders for the given email
router.get('/delete', function(req, res){
    if(req.query.User_Orders == null) {
        res.send('User_Orders is null');
    }
    else {
        User_Orders_dal.delete(req.query.User_Orders, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/User_Orders/all');
            }
        });
    }
});


module.exports = router;
