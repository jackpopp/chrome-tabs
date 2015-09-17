// get windows
// seperate by window
// add events
// close tab
// switch to tab - http://stackoverflow.com/questions/16276276/chrome-extension-select-next-tab
// create group
// save group

var React = require('react');
var TabService = require('./tabService.js');

var Window = React.createClass({
    render: function() {
        return <li></li>;
    }
});

var Tab = React.createClass({
    render: function() {
        return <li id={this.props.id}>{this.props.title}</li>;
    }
});

var TabList = React.createClass({

    getInitialState: function() {
        return {windows: [], tabs: []};
    },

    getAllTabs: function()
    {
        var tempTabs = [];

        chrome.tabs.query({}, function(chromeTabs) 
        {
            chromeTabs.forEach(function(tab) 
            {
                if (this.currentTabIsNotTabManager(tab))
                {
                    tempTabs.push(tab);
                }
            }.bind(this));

            this.setState({ tabs: tempTabs});

        }.bind(this));
    },

    currentTabIsNotTabManager: function(tab)
    {
        return (tab.title === 'Chrome Tab Manager') === false;
    },

    componentDidMount: function()
    {
        let ts = new TabService(chrome);
        ts.fetchTabs( (tabs) => { console.log(tabs) } );
        this.getAllTabs();
    },

    render: function() {
        return (
            <ul>
                {this.state.tabs.map(function(tab){
                    return <Tab id={tab.id} key={tab.id} title={tab.title}/>
                })}
            </ul>
        );
    }
});

React.render(<TabList />, document.querySelector('#main'))