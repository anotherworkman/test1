import React from 'react';
import {className} from '../BemHelper';

import "./EntriesTable.less";
const bemBlock = 'entries-table';


export default class EntriesTable extends React.Component {

    render() {
        return (
            <div className={className(bemBlock, { empty: !this.props.entries.length })}>
                <table className={className(bemBlock, 'table')}>
                    <tbody>
                    {[
                        <tr ref="header" key="header" className={className(bemBlock, 'row')}>
                        {
                            this.props.fields.map(field => (
                                <td key={field.id} className={className(bemBlock, 'cell', {header: true})}>
                                    <div className={className(bemBlock, 'header')}>{field.name}</div>
                                </td>
                            ))
                        }
                        </tr>,
                        this.props.entries.map(entry => (
                            <tr key={entry[0]} className={className(bemBlock, 'row')}>
                            {
                                entry.slice(1).map((value, index) => {
                                    if (index == 0) {
                                        value = <a href={'#' + entry[0]} className="link">{value}</a>;
                                    }
                                    return <td key={index} className={className(bemBlock, 'cell')}>{value}</td>;
                                })
                            }
                            </tr>
                        ))
                    ]}
                    </tbody>
                </table>
            </div>
        )
    }

    componentDidMount() {
        // чтобы при фильтрации не приыгала ширина колонок
        setTimeout(() => {
            var columns = React.findDOMNode(this.refs.header).childNodes;
            for (var i = 0; i < columns.length; i++) {
                var col = columns[i];
                col.style.width = window.getComputedStyle(col).width;
            }
        }, 100); // без timeout layout еще не успевает просчитаться

    }

}
