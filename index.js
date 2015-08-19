var express 		= require('express'),
	echojs			= require('echojs'),
	SpotifyWebApi 	= require('spotify-web-api-node'),
	app 			= express();
	
var echonest = echojs({
	key: process.env.ECHONEST_API_KEY
});

var spotify = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLEINT_SECRET,
  redirectUri: APP_REDIRECT_CALLBACK_URL
});

	
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
	response.send('Hello World!');
});

app.get('/callback', function(request, response) {
	console.log(request);	
});

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});