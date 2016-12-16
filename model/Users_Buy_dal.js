var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM Users_Buy;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(Users_Buy_id, callback) {
    var query = 'SELECT * FROM Users_Buy WHERE Users_Buy = ?';
    var queryData = [Users_Buy];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO Users_Buy (Username, Code) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.Username, params.code];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(Users_Buy, callback) {
    var query = 'DELETE FROM Users_Buy WHERE Username = ?';
    var queryData = [Users_Buy];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};