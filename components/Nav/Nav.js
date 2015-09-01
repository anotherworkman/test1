import React, {PropTypes} from 'react';
import {className} from '../BemHelper';

import './Nav.less';
const bemBlock = 'nav';


export default class Nav extends React.Component {

    static contextTypes = { router: PropTypes.any };

    constructor(props, context) {
        super(props, context);
        this.state = this.getNavState(props.data);
    }
    componentWillReceiveProps(props) {
        this.setState(this.getNavState(props.data));
    }

    render() {
        return (
            <div className={bemBlock}>
                {
                    this.state.path && this.state.path.length ?
                        <div className={className(bemBlock, 'path')}>
                        {
                            this.state.path.map((item, index) => (
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
                <div className={className(bemBlock, 'header')}>{this.state.title}</div>
            </div>
        )
    }

    getNavState(data) {
        if (! data) {
            var currentTitle = this.state ? this.state.title : '';
            return {
                path: this.state ? this.state.path : [],
                title: currentTitle + '...'
            }
        }
        var path = [];
        var title = 'Справочники';
        var directory = data.directory || (data.entry && data.entry.directory);
        if (directory) {
            path.push({title: title, route: 'directories'});
            title = directory.name;
            if (data.entry) {
                path.push({title: title, route: 'directory', params: {directoryId: directory.id} });
                title = data.entry.name;
            }
        }
        return {
            path: path,
            title: title
        }
    }

    componentDidMount() {
        this.updateDocumentTitle();
    }

    componentDidUpdate() {
        this.updateDocumentTitle();
    }

    updateDocumentTitle() {
        document.title = this.state.title;
    }

}
