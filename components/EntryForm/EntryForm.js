import React from 'react';
import {className} from '../BemHelper';
import * as controls from '../controls/controls';
import DateInput from '../controls/DateInput/DateInput';

import './EntryForm.less';
const bemBlock = 'entry-form';

var valueFormatters = {
    'INTEGER': field => field.value.toString(),
    'FLOAT':   field => field.value.toString().replace('.', ','),
    'SELECT':  field => field.values.filter(value => value.selected)[0].id
}

export default class EntryForm extends React.Component {

    constructor(props) {
        super();
        this.fieldChangeHandler = this.handleFieldChange.bind(this);
        var values = {}; props.data.entry.items.forEach(field =>
            values[field.id] = field.type in valueFormatters ? valueFormatters[field.type](field) : field.value
        );
        this.state = { values: values };
    }

    render() {
        var fields = this.props.data.entry.items;
        return (
            <div className={bemBlock}>
                <table className={className(bemBlock, 'table')}>
                    <tbody>
                    {
                        fields.map(field => {
                            var value = this.state.values[field.id];
                            var typeMod = field.type.toLowerCase();
                            return (
                                <tr key={field.id} className={className(bemBlock, 'field')}>
                                    <td className={className(bemBlock, 'field-label-cell')}>
                                        {field.name}
                                    </td>
                                    <td className={className(bemBlock, 'field-input-cell')}>
                                        <div className={className(bemBlock, 'field-input-box', { type: typeMod })}>
                                            {createControlElement(field, value, this.fieldChangeHandler)}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }

    handleFieldChange(id, value) {
        this.state.values[id] = value;
        this.forceUpdate();
    }

}


var controlsMap = {
    'TEXT':     controls.TextInput,
    'INTEGER':  controls.TextInput,
    'FLOAT':    controls.TextInput,
    'TEXTAREA': controls.TextArea,
    'SELECT':   controls.SelectBox,
    'DATE':     DateInput
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
