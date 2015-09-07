var express 		= require('express'),
	echojs			= require('echojs'),
	SpotifyWebApi 	= require('spotify-web-api-node'),
	cors 			= require('cors'),
	bpmSink			= require('bpm.js'),
	ms 				= require('mediaserver'),
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
	var track_selection = request.query.track;
	
	echonest('song/search').get({
		artist: track_selection.artists[0].name,
		title: track_selection.name,
	}, function(err, json) {	
		if(json.response.status.code == 0 && json.response.status.message == 'Success' && json.response.songs[0] != null){
			echonest('song/profile').get({
				id: json.response.songs[0].id,
				bucket: ['audio_summary']
			}, function(err, json) {
				if(err) {
					console.log(err);
					response.status(200).type('json').send({error: err});
				} else {
					if(json.response.status.code == 0 && json.response.status.message == 'Success'){
						var fpm = 24 * 60;
						var fps = Math.round(fpm / json.response.songs[0].audio_summary.tempo);
						json.response.songs[0].audio_summary.fps = fps;
						response.status(200).type('json').send(json.response.songs[0].audio_summary);
					} else {
						console.log("Error: " + json.response.status.code + " - " + json.response.status.message);
						response.status(200).type('json').send({error: json.response.status.message, error_code: json.response.status.code});
					}
				}
			});
		} else if(json.response.songs[0] == null) {
			console.log('error: no songs');
			response.status(200).type('json').send({error: 'No song details available.'});	
/*
			createAudioStream(track_selection.preview_url).pipe(bpmSink()).on("bpm", function(bpm){
				console.log("bpm is %d", bpm);
				response.status(200).type('json').send({error: 'No song details available.'});
			});
*/
		} else {
			console.log('Line 58: ' + err);
			response.status(200).type('json').send({error: err});
		}
	});
});

module.exports = router;