//copy code from school_routes.js and change where says school to AboutPage
//do the same
var express = require('express');
var router = express.Router();
var AboutPage_dal = require('../model/AboutPage_dal');


// View All companies
router.get('/all', function(req, res) {
    AboutPage_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('AboutPage/AboutPageViewAll', { 'result':result });
        }
    });

});

// View the AboutPage for the given id
router.get('/', function(req, res){
    if(req.query.AboutPage_id == null) {
        res.send('copmany_id is null');
    }
    else {
        AboutPage_dal.getById(req.query.AboutPage_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('AboutPage/AboutPageViewById', {'result': result});
            }
        });
    }
});

// Return the add a new AboutPage form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    AboutPage_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('AboutPage/AboutPageAdd', {'AboutPage': result});
        }
    });
});

// insert a AboutPage record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.AboutPage_name == null) {
        res.send('AboutPage name must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        AboutPage_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/AboutPage/all');
            }
        });
    }
});

// Delete a AboutPage for the given AboutPage
router.get('/delete', function(req, res){
    if(req.query.AboutPage_id == null) {
        res.send('AboutPage_id is null');
    }
    else {
        AboutPage_dal.delete(req.query.AboutPage_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/AboutPage/all');
            }
        });
    }
});


module.exports = router;



