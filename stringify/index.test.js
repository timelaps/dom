var b = require('@timelaps/batterie');
var stringify = require('.');
b.describe('stringify', function () {
    b.expect(stringify).toBeFunction();
    var html = stringify({
        prefixes: {
            opacity: ['-blah-', '']
        }
    });
    b.it('stringifies dom-like structures', function (t) {
        t.expect(html({
            tagName: 'div'
        })).toBe('<div></div>');
    });
    b.describe('attributes', function () {
        b.it('can be passed as a nodelist type object', function (t) {
            t.expect(html({
                tagName: 'div',
                attributes: [{
                    name: 'id',
                    value: 'identifier1'
                }]
            })).toBe('<div id="identifier1"></div>');
        });
        b.it('can be passed as an object', function (t) {
            t.expect(html({
                tagName: 'div',
                attributes: {
                    id: 'identifier1',
                    'data-truthy': true
                }
            })).toBe('<div id="identifier1" data-truthy=""></div>');
        });
        b.it('will handle kebab casing', function (t) {
            t.expect(html({
                tagName: 'div',
                attributes: {
                    dataKey: 'key'
                }
            })).toBe('<div data-key="key"></div>');
        });
        b.it('will handle multiple attributes', function (t) {
            t.expect(html({
                tagName: 'div',
                attributes: {
                    class: 'one two three',
                    dataA: 'a',
                    'data-a': 'A'
                }
            })).toBe('<div class="one two three" data-a="A"></div>');
        });
        b.it('will handle objects inside of the attribute value', function (t) {
            t.expect(html({
                tagName: 'div',
                attributes: {
                    'class': {
                        one: true,
                        two: false,
                        three: true
                    }
                }
            })).toBe('<div class="one three"></div>');
        });
        b.it('will handle the style attribute differently', function (t) {
            t.expect(html({
                tagName: 'div',
                attributes: {
                    style: {
                        display: 'block',
                        position: 'relative',
                        top: 0,
                        left: 0,
                        opacity: 0.5
                    }
                }
            })).toBe('<div style="display: block; position: relative; top: 0px; left: 0px; -blah-opacity: 0.5; opacity: 0.5;"></div>');
        });
        b.it('will handle lists of elements', function (t) {
            t.expect(html([{
                tagName: 'div'
            }, {
                tagName: 'div'
            }])).toBe('<div></div><div></div>');
        });
    });
});