import React from 'react';
import {className} from '../BemHelper';
import * as controls from '../controls/controls';
import DateInput from '../controls/DateInput/DateInput';

import './EntryForm.less';
const bemBlock = 'entry-form';


var controlsMap = {
    'TEXT': controls.TextInput,
    'INTEGER': controls.IntegerNumberInput,
    'FLOAT': controls.FloatNumberInput,
    'TEXTAREA': controls.TextArea,
    'SELECT': controls.SelectBox,
    'DATE': DateInput
};


function createControlElement(fieldSpec, value, changeHandler) {
    var type = fieldSpec.type;
    if (! (type in controlsMap)) {
        throw new Error('unknown field type: ' + type);
    }
    var props = {
        value: value,
        onChange: value => changeHandler(fieldSpec.id, value)
    };
    if (type == 'SELECT') {
        props.items = fieldSpec.values
    }
    return React.createElement(controlsMap[type], props);
}


export default class EntryForm extends React.Component {

    constructor(props) {
        super();
        this.fieldChangeHandler = this.handleFieldChange.bind(this);
        var values = {}; props.data.entry.items.forEach(field =>
            values[field.id] =
                field.type == 'SELECT' ?
                    field.values.filter(val => val.selected)[0].id
                    :
                    field.value
        );
        this.state = { values: values };
    }

    handleFieldChange(id, value) {
        this.state.values[id] = value;
        this.forceUpdate();
    }

    render() {
        var fields = this.props.data.entry.items;
        return (
            <div className={bemBlock}>
                <table className={className(bemBlock, 'table')}>
                    <tbody>
                    {
                        fields.map(field => (
                            <tr key={field.id} className={className(bemBlock, 'field')}>
                                <td className={className(bemBlock, 'field-label')}>
                                    {field.name}
                                </td>
                                <td className={className(bemBlock, 'field-input')}>
                                    {createControlElement(field, this.state.values[field.id], this.fieldChangeHandler)}
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }

}
