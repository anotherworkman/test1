import React from 'react';


export default class ClearableInput extends React.Component {

    render() {
        return <input type="text" value={this.props.value}/>
    }
}
