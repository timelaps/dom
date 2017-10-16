var setAttribute = require('./');
var b = require('@timelaps/batterie');
var getAttribute = require('../get');
var $ = require('../../global');
b.describe('removeAttribute', function () {
    b.it('removes attributes', function (t) {
        var $div = $.create('div', {
            'data-check': true
        });
        t.expect(getAttribute($div, 'data-check')).toBeEmptyString();
        setAttribute($div, 'data-check', 'what');
        t.expect(getAttribute($div, 'data-check')).toBe('what');
    }, 2);
    b.it('returns true when the attribute mutates', function (t) {
        var $div = $.create('div', {
            'data-check': true
        });
        t.expect(setAttribute($div, 'data-check', 'what')).toBeTrue();
        t.expect(getAttribute($div, 'data-check')).toBe('what');
    }, 2);
    b.it('returns false when it fails to mutate the attribute', function (t) {
        var $div = $.create('div', {
            'data-check': 'what'
        });
        t.expect(setAttribute($div, 'data-check', 'what')).toBeFalse();
    });
});