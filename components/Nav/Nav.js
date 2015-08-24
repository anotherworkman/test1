import React from 'react';
import {className} from '../BemHelper';

import "./Nav.less";
const bemBlock = 'nav';


export default class Nav extends React.Component {

    render() {
        return (
            <div className={bemBlock}>
                {
                    this.props.path ?
                        <div className={className(bemBlock, 'path')}>
                        {
                            this.props.path.map((item, index) => (
                                <div key={index} className={className(bemBlock, 'path-item')}>
                                    <a href="#" className="link">{item}</a>
                                </div>
                            ))
                        }
                        </div>
                    :
                        null
                }
                <div className={className(bemBlock, 'header')}>{this.props.title}</div>
                {
                    this.props.children
                }
            </div>
        )
    }

}
