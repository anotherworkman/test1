import 'es5-shim';
import 'es5-shim/es5-sham';

import React from 'react';
import Router, {Route, DefaultRoute, RouteHandler} from 'react-router-ie8';
import xhr from 'xhr';

import Nav from './Nav/Nav';
import DirectoriesList from './DirectoriesList/DirectoriesList';
import DirectoryEntries from './DirectoryEntries/DirectoryEntries';
import EntryForm from './EntryForm/EntryForm';

import './App.less';


class App extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = { data: null };
        this.loadData(props.activeRoute);
    }
    componentWillReceiveProps(props) {
        this.setState({ data: null });
        this.loadData(props.activeRoute);
    }

    render() {
        var data = this.state.data;
        return (
            <div>
                <Nav data={data}/>
                {
                    data ? <RouteHandler data={data}/> : null
                }
            </div>
        )
    }

    loadData(route) {
        xhr({ url: this.getDataUrl(route) }).then(resp =>
            this.setState({ data: JSON.parse(resp.body).response })
        );
    }

    getDataUrl(route) {
        return ({
            directories: './json/getDirectories.json',
            directory: './json/getDirectory.json',
            entry: './json/getEntry.json'
        })[route.name];
    }
}

var routes = (
    <Route path="/" handler={App}>
        <DefaultRoute name="directories" handler={DirectoriesList}/>
        <Route name="directory" path="directory:directoryId" handler={DirectoryEntries}/>
        <Route name="entry" path="directory:directoryId/entry:entryId" handler={EntryForm}/>
    </Route>
);

Router.run(routes, Router.HashLocation, (Root, state) => {
    React.render(<Root activeRoute={state.routes[1]}/>, document.body.firstChild);
});
