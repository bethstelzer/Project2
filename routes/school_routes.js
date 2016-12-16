var express = require('express');
var router = express.Router();
var Shoes_dal = require('../model/Shoes_dal');
var address_dal = require('../model/User_Orders_dal');


// View All Shoess
router.get('/all', function(req, res) {
    Shoes_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('Shoes/ShoesViewAll', { 'result':result });
        }
    });

});

// View the Shoes for the given id
router.get('/', function(req, res){
    if(req.query.Shoe == null) {
        res.send('Shoe is null');
    }
    else {
        Shoes_dal.getById(req.query.Shoe, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('Shoes/ShoesViewById', {'result': result});
            }
        });
    }
});

// Return the add a new Shoes form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    address_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('Shoes/ShoesAdd', {'address': result});
        }
    });
});

// insert a Shoes record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.Shoes_name == null) {
        res.send('Shoes Name must be provided.');
    }
    else if(req.query.addres == null) {
        res.send('An Address must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        Shoes_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/Shoes/all');
            }
        });
    }
});

// Delete a Shoes for the given Shoe
router.get('/delete', function(req, res){
    if(req.query.Shoe == null) {
        res.send('Shoe is null');
    }
    else {
        Shoes_dal.delete(req.query.Shoe, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/Shoes/all');
            }
        });
    }
});

module.exports = router;
