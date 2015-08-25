import React from 'react';
import Router, {Route, DefaultRoute, RouteHandler} from 'react-router';

import Nav from './Nav/Nav';
import DirectoriesList from './DirectoriesList/DirectoriesList';
import DirectoryEntries from './DirectoryEntries/DirectoryEntries';

import directories from '../json/getDirectories.json';
import directory from '../json/getDirectory.json';

var data = {
    directories: directories.response,
    directory: directory.response
};

import './App.less';


class App extends React.Component {

    render() {
        var navPath = [];
        var navTitle = 'Справочники';
        if (this.props.data.directory) {
            navPath.push(navTitle);
            navTitle = this.props.data.directory.name;
        }
        return (
            <div>
                <Nav path={navPath} title={navTitle}/>
                <RouteHandler data={this.props.data}/>
            </div>
        )
    }

}

var routes = (
    <Route handler={App}>
        <Route name="directory" path=":directoryId" handler={DirectoryEntries}/>
        <DefaultRoute name="directories" handler={DirectoriesList}/>
    </Route>
);

Router.run(routes, Router.HashLocation, (Root, state) => {
    var routeName = state.routes[1].name;
    var routeData = data[routeName];
    React.render(<Root data={routeData}/>, document.body.firstChild);
});
