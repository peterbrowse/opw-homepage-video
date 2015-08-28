var express 	= require('express'),
	router 		= express.Router();

router.get('/', function(request, response, next) {
	response.send("I'm alive.");
});

router.get('/callback', function(request, response) {
	console.log(request);	
	response.sendStatus(200);
});

module.exports = router;