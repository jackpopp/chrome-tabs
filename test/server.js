var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');

var testServer = {

	server: null,

	start: function()
	{
		// Serve up public/ftp folder
		var serve = serveStatic('./', {'index': ['index.html', 'index.htm']})

		// Create server
		this.server = http.createServer(function(req, res){
		  var done = finalhandler(req, res)
		  serve(req, res, done)
		})

		// Listen
		this.server.listen(3000)
	},
	stop: function()
	{
		if (this.server) {
			this.server.close();
		}	
	}
}

module.exports = testServer