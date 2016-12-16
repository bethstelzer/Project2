var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
 create or replace view Shoes_view as
 select s.*, a.street, a.zipcode from Shoes s
 join address a on a.address_id = s.address_id;

 */

exports.getAll = function(callback) {
    var query = 'SELECT * FROM Shoes;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(Shoes, callback) {
    var query = 'SELECT * FROM Shoes WHERE Shoes = ?';
    var queryData = [Shoes_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO Shoes (Code, sneakers_running, sneakers_casual, boots_gogo, boots_riding) VALUES (?, ?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.Shoes_name, params.address_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(Shoes, callback) {
    var query = 'DELETE FROM Shoes WHERE Shoes_id = ?';
    var queryData = [Shoes];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};