import 'es5-shim';
import 'es5-shim/es5-sham';

import React from 'react';
import Router, {Route, DefaultRoute, RouteHandler} from 'react-router-ie8';

import Nav from './Nav/Nav';
import DirectoriesList from './DirectoriesList/DirectoriesList';
import DirectoryEntries from './DirectoryEntries/DirectoryEntries';
import EntryForm from './EntryForm/EntryForm';

import directories from '../json/getDirectories.json';
import directory from '../json/getDirectory.json';
import entry from '../json/getEntry.json';

var data = {
    directories: directories.response,
    directory: directory.response,
    entry: entry.response
};

import './App.less';


class App extends React.Component {

    render() {
        var navPath = [];
        var navTitle = 'Справочники';
        var data = this.props.data;
        var directory = data.directory || (data.entry && data.entry.directory);
        if (directory) {
            navPath.push({title: navTitle, route: 'directories'});
            navTitle = directory.name;
            if (data.entry) {
                navPath.push({title: navTitle, route: 'directory', params: {directoryId: directory.id} });
                navTitle = data.entry.name;
            }
        }
        return (
            <div>
                <Nav path={navPath} title={navTitle}/>
                <RouteHandler data={data}/>
            </div>
        )
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
    var routeName = state.routes[1].name;
    var routeData = data[routeName];
    React.render(<Root data={routeData}/>, document.body.firstChild);
});
