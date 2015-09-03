var express 		= require('express'),
	routes 			= require('./routes/index'),
	request			= require('./routes/request'),
	cors 			= require('cors'),
	app 			= express();
	
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use('/', routes);
app.use('/request', request);
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
app.use(cors());
app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});

module.exports = app;