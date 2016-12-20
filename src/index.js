/**
 * Created by guowei on 16/12/20.
 */
import React, { Component,isValidElement,createElement,cloneElement} from 'react';
import {
    View,
    AppRegistry,
    DeviceEventEmitter
} from 'react-native';

const originRegisterComponent = AppRegistry.registerComponent;
AppRegistry.registerComponent = function (e, t) {
    var i = t();
    return originRegisterComponent(e, function () {
        return React.createClass({
            getInitialState: function () {
                return {}
            }, componentWillMount: function () {
                DeviceEventEmitter.addListener("addComponentByFun", this.addComponent);
                DeviceEventEmitter.addListener("removeComponentByFun", this.removeComponent)
            }, componentWillUnmount: function () {
                DeviceEventEmitter.removeAllListeners("addComponentByFun");
                DeviceEventEmitter.removeAllListeners("removeComponentByFun");
            }, addComponent: function (key, element) {
                return isValidElement(element) ? void this.setState({[key]: element}) : void console.error("元素必须是有效的react组件!")
            }, removeComponent: function (key) {
                const state = this.state;
                delete state[key];
                this.setState(state)
            }, render: function () {
                const elements = [];
                for (let key in this.state) {
                    elements.push(cloneElement(this.state[key], {key: key}));
                }
                return createElement(View, {style: {flex: 1}}, createElement(i, this.props), elements)
            }
        })
    })
};
export default {
    add: function (element) {
        const key = Math.floor(Math.random() * 1000000);
        DeviceEventEmitter.emit("addComponentByFun", key, element);
        return key;
    }, remove: function (key) {
        DeviceEventEmitter.emit("removeComponentByFun", key)
    }
};