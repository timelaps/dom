var b = require('@timelaps/batterie');
var stringify = require('.');
b.describe('stringify', function () {
    b.expect(stringify).toBeFunction();
    b.it('stringifies dom-like structures', function (t) {
        var html = stringify();
        t.expect(stringify({
            tagName: 'div'
        })).toBe('<div></div>');
    });
});