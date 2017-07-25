var express = require('express');
var router = express.Router();
var userModal=require('../modals/user-modal');
var bcrypt = require('bcrypt-nodejs');

router.post('/',function (request,response,next) {
    var userId=request.body.username;
    var password=request.body.password;
    console.log(userId+" "+password);
    userModal.getUser(userId,function (error,rows) {
        if(error){
            response.statusCode=400;
            response.statusMessage="Bad requests";
            console.log("Err "+error);
        }else{
            console.log(rows);
            var passwordInServer=rows[0].password;
            //var passwordToSave=bcrypt.hashSync(password);
            //console.log(passwordToSave);
            var compareValue=bcrypt.compareSync(password,passwordInServer);
            if(compareValue){
                response.statusCode=200;
                response.statusMessage="OK";
            }else{
                response.statusCode=401;
                response.statusMessage="Unauthorized ";
                console.log('Incorrect password provided');
            }
            var showResp={"message" : response.statusMessage};
            response.json(showResp);
            console.log(rows+' '+compareValue);
        }
    });
});

router.get('/', function(request, response, next){
    console.log("Got request for user data");
    userModal.getAllUsers(function(error,rows){
        if(error)
        {
            console.log('Error: ' + error);
        }
        else
        {
           var res = {"UserID": response.UserID,
                "Password": response.Password};
           console.log(rows);
            response.json(rows);
        }
    });
});

module.exports=router;