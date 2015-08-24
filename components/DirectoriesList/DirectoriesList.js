import React from 'react';
import {className} from '../BemHelper';

import "./DirectoriesList.less";
const bemBlock = 'dir';

export default class DirectoriesList extends React.Component {

    render() {
        return (
            <div className={bemBlock}>
                {
                    this.props.directories.map(dir =>
                            <div className={className(bemBlock, 'item')}>
                                <a href={'#' + dir.id} className="link">{dir.name}</a>
                            </div>
                    )
                }
            </div>
        )
    }

}
