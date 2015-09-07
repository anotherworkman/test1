import React from 'react';
import Nav from '../Nav/Nav';
import EntriesTable from '../EntriesTable/EntriesTable';
import {SearchInput} from '../controls/controls';
import {className} from '../BemHelper';

//todo: entries-filter сделать элементом, а не отдельным блоком
import './DirectoryEntries.less';
const bemBlock = 'directory-entries';


export default class DirectoryEntries extends React.Component {

    constructor(props) {
        super();
        var directory = props.data.directory;
        var entries = directory.items.map(item => {
            var values = directory.fields.map(field => {
                var value = item[field.id].toString();
                if (field.type == 'FLOAT') {
                    value = value.replace('.', ',');
                }
                return value;
            });
            values.unshift(item.id);
            return values;
        });

        this.state = {
            entries: entries,
            searchText: '',
            filteredEntries: entries
        };
    }

    render() {
        var directory = this.props.data.directory;
        return (
            <div className={bemBlock}>
                <button className="button button_primary">+ Создать новый</button>
                <div className={className(bemBlock, 'entries-box')}>
                    <div className={className(bemBlock, 'entries-table-box')}>
                        <EntriesTable
                            directoryId={directory.id}
                            fields={directory.fields}
                            entries={this.state.filteredEntries}
                            searchText={this.state.searchText}
                        />
                    </div>
                    <div className={className(bemBlock, 'entries-filter-box')}>
                        <div className="entries-filter">
                            <div className="entries-filter__title">Фильтр</div>
                            <div className="entries-filter__input-form">
                                <SearchInput
                                    placeholder="Поиск"
                                    autoFocus={true}
                                    value={this.state.searchText}
                                    onChange={this.handleFilterChange.bind(this)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handleFilterChange(searchText) {
        this.setState({
            searchText: searchText,
            filteredEntries: this.filterEntries(this.state.entries, searchText)
        });
    }

    filterEntries(entries, searchText) {
        if (!searchText) {
            return entries;
        }
        searchText = searchText.toLowerCase();
        return (
            entries.filter(entry =>
                entry.slice(1) // первый элемент, содержащий id, не учитываем
                    .some(val => val.toLowerCase().indexOf(searchText) != -1))
        );
    }

}
