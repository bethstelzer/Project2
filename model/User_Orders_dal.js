var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM User_Orders;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(User_Orders, callback) {
    var query = 'SELECT * FROM User_Orders WHERE Username = ?';
    var queryData = [Username];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO User_Orders (Username, Order_number) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.Username, params.Order_number];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(User_Orders, callback) {
    var query = 'DELETE FROM User_Orders WHERE User_Orders = ?';
    var queryData = [User_Orders];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};