module.exports = class WindowDataBuilder {

	build(windowData, tabData) {
		let returnData = [];

		windowData.forEach(function(win) {
			win.tabs = [];

			tabData.forEach(function(tab) {
				if (tab.windowId == win.id)
				{
					win.tabs.push(tab)
				}
			});

		});

		return windowData;
	}
}