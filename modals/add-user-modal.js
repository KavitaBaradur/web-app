var db = require('./database');

var auth = {
		/*---------------CREATE-----------------*/
		// Persists data regarding authentication.
		addAuthDetail : function(authDetails, callback){
		return db.query('INSERT INTO users SET ?', authDetails, callback);
	},

		/*---------------READ-----------------*/
		// Fetches the password for the given patient id.
	/*	getPassword : function(id, callback){
			return db.query('select password from users where id=?',[id], callback);
	}*/
};
module.exports = auth;
