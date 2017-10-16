var b = require('@timelaps/batterie');
var remove = require('../remove');
var append = require('../child/append');
var $ = require('../global');
var computed = require('./');
b.describe('computed', function () {
    b.expect(computed).toBeFunction();
    b.expect(computed).toReturnFunction();
    b.async('checks against the scoped window', function (t) {
        checkAgainst(window);
        var body = window.document.body;
        var iframe = $.create('iframe');
        append(body, iframe);
        setTimeout(function () {
            checkAgainst(iframe.contentWindow);
            remove(iframe);
            t.done();
        });

        function checkAgainst(window) {
            var scoped = computed(window);
            var $div = $.create('div', {
                style: {
                    paddingTop: 10
                }
            });
            var body = window.document.body;
            append(body, $div);
            t.expect(scoped($div).paddingTop).toBe('10px');
        }
    }, 2);
});