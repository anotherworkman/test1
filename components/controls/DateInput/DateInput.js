import React from 'react';
import DatePicker from 'react-date-picker';
import {TextInput} from '../controls';
import {className} from '../../BemHelper';

import './DateInput.less';


export default class DateInput extends TextInput {
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
        this.props.changeHandler(id, value);
    }
}
