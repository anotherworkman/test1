import React from 'react';

import './controls.less';


export class TextInput extends React.Component {
    render() {
        return (
            <input
                className="input"
                type="text"
                value={this.props.value}
                onChange={e => this.props.onChange(e.target.value)}
                />
        )
    }
}


export class SearchInput extends React.Component {
    render() {
        return (
            <input
                className="input input_searchable"
                type="search"
                placeholder={this.props.placeholder}
                autoFocus={this.props.autoFocus}
                value={this.props.value}
                onChange={e => this.props.onChange(e.target.value)}
            />
        )
    }
}


export class TextArea extends React.Component {
    render() {
        return (
            <textarea
                className="input input_textarea"
                value={this.props.value}
                onChange={e => this.props.onChange(e.target.value)}
            />
        );
    }
}


export class SelectBox extends React.Component {
    render() {
        return (
            <select
                className="select-box"
                value={this.props.value}
                onChange={e => this.props.onChange(e.target.value)}
            >
                {
                    this.props.items.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))
                }
            </select>
        );
    }
}

