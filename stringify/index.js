module.exports = HTML;
var reduce = require('@timelaps/array/reduce');
var kebabCase = require('@timelaps/string/case/kebab');
var HTMLConstantsArray = toArray('area,base,br,col,colgroup,command,embed,hr,img,input,keygen,link,meta,param,source,track,wbr');
var assign = require('@timelaps/object/assign');
var mergeDeep = require('@timelaps/object/merge/deep');
var isString = require('@timelaps/is/string');
var isArray = require('@timelaps/is/array');
var HTMLConstantsObject = reduce(HTMLConstantsArray, function (memo, key) {
    memo[key] = true;
    return memo;
}, {});

function HTMLDefaultTagName(child) {
    return child.tagName;
}

function HTMLDefaultAttributes(tagName, child) {
    return child.attributes;
}

function HTMLDefaultChildren(tagName, attributes, child) {
    return child.children;
}

function HTMLStringifyAttribute(attr, value) {
    return (value || value === '') ? (' ' + attr + '="' + value + '"') : '';
}

function HTMLStringifyAttributes(attrs) {
    return reduce(attrs, function (memo, value, key) {
        return memo + html.attribute(kebabCase(key), value);
    }, '');
}

function HTMLValidateChildren(children) {
    return isArray(children);
}

function HTMLValidateNode(node) {
    return node.tagName;
}

function HTMLStringifyChildren(children) {
    //
}

function HTMLOpenTag(tag, attrs_) {
    var base, prefixer, html = this,
        attrs = (base = html.attributesBase[tag]) ? base(attrs_) : attrs_,
        tagOpenPrefixes = html.tagOpenPrefixes;
    return (tagOpenPrefixes[tag] || tagOpenPrefixes.defaults)(attrs) + tag + html.attributes(attrs);
}

function basicAttributeCondensation(key, value, next) {
    var nxt = next || returns.first;
    return function (attrs_) {
        var attrs = attrs_ || {};
        if (!attrs[key]) {
            attrs[key] = value;
        }
        return nxt(attrs);
    };
}

function HTMLTagEmpty(tag, attrs) {
    return this.tagOpen(tag, attrs) + '/>';
}

function HTMLTagContent(tag, attrs, content) {
    return this.tagOpen(tag, attrs) + '>' + content + '</' + tag + '>';
}

function HTMLTagBuild(tag_, attrs_, content) {
    var html = this,
        parsed = parseSelector(tag_),
        tag = parsed.tag,
        attrs = merge(parsed.attrs, attrs_),
        special = html.tagSpecial[tag];
    return special ? special(attrs, content) : (html.tagsEmpty[tag] ? html.tagEmpty(tag, attrs) : html.tagContent(tag, attrs, content));
}

function HTMLBuild(template) {
    var html = this;
    var access = html.access;
    return isString(template) ? template : reduce(template, function (memo, child) {
        // can be used recurisvely
        return memo + html.tagBuild(child);
    }, '');
}

function tagBuild(child) {
    // must be string
    var html = this;
    var access = html.access;
    var tagName = access.tagName(child);
    var attrs = access.attributes(tagName, child);
    var children = access.children(tagName, attrs, child);
    //
}

function stylesheet(attrs, content) {
    return attrs.href ? html.tagEmpty('link', attrs) : html.tagContent('style', attrs, content);
}
// addTextCssAttribute = basicAttributeCondensation('type', 'text/css'),
//     basicStyleAttributes = basicAttributeCondensation('rel', 'stylesheet', addTextCssAttribute),
//     attributesBase = {
//         link: basicStyleAttributes,
//         style: basicStyleAttributes,
//         script: basicAttributeCondensation('type', 'text/javascript'),
//         button: basicAttributeCondensation('type', 'submit'),
//         input: basicAttributeCondensation('type', 'input'),
//         form: basicAttributeCondensation('method', 'get')
//     },
//     tagOpenPrefixes = {
//         defaults: returns('<'),
//         html: returns('<!DOCTYPE html><')
//     },
function HTML(options) {
    var access = {
            tagName: HTMLDefaultTagName,
            attributes: HTMLDefaultAttributes,
            children: HTMLDefaultChildren
        },
        stringify = {
            attributes: HTMLStringifyAttributes,
            attribute: HTMLStringifyAttribute
        },
        validate = {
            node: HTMLValidateNode,
            children: HTMLValidateChildren
        };
    return assign(starter, mergeDeep({
        access: access,
        stringify: stringify,
        validate: validate
    }, options));

    function starter(structure) {
        var validate = starter.validate;
        var stringify = starter.stringify;
        if (validate.node(structure)) {
            return stringify.node(structure);
        } else if (validate.children(structure)) {
            return stringify.children(structure);
        }
    }
}