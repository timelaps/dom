var b = require('@timelaps/batterie');
var last = require('./');
var $ = require('../../global');
var append = require('../append');
b.describe('last', function () {
    b.expect(last).toBeFunction();
    var $div = $.create('div');
    var $p1 = $.create('div');
    var $p2 = $.create('div');
    b.expect(last($div)).toBeUndefined();
    append($div, $p1);
    b.expect(last($div)).toBe($p1);
    append($div, $p2);
    b.expect(last($div)).toBe($p2);
    append($div, $p1);
    b.expect(last($div)).toBe($p1);
});