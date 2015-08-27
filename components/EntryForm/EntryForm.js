import React, {PropTypes} from 'react';
import {className} from '../BemHelper';
import * as FormField from './FormField';


import './EntryForm.less';
const bemBlock = 'entry-form';

export default class EntryForm extends React.Component {

    static childContextTypes = { changeHandler: PropTypes.any };

    constructor(props) {
        super();
        var values = {}; props.data.entry.items.forEach(field =>
            values[field.id] =
                field.type == 'SELECT' ?
                    field.values.filter(val => val.selected)[0].id
                    :
                    field.value
        );
        this.state = { values: values };
    }

    getChildContext() {
        return { changeHandler: this.handleChange.bind(this) };
    }

    handleChange(id, value) {
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
                                    {FormField.createElement(field, this.state.values[field.id])}
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
