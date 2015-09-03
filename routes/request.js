var express 		= require('express'),
	echojs			= require('echojs'),
	SpotifyWebApi 	= require('spotify-web-api-node'),
	router 			= express.Router();
	
var testSearch = "Open Season";

var echonest = echojs({
	key: process.env.ECHONEST_API_KEY
});

var spotifyApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_CLEINT_SECRET,
	redirectUri: process.env.APP_REDIRECT_CALLBACK_URL
});

router.get('/search', function(request, response, next) {
	spotifyApi.searchTracks(request.query.track_search, { limit: 10 }).then(function(data) {
		console.log('Search by ' + testSearch, data.body);
		response.status(200).type('json').send(data.body);
	}, function(err) {
		console.error(err);
		
		response.status(503).send({ error: err});
	});
});

module.exports = router;