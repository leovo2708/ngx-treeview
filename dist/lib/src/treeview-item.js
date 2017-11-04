import * as _ from 'lodash';
var TreeviewItem = (function () {
    function TreeviewItem(item, autoCorrectChecked) {
        if (autoCorrectChecked === void 0) { autoCorrectChecked = false; }
        var _this = this;
        this.internalDisabled = false;
        this.internalChecked = true;
        this.internalCollapsed = false;
        if (_.isNil(item)) {
            throw new Error('Item must be defined');
        }
        if (_.isString(item.text)) {
            this.text = item.text;
        }
        else {
            throw new Error('A text of item must be string object');
        }
        this.value = item.value;
        if (_.isBoolean(item.checked)) {
            this.checked = item.checked;
        }
        if (_.isBoolean(item.collapsed)) {
            this.collapsed = item.collapsed;
        }
        if (_.isBoolean(item.disabled)) {
            this.disabled = item.disabled;
        }
        if (!_.isNil(item.children) && item.children.length > 0) {
            this.children = item.children.map(function (child) {
                if (_this.disabled === true) {
                    child.disabled = true;
                }
                return new TreeviewItem(child);
            });
        }
        if (autoCorrectChecked) {
            this.correctChecked();
        }
    }
    Object.defineProperty(TreeviewItem.prototype, "checked", {
        get: function () {
            return this.internalChecked;
        },
        set: function (value) {
            if (!this.internalDisabled) {
                if (this.internalChecked !== value) {
                    this.internalChecked = value;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeviewItem.prototype, "indeterminate", {
        get: function () {
            return this.checked === undefined;
        },
        enumerable: true,
        configurable: true
    });
    TreeviewItem.prototype.setCheckedRecursive = function (value) {
        if (!this.internalDisabled) {
            this.internalChecked = value;
            if (!_.isNil(this.internalChildren)) {
                this.internalChildren.forEach(function (child) { return child.setCheckedRecursive(value); });
            }
        }
    };
    Object.defineProperty(TreeviewItem.prototype, "disabled", {
        get: function () {
            return this.internalDisabled;
        },
        set: function (value) {
            if (this.internalDisabled !== value) {
                this.internalDisabled = value;
                if (!_.isNil(this.internalChildren)) {
                    this.internalChildren.forEach(function (child) { return child.disabled = value; });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeviewItem.prototype, "collapsed", {
        get: function () {
            return this.internalCollapsed;
        },
        set: function (value) {
            if (this.internalCollapsed !== value) {
                this.internalCollapsed = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    TreeviewItem.prototype.setCollapsedRecursive = function (value) {
        this.internalCollapsed = value;
        if (!_.isNil(this.internalChildren)) {
            this.internalChildren.forEach(function (child) { return child.setCollapsedRecursive(value); });
        }
    };
    Object.defineProperty(TreeviewItem.prototype, "children", {
        get: function () {
            return this.internalChildren;
        },
        set: function (value) {
            if (this.internalChildren !== value) {
                if (!_.isNil(value) && value.length === 0) {
                    throw new Error('Children must be not an empty array');
                }
                this.internalChildren = value;
                if (!_.isNil(this.internalChildren)) {
                    var checked_1 = null;
                    this.internalChildren.forEach(function (child) {
                        if (checked_1 === null) {
                            checked_1 = child.checked;
                        }
                        else {
                            if (child.checked !== checked_1) {
                                checked_1 = undefined;
                                return;
                            }
                        }
                    });
                    this.internalChecked = checked_1;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    TreeviewItem.prototype.getSelection = function () {
        var checkedItems = [];
        var uncheckedItems = [];
        if (_.isNil(this.internalChildren)) {
            if (this.internalChecked) {
                checkedItems.push(this);
            }
            else {
                uncheckedItems.push(this);
            }
        }
        else {
            for (var _i = 0, _a = this.internalChildren; _i < _a.length; _i++) {
                var child = _a[_i];
                var selection = child.getSelection();
                checkedItems = _.concat(checkedItems, selection.checkedItems);
                uncheckedItems = _.concat(uncheckedItems, selection.uncheckedItems);
            }
        }
        return {
            checkedItems: checkedItems,
            uncheckedItems: uncheckedItems
        };
    };
    TreeviewItem.prototype.correctChecked = function () {
        this.internalChecked = this.getCorrectChecked();
    };
    TreeviewItem.prototype.getCorrectChecked = function () {
        var checked = null;
        if (!_.isNil(this.internalChildren)) {
            for (var _i = 0, _a = this.internalChildren; _i < _a.length; _i++) {
                var child = _a[_i];
                child.internalChecked = child.getCorrectChecked();
                if (checked === null) {
                    checked = child.internalChecked;
                }
                else if (checked !== child.internalChecked) {
                    checked = undefined;
                    break;
                }
            }
        }
        else {
            checked = this.checked;
        }
        return checked;
    };
    return TreeviewItem;
}());
export { TreeviewItem };
//# sourceMappingURL=treeview-item.js.map