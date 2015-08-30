import React from 'react';
import './controls.less';
import {className} from '../BemHelper';

//todo: не наследование тут ни к чему, нужно сделать фабрику классов
//todo: перенести сюда также SearchInput и стили кнопок (и прочие ссылки из App.less)

export class TextInput extends React.Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <input
                className={className('input', this.getStyleMods())}
                type="text"
                value={this.formatValue(this.props.value)}
                onChange={this.handleChange}
                />
        )
    }

    handleChange(e) {
        var id = this.props.fieldSpec.id;
        var value = this.parseValue(e.target.value);
        if (value === null) {
            return;
        }
        this.props.changeHandler(id, value)
    }

    formatValue(value) {
        return value;
    }

    parseValue(value) {
        return value;
    }

    getStyleMods() {
        return {};
    }

}


export class IntegerNumberInput extends TextInput {
    formatValue(value) {
        return value.toString();
    }
    parseValue(value) {
        return parseInt(value, 10);
    }
    getStyleMods() {
        return { numeric: true };
    }
}


export class FloatNumberInput extends TextInput {
    formatValue(value) {
        return value.toString().replace('.', ',');
    }
    parseValue(value) {
        return parseFloat(value.replace(',', '.'));
    }
    getStyleMods() {
        return { numeric: true };
    }
}


export class TextArea extends TextInput {
    render() {
        return (
            <textarea
                className="input"
                value={this.formatValue(this.props.value)}
                onChange={this.handleChange}
                />
        );
    }
}


export class SelectBox extends TextInput {
    render() {
        var items = this.props.fieldSpec.values;
        return (
            <select value={this.props.value} onChange={this.handleChange}>
                {
                    items.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))
                }
            </select>
        );
    }
}

