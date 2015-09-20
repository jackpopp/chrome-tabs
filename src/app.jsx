// get windows - done
// seperate by window - done
// add basic style - done
// collapse window - done
// close tab
// switch to tab - http://stackoverflow.com/questions/16276276/chrome-extension-select-next-tab
// add events
// create group
// save group

var React = require('react');
var TabService = require('./tabService.js');
var WindowService = require('./windowService.js');
var WindowDataBuilder = require('./windowDataBuilder.js');
var utils = require('./utils.js');

var Window = React.createClass({
    render: function() {
        return <li></li>;
    }
});

var Tab = React.createClass({
    render: function() {
        return <li id={this.props.id} className="list-group-item">{this.props.title}</li>;
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

    getInitialState: function() {
        return {open: true};
    },

    handleClick: function() {
        this.setState({ open: this.state.open ? false : true });
    },

    render: function() {
        return <div id={this.props.id} className="col-md-6">
            <div className="panel panel-default" onClick={this.handleClick}>
                <div className="panel-heading">
                    <div className="clearfix">
                        <span className="pull-left">Window: {this.props.id}</span>
                        <span className="pull-right">
                            <span className="badge">
                                {this.props.tabs.length} {utils.pluralise(this.props.tabs.length, 'tab')}
                            </span>
                        </span>
                    </div>
                </div>
                { this.state.open ? <ul className="list-group">
                    {this.props.tabs.map(function(tab){
                        return <Tab id={tab.id} key={tab.id} title={tab.title}/>
                    })}
                </ul> : null }
            </div>
        </div>;
    }
});

var WindowList = React.createClass({

    getInitialState: function() {
        return {windows: []};
    },

    componentDidMount: function() {
        let ws = new WindowService(chrome);
        let ts = new TabService(chrome);
        let windowDataBuilder = new WindowDataBuilder();

        ws.fetch((windows) => { 

            ts.fetch((tabs) => { 

                windows = windowDataBuilder.build(windows, tabs)
                this.setState({ windows: windows}) 
            });

            
        });

        window.onfocus = function() {
            // make change this to say refresh
            document.getElementById('main').innerHTML = null;
            React.render(<WindowList />, document.querySelector('#main'))
        }
    },

    render: function() {
        return (
            <div className="row">
                {this.state.windows.map(function(window) {
                    return <Window id={window.id} key={window.id} tabs={window.tabs} />
                })}
            </div>
        );
    }
});

//React.render(<TabList />, document.querySelector('#main'))
React.render(<WindowList />, document.querySelector('#main'))