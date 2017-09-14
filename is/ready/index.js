module.exports = isReady;
var validReadyStates = {
    complete: true,
    interactive: true
};

function isReady(document) {
    return validReadyStates[document.readyState];
}