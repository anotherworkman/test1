import React, {PropTypes} from 'react';
import {className} from '../BemHelper';

import "./EntriesTable.less";
const bemBlock = 'entries-table';

var highlightReplacement = '<span class="_">$&</span>'.replace('_', className(bemBlock, 'highlight'));

export default class EntriesTable extends React.Component {

    static contextTypes = { router: PropTypes.any };

    render() {
        var highlightRegExp = null;

        if (this.props.textToHighlight) {
            var textToHighlightEscaped = this.props.textToHighlight.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
            highlightRegExp = new RegExp(textToHighlightEscaped, 'gi');
        }

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
                        this.props.entries.map(entry => {
                            var entryId = entry[0];
                            var values = entry.slice(1);
                            var cells = values.map((value, index) => {
                                if (highlightRegExp) {
                                    value = value.replace(highlightRegExp, highlightReplacement);
                                    value = <span dangerouslySetInnerHTML={{__html: value}}/>;
                                }
                                if (index == 0) {
                                    var href = this.context.router.makeHref('entry', {
                                        directoryId: this.props.directoryId,
                                        entryId: entryId
                                    });
                                    value = <a href={href} className="link">{value}</a>;
                                }
                                return <td key={index} className={className(bemBlock, 'cell')}>{value}</td>;
                            });
                            return <tr key={entryId} className={className(bemBlock, 'row')}>{cells}</tr>;
                        })
                    ]}
                    </tbody>
                </table>
            </div>
        )
    }

    componentDidMount() {
        if (! window.getComputedStyle) {
            return; //hello, ie8
        }
        // чтобы при фильтрации не прыгала ширина колонок
        setTimeout(() => {
            var columns = React.findDOMNode(this.refs.header).childNodes;
            for (var i = 0; i < columns.length; i++) {
                var col = columns[i].firstChild; // ширина ячеек в ie не правильная, поэтому берем wrapper
                col.style.width = window.getComputedStyle(col).width;
            }
        }, 100); // без timeout layout еще не успевает просчитаться

    }

}
