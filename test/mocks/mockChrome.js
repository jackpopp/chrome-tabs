module.exports = {
	tabs: {
		query: function(args, cb){
			cb(require('./mockTabData.js'));
		}
	},
	windows: {
		getAll: function(args, cb){
			cb(require('./mockWindowData.js'));
		}
	}
}