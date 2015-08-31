import React from 'react';
import DatePicker from 'react-date-picker';
import {TextInput} from '../controls';
import {className} from '../../BemHelper';

import './DateInput.less';
const bemBlock = 'date-input';


export default class DateInput extends React.Component {

    constructor() {
        super();
        this.state = { pickerActive: false };
    }

    render() {
        return (
            <div
                className={className(bemBlock, { pickerActive: this.state.pickerActive })}
            >
                <TextInput
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
                <div
                    className={className(bemBlock, 'picker-toggler')}
                    onClick={this.handlePickerTogglerClick.bind(this)}
                />
                {
                    this.state.pickerActive ?
                        <div
                            ref="picker"
                            className={className(bemBlock, 'picker-box')}
                            tabIndex="0"
                            onBlur={this.handlePickerBlur.bind(this)}
                            onFocus={this.handlePickerFocus.bind(this)}
                            onKeyDown={e => [13, 27].indexOf(e.keyCode) != -1 ? e.target.blur() : null}
                        >
                            <DatePicker
                                locale="ru"
                                dateFormat="DD.MM.YYYY"
                                date={this.props.value}
                                onChange={this.props.onChange}
                                todayText="Показать текущий месяц"
                            />
                        </div>
                    : false
                }
            </div>
        );
    }

    handlePickerTogglerClick() {
        if (! this.state.pickerActive) {
            this.showPicker();
        }
        // else { раз был нажат toggler, то picker уже потерял фокус — сам уберется }
    }

    showPicker() {
        this.setState({ pickerActive: true });
        setTimeout(() => React.findDOMNode(this.refs.picker).focus(), 10);
    }

    hidePicker() {
        this.setState({ pickerActive: false });
    }

    // react любезно эмулирует всплытие foucs- и blur-событий
    handlePickerFocus() {
        this.pickerFocused = true;
    }
    handlePickerBlur() {
        this.pickerFocused = false;
        // не будем спешить, через мгновение известие о фокусе может вернуться,
        // если он перешел к потомку
        setTimeout(() => !this.pickerFocused && this.hidePicker(), 10);
    }

}
