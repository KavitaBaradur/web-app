var express = require('express');
var router = express.Router();
var userModal = require('../modals/add-user-modal');
var generator = require('generate-password');


/*---------------Generates a random 12 character aphanumeric string as password.---------------*/
router.get('/generate', function(request, response, next){
	console.log('Request -->' +request);
	var password = generator.generate({
	    length: 12,
	    numbers: true,
	    symbols: false,
	    excludeSimilarCharacters: true,	
	    uppercase: true

	});
		response.statusCode = 200;
		response.statusMessage = "OK";
		var res = {"password" : password};
		response.json(res);
		console.log(res);
});	

/*------------Validates the entered password with the one stored in the database-------------------*/
/*router.get('/validate?', function(request, response, next){
	var pswd = request.get('pswd');
	simpleAuthModal.getPassword(request.get('id'), function(error,results){
		if(error)
		{
			response.statusCode = 400;
			response.statusMessage = "Bad Request";
			console.log('Error: ' + error);
		}
	  else
	  	{
	  		if(results.length ==0){
				response.statusCode = 400;
				response.statusMessage = "Bad Request";
				console.log('No record found for ID:' +request.get('id'));
	  		}else if(pswd === results[0].password){
		  		response.statusCode = 200;
				response.statusMessage = "OK";
				console.log('Password matched');
	  		}else{
	  			response.statusCode = 401;
				response.statusMessage = "Unauthorized";
				console.log('Incorrect password');
	  		}	
	  	}
	  	var showResp = {"message" : response.statusMessage}
		response.json(showResp);	
	});
});
*/

module.exports = router;