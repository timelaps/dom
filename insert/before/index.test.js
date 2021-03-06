var b = require('@timelaps/batterie');
var insertBefore = require('./');
var $ = require('../../global');
b.describe('insert/before', function () {
    b.expect(insertBefore).toBeFunction();
    b.expect(insertBefore).toReturnBoolean();
    var counter = 0;
    b.it('inserts an element before a given element', function (t) {
        var parent = uniqueDiv();
        var child1 = uniqueDiv();
        var child3 = uniqueDiv();
        var child2 = uniqueDiv();
        $.child.append(parent, child1);
        $.child.append(parent, child3);
        t.expect(insertBefore(parent, child2, child3)).toBeTrue();
        t.expect($.children(parent)).toEqual([child1, child2, child3]);
    }, 2);
    b.it('prepends when the given element is nil', function (t) {
        var parent = uniqueDiv();
        var child1 = uniqueDiv();
        var child2 = uniqueDiv();
        var child3 = uniqueDiv();
        $.child.append(parent, child1);
        $.child.append(parent, child3);
        t.expect(insertBefore(parent, child2, null)).toBeTrue();
        t.expect($.children(parent)).toEqual([child2, child1, child3]);
    }, 2);
    b.it('still prepends if a parent is still given when the child is not actually a child', function (t) {
        var parent = uniqueDiv();
        var child1 = uniqueDiv();
        var child2 = uniqueDiv();
        var child3 = uniqueDiv();
        $.child.append(parent, child3);
        t.expect(insertBefore(parent, child2, child1)).toBeTrue();
        t.expect($.children(parent)).toEqual([child2, child3]);
    }, 2);
    b.it('cannot append if the parent and child are not given', function (t) {
        var parent = uniqueDiv();
        var child1 = uniqueDiv();
        var child2 = uniqueDiv();
        var child3 = uniqueDiv();
        $.child.append(parent, child3);
        t.expect(insertBefore(null, child2, child1)).toBeFalse();
        t.expect($.children(parent)).toEqual([child3]);
    }, 2);
    b.it('still prepends if the parent is not given but the child has a parent', function (t) {
        var parent = uniqueDiv();
        var child1 = uniqueDiv();
        var child2 = uniqueDiv();
        var child3 = uniqueDiv();
        $.child.append(parent, child1);
        $.child.append(parent, child3);
        t.expect(insertBefore(null, child2, child1)).toBeTrue();
        t.expect($.children(parent)).toEqual([child1, child2, child3]);
    }, 2);
    b.it('inserts when an index is given', function (t) {
        var parent = uniqueDiv();
        var child1 = uniqueDiv();
        var child2 = uniqueDiv();
        var child3 = uniqueDiv();
        $.child.append(parent, child1);
        $.child.append(parent, child3);
        t.expect(insertBefore(parent, child2, 1)).toBeTrue();
        t.expect($.children(parent)).toEqual([child1, child2, child3]);
    }, 2);
    b.it('does not insert when an index is given even if the parent is not', function (t) {
        var parent = uniqueDiv();
        var child1 = uniqueDiv();
        var child2 = uniqueDiv();
        var child3 = uniqueDiv();
        $.child.append(parent, child1);
        $.child.append(parent, child3);
        t.expect(insertBefore(null, child2, 0)).toBeFalse();
        t.expect($.children(parent)).toEqual([child1, child3]);
    }, 2);
    b.it('does not insert if the child is the same as the target', function (t) {
        var parent = uniqueDiv();
        var child1 = uniqueDiv();
        $.child.append(parent, child1);
        t.expect(insertBefore(parent, child1, child1)).toBeFalse();
    });
    b.it('does not insert if the child is the previous child in the children array', function (t) {
        var parent = uniqueDiv();
        var child1 = uniqueDiv();
        var child2 = uniqueDiv();
        $.child.append(parent, child1);
        $.child.append(parent, child2);
        t.expect(insertBefore(parent, child1, child2)).toBeFalse();
    });

    function uniqueDiv() {
        return $.create('div', {
            id: ((++counter) + '')
        });
    }
});