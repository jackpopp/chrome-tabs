// get windows - done
// seperate by window - done
// add basic style - done
// collapse window - done
// close tab
// switch to tab - done
// add events
// create group
// save group

var React = require('react');
var TabService = require('./tabService.js');
var WindowService = require('./windowService.js');
var WindowDataBuilder = require('./windowDataBuilder.js');
var utils = require('./utils.js');
var swal = require('sweetalert')

var Tab = React.createClass({

    close: function() {
        swal({
            title: "Are you sure?",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true }, 
            function() {   
                chrome.tabs.remove(this.props.id);
                this.props.onClick(this.props.id)
        }.bind(this));
    },

    switch: function() {
        chrome.tabs.update(this.props.id, {active: true});
    },

    render: function() {
        return <li id={this.props.id} className="list-group-item"><span className="pull-right" onClick={this.close}>x</span> <span onClick={this.switch}>{this.props.title}</span></li>;
    }
});

var Window = React.createClass({

    getInitialState: function() {
        return {open: true, tabs: []};
    },

    componentDidMount: function() {
        this.setState({tabs: this.props.tabs})
    },

    toggleOpen: function() {
        this.setState({ open: this.state.open ? false : true });
    },

    closeFunction: function(tabId) {
        let tabs = [];
        this.state.tabs.forEach(function(tab) {
            if (tab.id !== tabId) tabs.push(tab)
        });

        this.setState({ 
            tabs: tabs
        });
    },
  
    render: function() {
        return <div id={this.props.id} className="col-md-6">
            <div className="panel panel-default">
                <div className="panel-heading" onClick={this.toggleOpen}>
                    <span className="badge pull-right">{this.props.tabs.length} {utils.pluralise(this.props.tabs.length, 'tab')}</span>
                    Window: {this.props.id}
                </div>
                { this.state.open ? <ul className="list-group">
                    {this.state.tabs.map((tab) => {
                        return <Tab id={tab.id} key={tab.id} title={tab.title} onClick={this.closeFunction}/>
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
        this.getData();

        chrome.tabs.onCreated.addListener((tab) => {this.getData(tab)});
        chrome.tabs.onRemoved.addListener((tab) => {this.getData(tab)});
        chrome.tabs.onAttached.addListener((tab) => {this.getData(tab)});
        chrome.tabs.onDetached.addListener((tab) => {this.getData(tab)});
        chrome.tabs.onUpdated.addListener((tab) => {this.getData(tab)});
    },

    getData: function(tab) {
        console.log(tab)
        this.setState({windows: []});

        let ws = new WindowService(chrome);
        let ts = new TabService(chrome);
        let windowDataBuilder = new WindowDataBuilder();

        ws.fetch((windows) => { 

            ts.fetch((tabs) => { 

                windows = windowDataBuilder.build(windows, tabs)
                this.setState({ windows: windows}) 
            });
            
        });
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

/*function render() {
    document.getElementById('main').innerHTML = null;
    React.render(<WindowList />, document.querySelector('#main'));
}*/

React.render(<WindowList />, document.querySelector('#main'));