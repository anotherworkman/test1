import React from 'react';
import Nav from '../Nav/Nav';
import EntriesTable from '../EntriesTable/EntriesTable';
//import ClearableInput from '../ClearableInput/ClearableInput';
import {className} from '../BemHelper';

import "./DirectoryEntries.less";
const bemBlock = 'directory-entries';


export default class DirectoryEntries extends React.Component {

    render() {
        return (
            <div className={bemBlock}>
                <div className="button">+ Создать новый</div>
                <div className={className(bemBlock, 'entries-box')}>
                    <div className={className(bemBlock, 'entries-table-box')}>
                        <EntriesTable directory={this.props.data.directory}/>
                    </div>
                    <div className={className(bemBlock, 'entries-filter-box')}>
                        <div className="entries-filter">
                            <div className="entries-filter__title">Фильтр</div>
                            <div className="entries-filter__input-form">
                                <div className="entries-filter__input-box">
                                    Поиск
                                    {/*<ClearableInput value={'Поиск'} onChange=""/>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
