import React from 'react';
import DatePicker from 'react-date-picker';
import {TextInput} from '../controls';
//import {className} from '../../BemHelper';

import './DateInput.less';


export default class DateInput extends React.Component {
    render() {
        return (
            <div>
                <TextInput value={this.props.value} onChange={this.props.onChange}/>
                <DatePicker
                    locale="ru"
                    dateFormat="DD.MM.YYYY"
                    date={this.props.value}
                    onChange={this.props.onChange}
                    todayText="Показать текущий месяц"
                    />
            </div>
        );
    }
}
