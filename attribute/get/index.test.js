var b = require('@timelaps/batterie');
var getAttribute = require('./');
var $ = require('../../global');
b.describe('getAttribute', function () {
    b.it('retrieves attributes off of elements', function (t) {
        var $div = $.create('div', {
            'data-text': 'string'
        });
        t.expect(getAttribute($div, 'data-text')).toBe('string');
    });
    b.it('does not retrieve props', function (t) {
        var $input = $.create('input', {
            type: 'text',
            value: 'there'
        });
        $input.value = 'here';
        t.expect(getAttribute($input, 'value')).toBe('there');
    });
});