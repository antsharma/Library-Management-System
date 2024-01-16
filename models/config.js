var mysql      = require('mysql');
//const url = process.env.
var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'library_management_system'
host: process.env.DB_HOST, 
    user: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = {
	executeQuery: function(sql, sqlParam, callback){
		if(sqlParam == null)
		{
			connection.query(sql, function(error, result){
				if(error)
				{
					console.log(error);
				}
				callback(result);
			});
		}
		else
		{
			connection.query(sql, sqlParam, function(error, result){
				if(error)
				{
					console.log(error);
				}
				callback(result);
			});
		}
	}
};
