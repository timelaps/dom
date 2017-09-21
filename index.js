module.exports = baseline();
var cloneJSON = require('@timelaps/json/clone');
var assign = require('@timelaps/object/assign');
var $ = require('./$');
var create = require('./create');
var matches = require('./matches');
var fromString = require('./to');
var dispatch = require('./dispatch');
var parentMany = require('./parent/many');
var parent = require('./parent');
var attribute = require('./attribute');
var child = require('./child');
var connected = require('./connected');
var events = require('./events');
var insert = require('./insert');
var is = require('./is');
var root = require('./root');
var sibling = require('./sibling');
var stringify = require('./stringify');
var tagName = require('./tag/name');

function baseline() {
    var baseChild = assign({}, child);
    var baseEvents = cloneJSON(events);
    var baseInsert = assign({}, insert);
    var baseIs = assign({}, is);
    var baseSibling = assign({}, sibling);
    return {
        attribute: attribute,
        child: baseChild,
        connected: connected,
        events: baseEvents,
        scope: scope,
        insert: baseInsert,
        is: baseIs,
        parent: parent,
        root: root,
        rootMany: rootMany,
        sibling: baseSibling,
        stringify: stringify,
        tagName: tagName
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
    var prefixes = getComputed(createScoped.element('div'), window);
    return assign(baseline(), {
        $: $(window),
        create: createScoped,
        prefixes: prefixes,
        matches: matches(window),
        fromString: fromString(window),
        dispatch: dispatch(window),
        parentMany: parentMany(window),
        parent: parent(window),
        computed: computed(window),
        stringify: function (options) {
            return stringify(assign({
                prefixes: prefixes
            }, options));
        }
    });
}