var cloneJSON = require('@timelaps/json/clone');
var test = require('./test-div');
var isWindow = require('@timelaps/is/window');
var extend = require('@timelaps/object/extend');
var $ = require('./$');
var generator = require('@timelaps/fn/generator/array');
var keys = require('@timelaps/n/keys');
var prefixed = require('@timelaps/css/prefixed');
var create = require('./create');
var fragment = require('./fragment');
var matches = require('./matches');
var fromString = require('./from-string');
var dispatch = require('./dispatch');
var parentMany = require('./parent/many');
var parent = require('./parent');
var attribute = require('./attribute');
var child = require('./child');
var connected = require('./connected');
var event = require('./event');
var insert = require('./insert');
var children = require('./child/all');
var is = require('./is');
var baseComputed = require('./computed');
var root = null;
var sibling = require('./sibling');
var stringify = require('./stringify');
var tagName = require('./tag/name');
var rootMany = null;
module.exports = baseline();

function baseline() {
    var baseChild = extend([{}, child]);
    var baseEvent = cloneJSON(event);
    var baseInsert = extend([{}, insert]);
    var baseIs = extend([{}, is]);
    var baseSibling = extend([{}, sibling]);
    return {
        html: baseChild.html,
        append: baseChild.append,
        prepend: baseChild.prepend,
        attribute: attribute,
        child: baseChild,
        children: children,
        connected: connected,
        event: baseEvent,
        scope: scope,
        insert: baseInsert,
        insertAfter: baseInsert.after,
        insertBefore: baseInsert.before,
        is: baseIs,
        parent: parent,
        root: root,
        rootMany: rootMany,
        sibling: baseSibling,
        nextSibling: baseSibling.next,
        previousSibling: baseSibling.previous,
        stringify: stringify,
        tagName: tagName,
    };
}

function scope(window) {
    if (!isWindow(window)) {
        throws({
            type: 'InvalidArgument',
            message: 'A global must be passed to be scoped against'
        });
    }
    var createScoped = create(window);
    var fragmentScoped = fragment(window);
    var computed = baseComputed(window);
    var cssDeclaration = computed(test, window);
    var prefixes = prefixed(generator(keys(cssDeclaration)));
    var base = baseline();
    return extend([$(window), base, {
        create: createScoped,
        fragment: function (frag) {
            return fragment(window, frag);
        },
        prefixes: prefixes,
        matches: matches(window),
        dispatch: dispatch(window),
        parentMany: parentMany(window),
        parent: parent(window),
        computed: computed,
        fromString: function (string) {
            return fromString(window, string);
        },
        stringify: function (options) {
            return stringify(extend([{
                prefixes: prefixes
            }, options]));
        }
    }]);
}