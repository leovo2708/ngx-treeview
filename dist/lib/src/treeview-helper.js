import * as _ from 'lodash';
export var TreeviewHelper = {
    findItem: findItem,
    findItemInList: findItemInList,
    findParent: findParent,
    removeItem: removeItem
};
function findItem(root, value) {
    if (_.isNil(root)) {
        return undefined;
    }
    if (root.value === value) {
        return root;
    }
    if (root.children) {
        for (var _i = 0, _a = root.children; _i < _a.length; _i++) {
            var child = _a[_i];
            var foundItem = findItem(child, value);
            if (foundItem) {
                return foundItem;
            }
        }
    }
    return undefined;
}
function findItemInList(list, value) {
    if (_.isNil(list)) {
        return undefined;
    }
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var item = list_1[_i];
        var foundItem = findItem(item, value);
        if (foundItem) {
            return foundItem;
        }
    }
    return undefined;
}
function findParent(root, item) {
    if (_.isNil(root) || _.isNil(root.children)) {
        return undefined;
    }
    for (var _i = 0, _a = root.children; _i < _a.length; _i++) {
        var child = _a[_i];
        if (child === item) {
            return root;
        }
        else {
            var parent_1 = findParent(child, item);
            if (parent_1) {
                return parent_1;
            }
        }
    }
    return undefined;
}
function removeItem(root, item) {
    var parent = findParent(root, item);
    if (parent) {
        _.pull(parent.children, item);
        if (parent.children.length === 0) {
            parent.children = undefined;
        }
        else {
            parent.correctChecked();
        }
        return true;
    }
    return false;
}
//# sourceMappingURL=treeview-helper.js.map