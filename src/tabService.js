module.exports = class TabService {
	constructor(chrome, callback) {
		this.chrome = chrome;
	}

	fetchTabs(callback){
		let tabs = [];
		let promise = new Promise(function(resolver, reject){
			resolver();
		});

		promise.then( () => {
			callback(tabs);
		});
	}
}