/**
 * Created by kavitabaradur on 7/21/17.
 */

var express = require('express');
var router = express.Router();
var adminModal = require('../modals/admin-modal');

/*------------Validates the entered password with the one stored in the database-------------------*/
router.get('/validate?', function(request, response, next){
    var password = request.get('password');
    adminModal.getPassword(request.get('id'), function(error,results){
        if(error)
        {
            response.statusCode = 400;
            response.statusMessage = "Bad Request";
            console.log('Error: ' + error);
        }
        else
        {
            if(results.length === 0){
                response.statusCode = 400;
                response.statusMessage = "Bad Request";
                console.log('No record found for ID:' +request.get('id'));
            }else if(password === results[0].password){
                response.statusCode = 200;
                response.statusMessage = "OK";
                console.log('Password matched');
            }else{
                response.statusCode = 401;
                response.statusMessage = "Unauthorized";
                console.log('Incorrect password');
            }
        }
        var showResp = {"message" : response.statusMessage};
        response.json(showResp);
    });
});

module.exports=router;
