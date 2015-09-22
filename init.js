//chrome.tabs.create({ url:'index.html' });
chrome.tabs.query({}, function(chromeTabs) {
	openTab = null;

	chromeTabs.forEach(function(tab) {
		if (tab.title === 'Chrome Tab Manager') {
			openTab = tab;
		}
	});

	if (openTab) 
	{
		chrome.tabs.update(openTab.id, {active: true});
		// will need to also focus the window, this doesnt seem to work though and it changes then swaps back to the current window
		chrome.windows.update(openTab.windowId,{focused: true});
	}
	else 
	{
		chrome.tabs.create({ url:'index.html' });
	}
});

