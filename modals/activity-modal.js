var db = require('./database');

var activity = {
	/*---------------CREATE-----------------*/
    addActivity : function(activity, callback){
        return db.query('INSERT INTO ActivityEntry SET ?', activity, callback);
    },

	/*---------------READ-----------------*/
    // All activity entries in the database.
    getAllActivity : function(callback){
        return db.query('select * from ActivityEntry order by creation_date desc',[], callback);
    },

    // Single activity entry.
    getActivity : function(id, callback){
        return db.query('select * from ActivityEntry where id=?',[id], callback);
    },

    // Single type of activity entry.
    getTypeOfActivity : function(id, callback){
        return db.query('select * from ActivityEntry where act_id=?',[id], callback);
    },

    // All recorded activity for patient id.
    getAllActivityForPatient : function(id, callback){
        return db.query('select * from ActivityEntry where patient_id=?',[id], callback);
    },

	/*---------------UPDATE-----------------*/
	/*      updatePain : function(id, pain, callback){
	 return db.query("update PainEntry set painLevel=?, note=? where id=?",[pain.painLevel, pain.note, id], callback);
	 },      */

	/*---------------DELETE-----------------*/
	/*      deletePain : function(id, callback){
	 return db.query("delete from PainEntry where id=?",[id], callback);
	 }*/
};
module.exports = activity;