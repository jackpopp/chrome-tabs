module.exports = class TabService {
	constructor(chrome) {
		this.chrome = chrome;
	}

	fetch(callback) {
		let tabs = [];
		let promise = new Promise( (resolver, reject) => 
		{
			this.chrome.tabs.query({}, (chromeTabs) => 
			{
	            chromeTabs.forEach( (tab) => 
	            {
	                if (this.currentTabIsNotTabManager(tab))
	                {
	                    tabs.push(tab);
	                }
	            });

	            resolver();
	        });
		});

		promise.then(callback(tabs));
	}

	currentTabIsNotTabManager(tab) {
        return (tab.title === 'Chrome Tab Manager') === false;
    }
}