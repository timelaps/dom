module.exports = diff;
// cannot start with a text node
function createDiffer(context) {
    var hash, updating, swaps;

    function resolveLater(key) {
        return isString(key) ? function () {
            return hash[key];
        } : returns(key);
    }

    function swapNodes(h) {
        var $remove, add = h.add(),
            remove = h.remove();
        if (add && remove) {
            $remove = context.returnsManager(remove);
            $remove.insertBefore(add);
            $remove.remove();
        } else if (remove) {
            context.$(remove).remove();
        } else {
            context.returnsManager(h.parent).insertAfter(add, h.index);
        }
    }
    return {
        context: context,
        swaps: (swaps = []),
        keys: (hash = {}),
        updating: (updating = []),
        queue: {
            add: function (node, index, parent) {
                return this.swap(NULL, node, index, parent);
            },
            remove: function (node, parent) {
                return this.swap(node, NULL, NULL, parent);
            },
            html: function (node, content) {},
            swap: function (first, last, index, parent) {
                swaps.push({
                    parent: parent,
                    index: index,
                    remove: resolveLater(first),
                    add: resolveLater(last)
                });
            },
            update: function (node, updates, fn) {
                updating.push({
                    node: node,
                    updates: updates,
                    fn: fn
                });
            }
        },
        mutate: {
            swap: function () {
                forEach(swaps, swapNodes);
            },
            update: function () {
                // attributes and content
                forEach(updating, function (item) {
                    item.fn(item.node, item.updates);
                });
            },
        }
    };
}

