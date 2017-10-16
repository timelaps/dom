var b = require('@timelaps/batterie');
var append = require('../child/append');
var remove = require('./');
var $ = require('../global');
b.describe('remove', function () {
    b.expect(remove).toBeFunction();
    var $div = $.create('div');
    var $p1 = $.create('div');
    b.expect(remove($p1)).toBeNull();
    append($div, $p1);
    b.expect($p1.parentNode).toBe($div);
    b.expect(remove($p1)).toBe($p1);
    b.expect($p1.parentNode).toBeNull();
});