var https 		= require('https');
var fs 			= require('fs');
var config 		= require('./config');
var express 	= require('express');
var app 		= express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/start/task/:taskName', function (req, res) { 
	var path = config.api.startTaskPath + encodeURIComponent(req.params.taskName) + '&xrfkey=' + config.api.xrfkey
	
	var options = {
		rejectUnauthorized: false,
		hostname: config.server.url,
		port: config.server.port,
		path: path,
		method: 'POST',
		body: '',
		headers: {
			'x-qlik-xrfkey' : config.api.xrfkey,
			'X-Qlik-User' : 'UserDirectory= Internal; UserId= sa_repository '
		},
		key: fs.readFileSync(config.certificates.key),
		cert: fs.readFileSync(config.certificates.cert)
	};

	var post_req = https.request(options, function(resp) {
		resp.on("data", function(chunk) {
			chunk = JSON.parse(chunk.toString());
			var result = [];
			result.push('guid, error');
			result.push(chunk.value + ',')
			res.send(  result.join('\r\n'));
		});
	}).on('error', function(e) {
			var result = [];
			result.push('guid, error');
			result.push(',' + e.message);
			res.send(  result.join('\r\n'));	
	});

	post_req.write('');
	post_req.end();
});

var server = app.listen(config.app.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server listening at http://%s:%s', host, port);
});
