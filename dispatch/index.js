module.exports = dispatchEvent;

function dispatchEvent(window) {
    var Custom = window.CustomEvent;
    return function scopedDispatchEvent(el, name, options) {
        el.dispatchEvent(new Custom(name, options));
    };
}