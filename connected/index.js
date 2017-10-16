module.exports = connected;
var isWindow = require('@timelaps/is/window');

function connected(parent_) {
    var win, parent = parent_;
    if (!parent) {
        return false;
    }
    do {
        parent = parent.parentNode;
    } while ((parent && ((win = null) || (!(win = parent.defaultView) || !isWindow(win)))));
    return !!win;
}