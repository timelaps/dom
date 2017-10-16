var removeAttribute = require('./');
var b = require('@timelaps/batterie');
var getAttribute = require('../get');
var $ = require('../../global');
b.describe('removeAttribute', function () {
    b.it('removes attributes', function (t) {
        var $div = $.create('div', {
            'data-check': true
        });
        t.expect(getAttribute($div, 'data-check')).toBeEmptyString();
        removeAttribute($div, 'data-check');
        t.expect(getAttribute($div, 'data-check')).toBeNull();
    }, 2);
    b.it('returns true when the attribute changes', function (t) {
        var $div = $.create('div', {
            'data-check': 'here'
        });
        t.expect(getAttribute($div, 'data-check')).toBe('here');
        t.expect(removeAttribute($div, 'data-check')).toBeTrue();
        t.expect(getAttribute($div, 'data-check')).toBeNull();
    }, 3);
    b.it('returns false when it fails to change the attribute', function (t) {
        var $div = $.create('div', {
            'data-check': null
        });
        removeAttribute($div, 'data-check');
        t.expect(removeAttribute($div, 'data-check')).toBeFalse();
    });
});