import React from 'react';
import {className} from '../BemHelper';

import "./DirectoriesList.less";
const bemBlock = 'dir';

export default class DirectoriesList extends React.Component {

    render() {
        return (
            <div className={bemBlock}>
                {
                    this.props.data.directories.map(dir =>
                        <div key={dir.id} className={className(bemBlock, 'item')}>
                            <a href={'#/' + dir.id} className="link">{dir.name}</a>
                        </div>
                    )
                }
            </div>
        )
    }

}
