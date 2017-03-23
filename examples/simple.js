/**
 * Created by guowei on 16/12/20.
 */

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import addComponent from 'fs-addcomponent'
import loading from 'react-loading-func'
import './base.css'
class Simple extends Component {
    add() {
        const key = addComponent.add(<div>22222</div>);
        setTimeout(function () {
            addComponent.remove(key);
        }, 5000)
    }

    render() {
        loading.show();
        return (
            <div style={{margin:20}}>
                <div onClick={this.add.bind(this)}>添加组件(添加在最下面了)</div>
            </div>
        )
    }
}
ReactDOM.render(
    <Simple />,
    document.getElementById('__react-content')
);