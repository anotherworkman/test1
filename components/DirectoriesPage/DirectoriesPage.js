import React from 'react';
import Nav from '../Nav/Nav';
import DirectoriesList from '../DirectoriesList/DirectoriesList';

export default class DirectoriesPage extends React.Component {

    render() {
        return (
            <div>
                <Nav title="Справочники"/>
                <DirectoriesList directories={this.props.directories}/>
            </div>
        )
    }

}
