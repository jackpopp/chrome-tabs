chrome.tabs.query({}, function(chromeTabs) {
	openTab = null;

	chromeTabs.forEach(function(tab) {
		if (tab.title === 'Chrome Tab Manager')
			openTab = tab;
	});

	if (tab) 
	{
		// will need to also focus the window
		chrome.tabs.update(tab.id, {active: true});
	}
	else 
	{
		chrome.tabs.create({ url:'index.html' });
	}
});
