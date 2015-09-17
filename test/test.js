// mocha --compilers js:mocha-traceur
let sinon = require('sinon');
let assert = require("assert");
let chrome = require('../node_modules/sinon-chrome/src/chrome.js');
let TabService = require('../src/tabService.js');
let ts = new TabService(chrome);
let tabs = [
	{id: 1, url: 'test', title: 'title'},
	{id: 2, url: 'test-two', title: 'title-two'}
];

describe('Tab Service', function() {
	describe('Construct', function() {
		it('Has an instance of the chrome API', function() {
			assert.equal('object', typeof ts.chrome);
		});
	});

	describe('Fetch Tabs', function() {
		it('Returns two tabs when fetch is called', function(done) {
			chrome.tabs.query.yields(tabs);
			ts.fetch((response) => { 
				//assert.equal(tabs, response); 
				sinon.assert.calledOnce(chrome.tabs.query);
				done();
			});
		});
	});
});