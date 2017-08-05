var express = require('express');
var router = express.Router();
//var generator = require('generate-password');
var userModal = require('../modals/add-user-modal');

/* Creates a record for the patient with the given patient id and password.
	 	@ Body -->  {"id" : request.body.id, "password" : request.body.pswd};
	 	@ id                -->		Indicates the unique ID of the patient assigned.
	 	@ password          -->		Indicates the aphanumeric password assigned.
*/
router.post('/', function(request, response, next){
	var data = {"id" : request.body.id, "password" : request.body.pswd};
    userModal.addAuthDetail(data,function(error,count){
	  if(error)
		{
			console.log('Error: ' + error);
		}
	  else
	  	{
	  		if(response.statusCode == 200){
		  		response.statusCode = 201;
		  		response.statusMessage = "Created";
		  		var res = {"id": count.insertId, "creation_date" : new Date()};
				response.json(res);
				console.log(res);
	  		}
	  }
	});
});

module.exports = router;