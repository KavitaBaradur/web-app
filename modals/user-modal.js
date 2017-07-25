var db = require('./database');

var user = {
    getUser : function (id,callback) {
        return db.query('select * from users where user_name=?',[id],callback);
    },

    getAllUsers : function (callback) {
        return db.query('select * from users', [], callback);
    }
};

module.exports=user;