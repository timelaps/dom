module.exports = getAttribute;
var toNumber = require('@timelaps/to/number');
var isNan = require('@timelaps/is/nan');
var isNull = require('@timelaps/is/null');

function getAttribute(el, attribute) {
    return cautiousConvertValue(el.getAttribute(attribute));
}

function cautiousConvertValue(generated) {
    if (isNull(generated)) {
        return false;
    } else if (generated === '') {
        return true;
    } else if (!isNan((converted = toNumber(generated)))) {
        return converted;
    } else {
        return generated;
    }
}