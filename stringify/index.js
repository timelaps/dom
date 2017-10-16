module.exports = HTML;
var reduce = require('@timelaps/array/reduce');
var objectReduce = require('@timelaps/object/reduce');
var kebabCase = require('@timelaps/string/case/kebab');
var toArray = require('@timelaps/to/array');
var HTMLConstantsArray = require('../tag/empty');
var assign = require('@timelaps/object/assign');
var isUndefined = require('@timelaps/is/undefined');
var merge = require('@timelaps/object/merge');
var isString = require('@timelaps/is/string');
var isObject = require('@timelaps/is/object');
var isArrayLike = require('@timelaps/is/array-like');
var isArray = require('@timelaps/is/array');
var throws = require('@timelaps/fn/throws');
var returns = require('@timelaps/returns');
var stringify = require('@timelaps/io/stringify');
var isNan = require('@timelaps/is/nan');
var returnsSecond = require('@timelaps/returns/second');
var isFalse = require('@timelaps/is/false');
var isTrue = require('@timelaps/is/true');
var isNil = require('@timelaps/is/nil');
var HTMLStyleCustomAttribute = require('@timelaps/css/group/many');
var HTMLConstantsObject = reduce(HTMLConstantsArray, function (memo, key) {
    memo[key] = true;
    return memo;
}, {});

