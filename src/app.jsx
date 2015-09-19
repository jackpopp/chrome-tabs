// get windows
// seperate by window
// add events
// close tab
// switch to tab - http://stackoverflow.com/questions/16276276/chrome-extension-select-next-tab
// create group
// save group

var React = require('react');
var TabService = require('./tabService.js');
var WindowService = require('./windowService.js');
var WindowDataBuilder = require('./windowDataBuilder.js');

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
        return {tabs: []};
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

var Window = React.createClass({
    render: function() {
        return <li id={this.props.id}>
            Window: {this.props.id}
            <ul>
                {this.props.tabs.map(function(tab){
                    return <Tab id={tab.id} key={tab.id} title={tab.title}/>
                })}
            </ul>
        </li>;
    }
});

var WindowList = React.createClass({

    getInitialState: function() {
        return {windows: []};
    },

    componentDidMount: function()
    {
        let ws = new WindowService(chrome);
        let ts = new TabService(chrome);
        let windowDataBuilder = new WindowDataBuilder();

        ws.fetch((windows) => { 

            ts.fetch((tabs) => { 

                windows = windowDataBuilder.build(windows, tabs)
                this.setState({ windows: windows}) 
            });

            
        });

        window.onfocus = function(){
            console.log('re render window and tab list');
        }
    },

    render: function() {
        return (
            <ul>
                {this.state.windows.map(function(window){
                    return <Window id={window.id} key={window.id} tabs={window.tabs} />
                })}
            </ul>
        );
    }
});

//React.render(<TabList />, document.querySelector('#main'))
React.render(<WindowList />, document.querySelector('#main'))