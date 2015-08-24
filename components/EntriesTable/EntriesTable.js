import React from 'react';
import {className} from '../BemHelper';

import "./EntriesTable.less";
const bemBlock = 'entries-table';


export default class EntriesTable extends React.Component {

    render() {
        var directory = this.props.directory;
        return (
            <div className={bemBlock}>
                <table className={className(bemBlock, 'table')}>
                    {[
                        <tr key="header" className={className(bemBlock, 'row')}>
                            {
                                directory.fields.map(field => (
                                    <td key={field.id} className={className(bemBlock, 'cell', {header: true})}>
                                        <div className={className(bemBlock, 'header')}>{field.name}</div>
                                    </td>
                                ))
                            }
                        </tr>,
                        directory.items.map(item => (
                            <tr key={item.id} className={className(bemBlock, 'row')}>
                                {
                                    directory.fields.map(field => {
                                        var value = item[field.id];
                                        if (field.type == 'FLOAT') {
                                            value = value.toString().replace('.', ',');
                                        }
                                        if (field.id == 'name') {
                                            value = <a href={'#' + item.id} className="link">{value}</a>;
                                        }
                                        return <td key={field.id} className={className(bemBlock, 'cell')}>{value}</td>;
                                    })
                                }
                            </tr>
                        ))
                    ]}
                </table>
            </div>
        )
    }

}
