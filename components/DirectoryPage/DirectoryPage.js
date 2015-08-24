import React from 'react';
import Nav from '../Nav/Nav';
import EntriesTable from '../EntriesTable/EntriesTable';
//import ClearableInput from '../ClearableInput/ClearableInput';
import {className} from '../BemHelper';

import "./DirectoryPage.less";
const bemBlock = 'directory-page';


export default class DirectoryPage extends React.Component {

    render() {
        return (
            <div className={bemBlock}>
                <div className={className(bemBlock, 'nav-box')}>
                    <Nav path={['Справочники']} title={this.props.directory.name}/>
                </div>
                <div className="button">+ Создать новый</div>
                <div className={className(bemBlock, 'content')}>
                    <div className={className(bemBlock, 'entries-table-box')}>
                        <EntriesTable directory={this.props.directory}/>
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

    componentDidMount() {
        document.title = this.props.directory.name;
    }

}
