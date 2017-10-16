var b = require('@timelaps/batterie');
var append = require('../append');
var first = require('./');
var $ = require('../../global');
b.describe('child/first', function () {
    b.expect(first).toBeFunction();
    var $div = $.create('div');
    var $p1 = $.create('div');
    b.expect(first($div)).toBeUndefined();
    append($div, $p1);
    b.expect(first($div)).toBe($p1);
});