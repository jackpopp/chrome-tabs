// get windows
// seperate by window
// add events
// close tab
// switch to tab - http://stackoverflow.com/questions/16276276/chrome-extension-select-next-tab
// create group
// save group

var React = require('react');
var TabService = require('./tabService.js');
var WindowService = require('./windowService.js')

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

    componentDidMount: function()
    {
        let ts = new TabService(chrome);
        ts.fetch((tabs) => { this.setState({ tabs: tabs}) });

        let ws = new WindowService(chrome);
        ws.fetch((windows) => { console.log(windows) });
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

var WindowList = React.createClass({
    render: function() {
        
    }
});

React.render(<TabList />, document.querySelector('#main'))