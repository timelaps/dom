var b = require('@timelaps/batterie');
var $ = require('./');
b.describe('$', function () {
    b.expect($).toBeFunction();
    b.expect(function () {
        return $(window);
    }).toReturnFunction();
    b.describe('scopes queries against that window', function () {
        var query = $(window);
        b.it('finds supported selectors', function (t) {
            var div = window.document.createElement('div');
            var body = window.document.body;
            t.expect(query('div').length).toBe(0);
            body.appendChild(div);
            t.expect(query('div').length).toBe(1);
            body.removeChild(div);
        }, 2);
        b.async('does not reach into other windows', function (t) {
            var iframe = window.document.createElement('iframe');
            var body = window.document.body;
            body.appendChild(iframe);
            var iframedoc = iframe.contentWindow.document;
            iframedoc.open();
            iframedoc.write('<div id="here"></div>');
            iframedoc.close();
            var query = $(window);
            t.expect(query('#here').length).toBe(0);
            setTimeout(function () {
                t.expect(query('#here').length).toBe(0);
                var scopedQuery = $(iframe.contentWindow);
                t.expect(scopedQuery('#here').length).toBe(1);
                body.removeChild(iframe);
                t.success();
            });
        }, 3);
    // b.it('has css4 capabilities', function (t) {
    //     var document = window.document;
    //     var div1 = document.createElement('div');
    //     var span = document.createElement('span');
    //     div1.appendChild(span);
    //     var div2 = document.createElement('div');
    //     var body = document.body;
    //     body.appendChild(div1);
    //     body.appendChild(div2);
    //     var query = $(window);
    //     t.expect(query('div:has(span)').length).toBe(1);
    // });
    });
});