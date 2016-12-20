/**
 * Created by guowei on 16/12/20.
 */
import react_dom from 'react-dom';
const elements = {};
function addComponentByFun(key, element) {
    elements[key] = document.createElement('div');
    document.body.appendChild(elements[key]);
    react_dom.render(element, elements[key]);
}
function removeComponentByFun(key) {
    if (elements[key]) {
        react_dom.unmountComponentAtNode(elements[key]);
        elements[key].parentNode.removeChild(elements[key]);
        delete elements[key];
    }
}
export default {
    add: function (element) {
        const key = Math.floor(Math.random() * 1000000);
        addComponentByFun(key, element);
        return key;
    }, remove: function (key) {
        removeComponentByFun(key);
    }
};