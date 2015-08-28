var express 		= require('express'),
	echojs			= require('echojs'),
	SpotifyWebApi 	= require('spotify-web-api-node'),
	router 			= express.Router();

var echonest = echojs({
	key: process.env.ECHONEST_API_KEY
});

var spotify = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_CLEINT_SECRET,
	redirectUri: process.env.APP_REDIRECT_CALLBACK_URL
});

router.get('/test', function(request, response, next) {
	response.send("requests");
});

/*
router.get('/search', function(request, response, next) {
	
});
*/

module.exports = router;