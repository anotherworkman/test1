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
                value={this.props.value}
                onChange={e => this.props.onChange(e.target.value)}
            />
        )
    }
}


export function FormattedInputClass(transformer) {

    return class FormattedInput extends React.Component {
        render() {
            return (
                <input
                    className="input"
                    type="text"
                    value={transformer.format(this.props.value)}
                    onChange={this.handleChange.bind(this)}
                    />
            )
        }
        handleChange(e) {
            var value = transformer.parse(e.target.value);
            if (value === null || value === undefined || isNaN(value)) {
                return;
            }
            this.props.onChange(value)
        }
    }

}


export var IntegerNumberInput = FormattedInputClass({

    format: value => value.toString(),

    parse:  value => isFinite(value) ? parseInt(value, 10) : null

});


export var FloatNumberInput = FormattedInputClass({

    format: value => value.toString().replace('.', ','),

    parse:  value => isFinite(value) ? parseFloat(value.replace(',', '.')) : null

});


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

