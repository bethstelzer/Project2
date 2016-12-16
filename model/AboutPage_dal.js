var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM AboutPage;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(AboutPage_id, callback) {
    var query = 'SELECT * FROM AboutPage WHERE AboutPage_id = ?';
    var queryData = [AboutPage_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO AboutPage (AboutPage_name) VALUES (?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.AboutPage_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(AboutPage_id, callback) {
    var query = 'DELETE FROM AboutPage WHERE AboutPage_id = ?';
    var queryData = [AboutPage_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};