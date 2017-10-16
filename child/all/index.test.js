var b = require('@timelaps/batterie');
var allChildren = require('./');
var $ = require('../../global');
b.describe('allChildren', function () {
    b.expect(allChildren).toBeFunction();
    b.expect(allChildren).toReturnEmptyArray();
    var l00 = $.create('div');
    var l10 = $.create('div');
    var l11 = $.create('div');
    var l12 = $.create('div');
    var l20 = $.create('div');
    var l21 = $.create('div');
    var l22 = $.create('div');
    l00.appendChild(l10);
    l00.appendChild(l11);
    l00.appendChild(l12);
    l11.appendChild(l20);
    l11.appendChild(l21);
    l11.appendChild(l22);
    b.it('gets all child nodes as an array', function (t) {
        t.expect(allChildren(l00)).toEqual([
            l10, l11, l12
        ]);
        t.expect(allChildren(l10)).toEqual([]);
        t.expect(allChildren(l11)).toEqual([
            l20, l21, l22
        ]);
    }, 3);
});