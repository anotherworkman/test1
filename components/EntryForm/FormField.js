import React, {PropTypes} from 'react';
import DatePicker from 'react-date-picker';
import './FormField.less';
import {className} from '../BemHelper';

export class FormField extends React.Component {

    static contextTypes = { changeHandler: PropTypes.any };

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
        this.context.changeHandler(id, value)
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


export class IntegerField extends FormField {
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


export class FloatField extends FormField {
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


export class TextareaField extends FormField {
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


export class SelectField extends FormField {
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


export class DateField extends FormField {
    render() {
        return (
            <div>
                <input
                    className={className('input', this.getStyleMods())}
                    type="text"
                    value={this.formatValue(this.props.value)}
                    onChange={this.handleChange}
                />
                <DatePicker
                    locale="ru"
                    dateFormat="DD.MM.YYYY"
                    date={this.props.value}
                    onChange={this.handleChange}
                    todayText="Показать текущий месяц"
                />
            </div>
        );
    }
    handleChange(value) {
        var id = this.props.fieldSpec.id;
        this.context.changeHandler(id, value);
    }
}


var componentMap = {
    'TEXT': FormField,
    'DATE': DateField,
    'INTEGER': IntegerField,
    'FLOAT': FloatField,
    'TEXTAREA': TextareaField,
    'SELECT': SelectField
};


export function createElement(fieldSpec, value) {
    var type = fieldSpec.type;
    if (! (type in componentMap)) {
        throw new Error('unknown field type: ' + type);
    }
    return React.createElement(componentMap[type], { fieldSpec: fieldSpec, value: value });
}
