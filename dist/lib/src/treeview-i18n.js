var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Injectable } from '@angular/core';
var TreeviewI18n = (function () {
    function TreeviewI18n() {
    }
    return TreeviewI18n;
}());
export { TreeviewI18n };
TreeviewI18n.decorators = [
    { type: Injectable },
];
/** @nocollapse */
TreeviewI18n.ctorParameters = function () { return []; };
var TreeviewI18nDefault = (function (_super) {
    __extends(TreeviewI18nDefault, _super);
    function TreeviewI18nDefault() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TreeviewI18nDefault.prototype.getText = function (selection) {
        if (selection.uncheckedItems.length === 0) {
            return this.getAllCheckboxText();
        }
        switch (selection.checkedItems.length) {
            case 0:
                return 'Select options';
            case 1:
                return selection.checkedItems[0].text;
            default:
                return selection.checkedItems.length + " options selected";
        }
    };
    TreeviewI18nDefault.prototype.getAllCheckboxText = function () {
        return 'All';
    };
    TreeviewI18nDefault.prototype.getFilterPlaceholder = function () {
        return 'Filter';
    };
    TreeviewI18nDefault.prototype.getFilterNoItemsFoundText = function () {
        return 'No items found';
    };
    TreeviewI18nDefault.prototype.getTooltipCollapseExpandText = function (isCollapse) {
        return isCollapse ? 'Expand' : 'Collapse';
    };
    return TreeviewI18nDefault;
}(TreeviewI18n));
export { TreeviewI18nDefault };
TreeviewI18nDefault.decorators = [
    { type: Injectable },
];
/** @nocollapse */
TreeviewI18nDefault.ctorParameters = function () { return []; };
//# sourceMappingURL=treeview-i18n.js.map