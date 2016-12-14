
var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM User;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(Username, callback) {
    var query = 'SELECT * FROM User WHERE Username = ?';
    var queryData = [Username];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO User (Username, Fname, Lname) VALUES (?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.Username, params.Fname, params.Lname];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(Username, callback) {
    var query = 'DELETE FROM User WHERE Username = ?';
    var queryData = [Username];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};