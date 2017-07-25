/**
 * Created by kavitabaradur on 7/21/17.
 */

var db = require('./database');

var admin = {
    getPassword : function(id, callback){
        return db.query('select password from admin where user_name=?',[id], callback);
    }
};

module.exports = admin;
