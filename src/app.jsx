var React = require('react');

var Tab = React.createClass({
    getInitialState: function() {
        return {id: '', url: '', link: ''};
    },

    render: function() {
        return <div>Hello</div>;
    }
});

var TabList = React.createClass({
    getInitialState: function() {
        return {
            windows: [],
            tabs: []
        };
    },

    getAllTabs: function()
    {
        chrome.tabs.query({}, function(chromeTabs) 
        {
            chromeTabs.forEach(function(tab) 
            {
                if (currentTabIsNotTabManager(tab))
                {
                    this.tabs.push(tab);
                }
            }).bind(this);

            //renderTabs();
        }).bind(this);
    },

    componentDidMount: function()
    {
        this.getAllTabs();
    },

    render: function() {
        return <div>Hellooo</div>;
    }
});

React.render(<TabList />, document.querySelector('#main'))