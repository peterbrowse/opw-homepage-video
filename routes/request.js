var express 		= require('express'),
	echojs			= require('echojs'),
	SpotifyWebApi 	= require('spotify-web-api-node'),
	cors 			= require('cors'),
	router 			= express.Router();

var echonest = echojs({
	key: process.env.ECHONEST_API_KEY
});

var spotifyApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_CLEINT_SECRET,
	redirectUri: process.env.APP_REDIRECT_CALLBACK_URL
});

router.get('/search', cors(), function(request, response, next) {
	spotifyApi.searchTracks(request.query.track_search, { limit: 5 }).then(function(data) {
		response.status(200).type('json').send(data.body.tracks.items);
	}, function(err) {
		console.error(err);
		response.status(200).type('json').send({error: err});
	});
});

router.get('/details', cors(), function(request, response, next) {
	echonest('song/search').get({
		id: request.query.track_id
	}, function(err, json) {
		response.status(200).type('json').send(json.response);
	});
});

module.exports = router;