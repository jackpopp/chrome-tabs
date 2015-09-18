module.exports = class WindowService {
	constructor(chrome) {
		this.chrome = chrome;
	}

	fetch(callback) {
		let windows = [];
		let promise = new Promise( (resolver, reject) => 
		{
			this.chrome.windows.getAll({}, (chromeWindows) => 
			{
	            chromeWindows.forEach( (chromeWinow) => 
	            {
	            	windows.push(chromeWinow);
	            });

	            resolver();
	        });
		});

		promise.then(callback(windows));
	}
}