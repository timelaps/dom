var b = require('@timelaps/batterie');
var attribute = require('./');
var $ = require('../global');
b.describe('attribute', function (t) {
    b.expect(attribute).toBeFunction();
    var $div = $.create('div', {
        'data-check': 'now'
    });
    b.expect(attribute($div, 'data-check')).toBe('now');
    b.expect(attribute($div, 'data-check', 'then')).toBeTrue();
    b.expect(attribute($div, 'data-check')).toBe('then');
    b.expect(attribute($div, 'data-check', null)).toBeTrue();
    b.expect(attribute($div, 'data-check')).toBeNull();
});