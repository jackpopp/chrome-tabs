// get windows
// seperate by window
// close tab
// switch to tab - http://stackoverflow.com/questions/16276276/chrome-extension-select-next-tab
// create group
// save group

var windows = [];
var tabObjects = [];

function getAllTabs()
{
	tabObjects = [];

	chrome.tabs.query({}, function(tabs) 
	{
		tabs.forEach(function(tab) 
		{
			if (currentTabIsNotTabManager(tab))
			{
				tabObjects.push(tab);
			}
		});

		renderTabs();
	});
}

function renderTabs()
{
	$('.js-list').html('');
	strings = []

	tabObjects.forEach(function(tab) 
	{
		string = [];
		string.push('<li data-tab-id='+tab.id+'>');

		if (tab.favIconUrl && (! tab.favIconUrl.match('chrome-extension')))
		{
			string.push('<img src="'+tab.favIconUrl+'" style="width:14px; height: 14px;">');
		}

		string.push('<a href="'+tab.url+'">'+tab.title+'<\/a></li>');

		strings.push(string.join(''));
	});

	$('.js-list').append(strings.join(''));

	$('.js-total-tabs').html(tabObjects.length)
}

function currentTabIsNotTabManager(tab)
{
	return (tab.title === 'Chrome Tab Manager') === false;
	//return ((document.title === tab.title) && (tab.highlighted)) === false;
}

chrome.tabs.onCreated.addListener(function()
{
	getAllTabs();
});

chrome.tabs.onRemoved.addListener(function()
{
	getAllTabs();
});

chrome.tabs.onAttached.addListener(function()
{
	getAllTabs();
});

chrome.tabs.onDetached.addListener(function()
{
	getAllTabs();
});

chrome.tabs.onUpdated.addListener(function()
{
	getAllTabs();
});

getAllTabs();