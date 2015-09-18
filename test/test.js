//let sinon = require('sinon');

let assert = require("assert");
let server = require('./server.js');
let request = require('request');

let mockTabs = require('./mocks/mockTabData.js');
let mockWindows = require('./mocks/mockWindowData.js');
let mockChrome = require('./mocks/mockChrome.js');

let TabService = require('../src/tabService.js');
let ts = new TabService(mockChrome);

let WindowService = require('../src/windowService.js');
let ws = new WindowService(mockChrome);

describe('Tab Service', function() {
    describe('Construct', function() {
        it('chrome dependency is an object', function() {
            assert.equal('object', typeof ts.chrome);
        });

        it('should have a chrome object that contains a tab object', function(){
            assert.equal(true, ts.chrome.hasOwnProperty('tabs'));
        });
    });

    describe('Fetch Tabs', function() {
        it('returns tabs when fetch is called', function(done) {
            ts.fetch((response) => { 
                assert.deepEqual(mockTabs, response); 
                done();
            });
        });
    });
});

describe('Window Service', function() {
    describe('Fetch Windows', function() {
        it('returns windows when fetch is called', function(done) {
            ws.fetch((response) => { 
                assert.deepEqual(mockWindows, response); 
                done();
            });
        });
    });
});

describe('Chrome Tab Manager', function() {

    it('should show a list of windows', function() {
        server.start();
        request.get('http://localhost:3000', function (err, res, body) {
          assert.equal(200, res.statusCode);
          assert.equal('hello', res.body);
          server.stop();
          done();
        });
    });

    it('should show a list of tabs', function() {

    });
})