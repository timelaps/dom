module.exports = computed;
var mapValues = require('@timelaps/n/map/values');
var returnsFirst = require('@timelaps/returns/first');
var isWindow = require('@timelaps/is/window');

function computed(window) {
    return function (el, ctx) {
        // get computed must be called on the window that contains the element
        var ret = getClosestWindow(ctx).getComputedStyle(el);
        return ret ? ret : getClosestWindow(el).getComputedStyle(el) || mapValues(el[STYLE], returnsFirst) || {};
    };

    function getClosestWindow(windo_) {
        var globl, windo = windo_ || window;
        return isWindow(windo) ? windo : (windo && windo.defaultView ? windo.defaultView : ((globl = windo.ownerGlobal) ? globl : windo.ownerDocument.defaultView || window));
    }
}