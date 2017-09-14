module.exports = html;

function html(el, string) {
    var changing = el.innerHTML !== string;
    if (changing) {
        el.innerHTML = string;
    }
    return changing;
}
