var b = require('@timelaps/batterie');
var append = require('./');
var $ = require('../../global');
var lastChild = require('../last');
b.describe('child/append', function () {
    b.expect(append).toBeFunction();
    var $div = $.create('div');
    var p1 = $.create('div');
    var p2 = $.create('div');
    b.expect(lastChild($div)).toBeUndefined();
    b.expect(append($div, p1)).toBeTrue();
    b.expect(lastChild($div)).toBe(p1);
    b.expect(append($div, p2)).toBeTrue();
    b.expect(lastChild($div)).toBe(p2);
    b.expect(append($div, p2)).toBeFalse();
    b.expect(lastChild($div)).toBe(p2);
    b.expect(append($div, p1)).toBeTrue();
    b.expect(lastChild($div)).toBe(p1);
    b.expect(append($div, p1)).toBeFalse();
});