var b = require('@timelaps/batterie');
var prepend = require('./');
var $ = require('../../global');
var first = require('../first');
b.describe('child/prepend', function () {
    b.expect(prepend).toBeFunction();
    var $div = $.create('div');
    var p1 = $.create('div');
    var p2 = $.create('div');
    b.expect(first($div)).toBeUndefined();
    prepend($div, p1);
    b.expect(first($div)).toBe(p1);
    prepend($div, p2);
    b.expect(first($div)).toBe(p2);
    prepend($div, p2);
    b.expect(first($div)).toBe(p2);
    prepend($div, p1);
    b.expect(first($div)).toBe(p1);
});