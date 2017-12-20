(function () {
    var isFunction = require('@timelaps/is/function');
    if (isFunction(window.CustomEvent)) {
        return;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
    return CustomEvent;

    function CustomEvent(event, params_) {
        var params = params_ || {
            bubbles: false,
            cancelable: false,
            detail: null
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
})();