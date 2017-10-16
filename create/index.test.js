var b = require('@timelaps/batterie');
var create = require('./');
var $ = require('../global');
var getAttribute = require('../attribute/get');
b.describe('create', function () {
    b.expect(create).toBeFunction();
    b.expect(create).toThrow();
    b.it('creates elements', function (t) {
        var $div = $.create('div');
        var div = document.createElement('div');
        t.expect($div.tagName).toBe(div.tagName);
    });
    b.it('creates elements with attributes', function (t) {
        var options = {
            'data-key': 'value'
        };
        var $div = $.create('div', options);
        var div = document.createElement('div', options);
        t.expect(getAttribute($div, 'data-key')).toBe('value');
        t.expect(getAttribute(div, 'data-key')).toBeNull();
    }, 2);
});