function HTML(options) {
    var addTextCssAttribute = basicAttributeCondensation('type', 'text/css'),
        basicStyleAttributes = basicAttributeCondensation('rel', 'stylesheet', addTextCssAttribute),
        attributesBase = {
            link: basicStyleAttributes,
            style: basicStyleAttributes,
            script: basicAttributeCondensation('type', 'text/javascript'),
            button: basicAttributeCondensation('type', 'submit'),
            input: basicAttributeCondensation('type', 'input'),
            form: basicAttributeCondensation('method', 'get')
        };
    return assign(html, merge({
        empty: assign({}, HTMLConstantsObject),
        base: {
            attributes: attributesBase
        },
        access: {
            tagName: HTMLDefaultTagName,
            attributes: HTMLDefaultAttributes,
            children: HTMLDefaultChildren
        },
        stringify: {
            attributes: HTMLStringifyAttributes,
            attribute: HTMLStringifyAttribute,
            attributeName: kebabCase,
            attributeValue: HTMLStringifyAttributeValue,
            attributeRemove: HTMLStringifyAttributeRemove,
            node: HTMLStringifyNode,
            children: HTMLStringifyChildren,
            nodeList: HTMLStringifyAttributeMaker(reduce, returnsSecond),
            attributeHash: HTMLStringifyAttributeMaker(objectReduce, function (key, value) {
                return {
                    name: key,
                    value: value
                };
            }),
            attributeCustom: {
                style: HTMLStyleCustomAttribute
            }
        },
        validate: {
            node: HTMLValidateNode,
            children: HTMLValidateChildren,
            parent: HTMLValidateParent
        },
        open: {
            defaults: returns('<'),
            html: returns('<!DOCTYPE html><')
        },
        tag: {
            empty: HTMLTagEmpty,
            content: HTMLTagContent
        }
    }, options, true));

    function html(structure) {
        var stringify = html.stringify;
        if (html.validate.children(structure)) {
            return stringify.children(structure);
        } else {
            return stringify.node(structure);
        }
    }

    function HTMLStringifyNode(child) {
        var validate = html.validate;
        if (!validate.node(child)) {
            // reject... usually child is a string
            // so it doesn't need to be stringified
            return child;
        }
        var access = html.access;
        // must be string
        var tagName = access.tagName(child);
        var attrs = access.attributes(tagName, child);
        var isParent = validate.parent(tagName, attrs, child);
        var tag = html.tag;
        if (!isParent) {
            return tag.empty(tagName, attrs);
        }
        var children = access.children(tagName, attrs, child);
        return tag.content(tagName, attrs, children);
    }

    function HTMLStringifyChildren(children) {
        var node = html.stringify.node;
        return reduce(children, function (memo, child) {
            return memo + node(child);
        }, '');
    }

    function HTMLTagEmpty(tagName, attributes) {
        return HTMLOpenTag(tagName, attributes) + '/>';
    }

    function HTMLTagContent(tagName, attributes, children) {
        return HTMLOpenTag(tagName, attributes) + '>' + HTMLStringifyChildren(children) + '</' + tagName + '>';
    }

    function HTMLValidateParent(tagName) {
        return !html.empty[tagName];
    }

    function HTMLDefaultTagName(child) {
        return child.tagName;
    }

    function HTMLDefaultAttributes(tagName, child) {
        return child.attributes;
    }

    function HTMLDefaultChildren(tagName, attributes, child) {
        return child.children || child.childNodes;
    }

    function HTMLStringifyAttribute(attrs, attr_, value_, known) {
        var attr = attr_;
        var value = value_;
        var stringify = html.stringify;
        if (attr && (value || value === '')) {
            attr = stringify.attributeName(attr);
            if (isUndefined(index = known[attr])) {
                // new attr
                index = known[attr] = attrs.length;
                attrs.push('');
            }
            // otherwise it's an update
            if (stringify.attributeRemove(attr, value)) {
                delete known[attr];
                attrs.splice(index, 1);
            } else {
                value = stringify.attributeValue(attr, value);
                attrs[index] = ' ' + attr + '="' + value + '"';
            }
        }
        return attrs;
    }

    function HTMLStringifyAttributeValue(attr, value) {
        if (isObject(value)) {
            return HTMLStringifyAttributeObject(attr, value, ' ');
        } else {
            return HTMLStringifyAttributeString(value);
        }
    }

    function HTMLStringifyAttributeRemove(attr, value) {
        return isNil(value) || isNan(value) || isFalse(value);
    }

    function HTMLStringifyAttributeObject(key, object, delimiter) {
        var reducer;
        if (isArray(object)) {
            return object.join(delimiter);
        } else {
            reducer = html.stringify.attributeCustom[key];
            reducer = reducer ? reducer(object, options) : object;
            return isArray(reducer) ? reducer.join(' ') : objectReduce(reducer, defaultReducer, '');
        }

        function defaultReducer(memo, value, key) {
            if (value) {
                if (memo) {
                    return memo + delimiter + key;
                } else {
                    return key;
                }
            } else {
                return memo;
            }
        }
    }

    function HTMLStringifyAttributeString(value) {
        return isTrue(value) ? '' : (isString(value) ? value : stringify(value));
    }

    function HTMLStringifyAttributes(attrs, known) {
        var attrsAreArray = isArrayLike(attrs);
        var stringify = html.stringify;
        var method = attrsAreArray ? stringify.nodeList : stringify.attributeHash;
        return method(attrs, known);
    }

    function HTMLStringifyAttributeMaker(reducer, expander) {
        return function (attrs, known) {
            var stringifyAttribute = html.stringify.attribute;
            return reducer(attrs, function (memo, value, key) {
                var attr = expander(key, value);
                return stringifyAttribute(memo, attr.name, attr.value, known);
            }, []).join('');
        };
    }

    function HTMLValidateChildren(children) {
        return isArrayLike(children);
    }

    function HTMLValidateNode(node) {
        return node.tagName;
    }

    function HTMLOpenTag(tag, attrs_) {
        var base = html.base,
            attributesBase = base.attributes,
            tagAttributesBase = attributesBase[tag],
            stringify = html.stringify,
            attrs = tagAttributesBase ? tagAttributesBase(attrs_) : attrs_,
            open = html.open,
            opener = open[tag] || open.defaults;
        return opener(attrs) + tag + stringify.attributes(attrs, {});
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

    function HTMLTagBuild(tag_, attrs_, content) {
        var html = html,
            parsed = parseSelector(tag_),
            tag = parsed.tag,
            attrs = merge(parsed.attrs, attrs_, true),
            special = html.special,
            specialFn = specialTag[tag];
        return specialFn ? specialFn(attrs, content) : (html.tagsEmpty[tag] ? html.tagEmpty(tag, attrs) : html.tagContent(tag, attrs, content));
    }

    function HTMLBuild(template) {
        var html = html;
        var access = html.access;
        return isString(template) ? template : reduce(template, function (memo, child) {
            // can be used recurisvely
            return memo + html.tagBuild(child);
        }, '');
    }

    function stylesheet(attrs, content) {
        return attrs.href ? html.tagEmpty('link', attrs) : html.tagContent('style', attrs, content);
    }
}