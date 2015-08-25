import React, {PropTypes} from 'react';
import {className} from '../BemHelper';

import './Nav.less';
const bemBlock = 'nav';


export default class Nav extends React.Component {

    static contextTypes = { router: PropTypes.any };

    render() {
        return (
            <div className={bemBlock}>
                {
                    this.props.path && this.props.path.length ?
                        <div className={className(bemBlock, 'path')}>
                        {
                            this.props.path.map((item, index) => (
                                <div key={index} className={className(bemBlock, 'path-item')}>
                                    <a
                                        href={this.context.router.makeHref(item.route, item.params)}
                                        className="link"
                                    >
                                        {item.title}
                                    </a>
                                </div>
                            ))
                        }
                        </div>
                    :
                        null
                }
                <div className={className(bemBlock, 'header')}>{this.props.title}</div>
            </div>
        )
    }

    componentDidMount() {
        this.updateTitle();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.title != this.props.title) {
            this.updateTitle();
        }
    }

    updateTitle() {
        document.title = this.props.title;
    }

}
