var b = require('@timelaps/batterie');
var fragment = require('./');
var isFragment = require('../is/fragment');
var allChildren = require('../child/all');
var create = require('../create');
var creator = create(window);
b.describe('fragment', function () {
    b.expect(fragment).toBeFunction();
    b.expect(fragment).toThrow();
    b.it('creates a document fragment', function (t) {
        var frag = fragment(window);
        t.expect(isFragment(frag)).toBeTrue()
    });
    b.it('can create from a string', function (t) {
        var frag = fragment(window, '<div></div><span></span>');
        t.expect(isFragment(frag)).toBeTrue()
        t.expect(allChildren(frag).length).toBe(2);
    }, 2);
    b.it('can create from an element', function (t) {
        var div = creator('div');
        var frag = fragment(window, div);
        t.expect(isFragment(frag)).toBeTrue()
        t.expect(allChildren(frag).length).toBe(1);
    }, 2);
    b.it('can create from a list of elements', function (t) {
        var div1 = creator('div');
        var div2 = creator('div');
        var frag = fragment(window, [div1, div2]);
        t.expect(isFragment(frag)).toBeTrue()
        t.expect(allChildren(frag).length).toBe(2);
    }, 2);
});