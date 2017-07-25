var mysql = require('mysql');
var settings = require('./db_settings.json');
var db;

/*------------Connects to the database by using properties from the JSON files-------------------*/
function connectDatabase() {
    if (!db) {
        db = mysql.createConnection(settings);
        db.connect(function(error){
            if(!error) {
                console.log('\nServer connected to database!');
                console.log('=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*\n');
            } else {
                console.log('Error connecting to database!\n', error.stack);
            }
        });

    }
    return db;
}

module.exports = connectDatabase();