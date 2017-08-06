/**
 * Created by kavitabaradur on 8/6/17.
 */
var db=require('./database');

var assessment={
    addAssessment : function(assessment,callback){
        return db.query('INSERT INTO AssessmentEntry SET ?',assessment,callback);
    },
    getAssessment : function(callback){
        return db.query('SELECT * FROM AssessmentEntry ORDER BY creation_date desc',[],callback);
    }
};


module.exports=assessment;
