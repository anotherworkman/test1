import React, {PropTypes} from 'react';
import {className} from '../BemHelper';

import './DirectoriesList.less';
const bemBlock = 'directories-list';

export default class DirectoriesList extends React.Component {

    static contextTypes = { router: PropTypes.any };

    render() {
        return (
            <div className={bemBlock}>
            {
                this.props.data.directories.map(dir =>
                    <div key={dir.id} className={className(bemBlock, 'item')}>
                        <a
                            href={this.context.router.makeHref('directory', { directoryId: dir.id })}
                            className="link"
                        >
                            {dir.name}
                        </a>
                    </div>
                )
            }
            </div>
        )
    }

}
