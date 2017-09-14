module.exports = dispatchEvent;

function dispatchEvent(window) {
    return function dispatchEvent(el, name, options) {
        el.dispatchEvent(new window.CustomEvent(name, options));
    };
}