function diff(_a, _b, _hash, _stopper, context) {
    var returns, mutate, removing, updating, inserting, resultant, current, identifyingKey, identified,
        a = _a,
        b = cloneJSON(_b),
        layer_level = 0,
        // check kids
        stopper = _stopper || returnsTrue,
        diffs = createDiffer(context),
        keysHash = diffs.keys;
    updateElement(a, b);
    return diffs;

    function updateNode(a, hash) {
        var manager, props, attrs = hash.attrs,
            style = hash.style;
        forOwn(attrs, function (value, key) {
            if (!propsHash[key]) {
                return;
            }
            delete attrs[key];
            props = props || {};
            props[key] = value;
        });
        if (checkNeedForCustom(a)) {
            manager = context.returnsManager(a);
            if (keys(attrs)[LENGTH]) {
                manager.attr(attrs);
            }
            if (props) {
                manager.prop(props);
            }
            if (style) {
                manager.css(style);
            }
        } else {
            forOwn(attrs, function (value, key) {
                attributeApi.write(a, kebabCase(key), value);
            });
            forOwn(props, function (value, key) {
                propertyApi.write(a, kebabCase(key), value);
            });
            if (style) {
                applyStyle(a, style);
            }
        }
    }

    function arrayLikeMax(aLength, bLength) {
        return {
            length: Math.max(aLength, bLength)
        };
    }

    function diffNodeProperties(a, bAttrs, props, style_) {
        var style, aStyle, styl, stylKeys, styleIterator, aAttributes = a.attributes,
            aLength = aAttributes[LENGTH],
            bKeys = keys(bAttrs),
            bLength = bKeys[LENGTH],
            attrs = reduce(arrayLikeMax(aLength, bLength), //
                function (memo, voided, index) {
                    var key;
                    if (memo.aLength > index) {
                        collectAttr(memo, aAttributes[index]);
                    }
                    if (memo.bLength > index) {
                        key = bKeys[index];
                        collectAttr(memo, {
                            localName: kebabCase(key),
                            value: bAttrs[key]
                        }, BOOLEAN_TRUE);
                    }
                }, {
                    list: [],
                    hash: {},
                    attrsA: {},
                    accessA: {},
                    attrsB: {},
                    accessB: {},
                    aLength: aLength,
                    bLength: bLength
                }),
            anElId = a[__ELID__],
            updates,
            accessA = attrs.accessA,
            accessB = attrs.accessB;
        // diffs styles
        if (attrs.attrsA[STYLE]) {
            aStyle = a[STYLE];
            styl = style_ || {};
            stylKeys = keys(styl);
            styleIterator = arrayLikeMax(a.style[LENGTH], stylKeys[LENGTH]);
            style = reduce(styleIterator, function (style, key) {
                var valueA = aStyle[key];
                var valueB = styl[key];
                if (isUndefined(valueB)) {
                    style[key] = '';
                } else if (!isStrictlyEqual(valueA, (converted = convertStyleValue(key, valueB)))) {
                    style[key] = converted;
                }
            }, {});
        } else {
            style = style_;
        }
        forEach(attrs.list, function (key) {
            if (cantDiffAttrs[key]) {
                return;
            }
            var accessAValue = accessA[key];
            var accessBValue = accessB[key];
            if (accessAValue !== accessBValue) {
                if (accessAValue === UNDEFINED && accessBValue === BOOLEAN_FALSE) {
                    return;
                }
                updates = updates || {};
                updates[key] = accessBValue === UNDEFINED ? NULL : accessBValue;
            }
        });
        if (updates) {
            diffs.queue.update(a, {
                attrs: updates,
                style: style,
                props: props
            }, updateNode);
        }
    }

    function accessStyle(virtual) {
        return (virtual[1] || {}).style;
    }

    function accessChildren(virtual) {
        return (virtual && virtual[2]);
    }

    function resolveIncompatability(node, virtual) {
        var t, key = accessKey(virtual),
            registered = keysHash[key];
        //     t = tag(node),
        //     tg = accessTag(virtual);
        // if (!t) {
        //     // check this later
        //     // probably text
        //     if (tg === 'text') {
        //         return {
        //             node: node
        //         };
        //     }
        // }
        // if (t && t === tagName(virtual)) {
        //     // the node did not move and
        //     // did not change it's tag name
        //     return {
        //         node: registered || node
        //     };
        // }
        if ((t = tag(node)) && t === tagName(virtual)) {
            // the node did not move and
            // did not change it's tag name
            return {
                node: registered || node
            };
        }
        var frag = context.createDocumentFragment();
        var newEl = createFromVirtual(virtual, frag, keysHash);
        return {
            node: newEl,
            frag: frag
        };
    }

    function buildAttrs(virtual) {
        return merge(parseSelector(accessTag(virtual)).attrs, accessAttrs(virtual));
    }

    function fillVirtual(virtual) {
        if (!virtual) {
            return false;
        }
        var first = accessTag(virtual);
        if (!first) {
            return virtual;
        }
        var attrs = accessMeta(virtual);
        var children = accessChildren(virtual);
        return (isString(attrs) || isArray(attrs)) ? [first, NULL, rewrapChildren(attrs)] : [first, attrs, rewrapChildren(children)];
    }

    function accessProps(virtual) {
        return accessMeta(virtual).props;
    }

    function updateElement(_node, _virtual) {
        var virtual = fillVirtual(_virtual);
        var hash = resolveIncompatability(_node, virtual);
        var frag = hash.frag;
        var node = hash.node;
        diffChildren(node, virtual);
        diffNodeProperties(node, buildAttrs(virtual), accessProps(virtual), accessStyle(virtual));
        setKey(node, virtual);
        // should anything take it's place
        return frag || node;
        // assume that you have a json object
        // and you have a node
    }

    function createStringSet(a, b) {
        if (checkNeedForCustom(a)) {
            context.returnsManager(a).html(b);
        } else {
            a.innerHTML = b;
        }
    }

    function computeStringDifference(a, bChildren) {
        if (notNaN(bChildren) && canDiffAccepts[type(bChildren)]) {
            if (a.innerHTML != bChildren) {
                diffs.queue.update(a, bChildren, createStringSet);
            }
            return BOOLEAN_TRUE;
        }
    }

    function setKey(node, virtual) {
        var key;
        if ((key = accessKey(virtual))) {
            if (keysHash[key]) {
                if (keysHash[key] !== node) {
                    return console.log('problem diffing');
                }
            }
            keysHash[key] = node;
        }
    }

    function rewrapChildren(_children) {
        var first, children = _children;
        // take care of children, null, false, and string case
        // where the children are simply going to be overwritten
        if (!children || isString(children)) {
            return children;
        }
        if (isArray(children) && (first = children[0]) && isString(first)) {
            children = [children];
        }
        return children;
    }

    function diffChildren(_a, _b) {
        var a = _a;
        var b = _b || [];
        var aChildren = toArray(a.childNodes || []);
        var bChildren = b[2] = rewrapChildren(b[2]);
        // var mutate = diffs.mutate;
        // var keys = diffs.keys;
        // it was a string, so there's nothing more
        // to compute in regards to children
        // strings just wipe out the previous els
        if ((!bChildren && bChildren !== EMPTY_STRING) || !stopper(b) || computeStringDifference(a, bChildren)) {
            return;
        }
        var bChildrenLength = bChildren[LENGTH];
        var aChildrenLength = aChildren[LENGTH];
        var maxLength = Math.max(aChildrenLength, bChildrenLength);
        var fragment, aChild, virtual, infos, originalChild, j, finished, bChild, removing, result, dontCreate, offset = 0,
            i = 0,
            focus = 0,
            key = accessKey(b);
        // do nothing (false, null, NUMBER, or stopper failed)
        if (!bChildrenLength) {
            return diffs.queue.remove(aChildren, a);
        }
        if (!aChildrenLength) {
            infos = insertMapper(bChildren.slice(0), a, 0);
            return diffs.queue.add(infos.el, infos.index, infos.parent);
        }
        for (; i < maxLength; i++) {
            originalChild = aChildren[i];
            virtual = bChildren[i];
            if (virtual) {
                if (originalChild) {
                    aChild = updateElement(originalChild, virtual, a);
                    // setKey(firstChild(aChild), virtual);
                } else {
                    aChild = context.createDocumentFragment();
                    setKey(createFromVirtual(virtual, aChild, keysHash), virtual);
                }
                if (aChild !== originalChild) {
                    diffs.queue.swap(originalChild, aChild, i, a);
                }
            } else {
                diffs.queue.remove(aChildren.slice(i), a);
                i = maxLength;
                // aChild = context.createDocumentFragment();
                // setKey(createFromVirtual(virtual, aChild, keysHash), virtual);
            }
        }
    }

    function updateFromVirtual(node, children, parent) {
        var results;
        if (isString(children)) {
            node.innerHTML = children;
        } else {
            forEach(children, function (child) {
                appendChild(node, createFromVirtual(child, node));
            });
        }
        if (parent) {
            parent.appendChild(node);
        }
        return node;
    }

    function accessTag(virtual) {
        return virtual && virtual[0];
    }

    function accessMeta(virtual) {
        return virtual && virtual[1] || {};
    }

    function accessAttrs(virtual) {
        return accessMeta(virtual).attrs;
    }

    function accessKey(virtual) {
        return (virtual && virtual[1] || {}).key;
    }

    function tagName(virtual) {
        return parseSelector(accessTag(virtual)).tag;
    }

    function createFromVirtual(_virtual, parent) {
        var key, data, created,
            virtual = fillVirtual(_virtual);
        if (virtual[0] === 'text') {
            parent.innerHTML = virtual[2];
            return;
        }
        // var parsed = parseSelector(virtual[0]);
        created = context.createElement(virtual[0], buildAttrs(virtual)).element();
        setKey(created, virtual);
        return updateFromVirtual(created, virtual[2], parent);
    }

    function insertMapper(els, parent, i) {
        var frag = doc.createDocumentFragment();
        forEach(els, function (el) {
            createFromVirtual(el, frag, keysHash);
        });
        return {
            parent: parent,
            el: frag,
            index: i
        };
    }
}