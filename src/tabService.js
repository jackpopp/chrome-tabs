module.exports = class TabService {
	constructor(chrome) {
		this.chrome = chrome;
	}

	fetch(callback) {
		let tabs = [];
		let promise = new Promise(function(resolver, reject) {

			this.chrome.tabs.query({}, function(chromeTabs) 
	        {
	            chromeTabs.forEach(function(tab) 
	            {
	                if (this.currentTabIsNotTabManager(tab))
	                {
	                    tabs.push(tab);
	                }
	            }.bind(this));

	            resolver();

	        }.bind(this));
		}.bind(this));

		promise.then(callback(tabs));
	}

	currentTabIsNotTabManager(tab) {
        return (tab.title === 'Chrome Tab Manager') === false;
    }
}