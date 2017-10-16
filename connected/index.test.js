var b = require('@timelaps/batterie');
var $ = require('../global');
var append = require('../child/append');
var connected = require('./');
b.describe('connected', function () {
    b.expect(connected).toBeFunction();
    b.it('returns false by default', function (t) {
        t.expect(connected()).toBeFalse();
    });
    b.it('returns false when an element is in memory', function (t) {
        var $div = $.create('div');
        t.expect(connected($div)).toBeFalse();
    });
    b.it('returns false when element is appended to a node in memory', function (t) {
        var $div1 = $.create('div');
        var $div2 = $.create('div');
        var $div3 = $.create('div');
        append($div1, $div2);
        append($div2, $div3);
        t.expect(connected($div3)).toBeFalse();
    });
    b.it('returns true when an element is in dom', function (t) {
        var $div = $.create('div');
        append(document.body, $div);
        t.expect(connected($div)).toBeTrue();
    });
});