// mocha --compilers js:mocha-traceur
//let sinon = require('sinon');
let assert = require("assert");
//let chrome = require('../node_modules/sinon-chrome/src/chrome.js');
let mockTabs = [
	{id: 1, url: 'test', title: 'title'},
	{id: 2, url: 'test-two', title: 'title-two'}
];
let chrome = {
	tabs: {
		query: function(args, cb){
			cb(mockTabs);
		}
	}
}
let TabService = require('../src/tabService.js');
let ts = new TabService(chrome);

describe('Tab Service', function() {
	describe('Construct', function() {
		it('Has an instance of the chrome API', function() {
			assert.equal('object', typeof ts.chrome);
		});
	});

	describe('Fetch Tabs', function() {
		it('Returns two tabs when fetch is called', function(done) {
			ts.fetch((response) => { 
				assert.deepEqual(mockTabs, response); 
				done();
			});
		});
	});
});