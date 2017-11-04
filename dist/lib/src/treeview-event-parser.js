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
import * as _ from 'lodash';
var TreeviewEventParser = (function () {
    function TreeviewEventParser() {
    }
    return TreeviewEventParser;
}());
export { TreeviewEventParser };
TreeviewEventParser.decorators = [
    { type: Injectable },
];
/** @nocollapse */
TreeviewEventParser.ctorParameters = function () { return []; };
var DefaultTreeviewEventParser = (function (_super) {
    __extends(DefaultTreeviewEventParser, _super);
    function DefaultTreeviewEventParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultTreeviewEventParser.prototype.getSelectedChange = function (component) {
        var checkedItems = component.selection.checkedItems;
        if (!_.isNil(checkedItems)) {
            return checkedItems.map(function (item) { return item.value; });
        }
        return [];
    };
    return DefaultTreeviewEventParser;
}(TreeviewEventParser));
export { DefaultTreeviewEventParser };
DefaultTreeviewEventParser.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DefaultTreeviewEventParser.ctorParameters = function () { return []; };
var DownlineTreeviewEventParser = (function (_super) {
    __extends(DownlineTreeviewEventParser, _super);
    function DownlineTreeviewEventParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DownlineTreeviewEventParser.prototype.getSelectedChange = function (component) {
        var _this = this;
        var items = component.items;
        if (!_.isNil(items)) {
            var result_1 = [];
            items.forEach(function (item) {
                var links = _this.getLinks(item, null);
                if (!_.isNil(links)) {
                    result_1 = result_1.concat(links);
                }
            });
            return result_1;
        }
        return [];
    };
    DownlineTreeviewEventParser.prototype.getLinks = function (item, parent) {
        var _this = this;
        if (!_.isNil(item.children)) {
            var link_1 = {
                item: item,
                parent: parent
            };
            var result_2 = [];
            item.children.forEach(function (child) {
                var links = _this.getLinks(child, link_1);
                if (!_.isNil(links)) {
                    result_2 = result_2.concat(links);
                }
            });
            return result_2;
        }
        if (item.checked) {
            return [{
                    item: item,
                    parent: parent
                }];
        }
        return null;
    };
    return DownlineTreeviewEventParser;
}(TreeviewEventParser));
export { DownlineTreeviewEventParser };
DownlineTreeviewEventParser.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DownlineTreeviewEventParser.ctorParameters = function () { return []; };
var OrderDownlineTreeviewEventParser = (function (_super) {
    __extends(OrderDownlineTreeviewEventParser, _super);
    function OrderDownlineTreeviewEventParser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentDownlines = [];
        _this.parser = new DownlineTreeviewEventParser();
        return _this;
    }
    OrderDownlineTreeviewEventParser.prototype.getSelectedChange = function (component) {
        var newDownlines = this.parser.getSelectedChange(component);
        if (this.currentDownlines.length === 0) {
            this.currentDownlines = newDownlines;
        }
        else {
            var intersectDownlines_1 = [];
            this.currentDownlines.forEach(function (downline) {
                var foundIndex = -1;
                var length = newDownlines.length;
                for (var i = 0; i < length; i++) {
                    if (downline.item.value === newDownlines[i].item.value) {
                        foundIndex = i;
                        break;
                    }
                }
                if (foundIndex !== -1) {
                    intersectDownlines_1.push(newDownlines[foundIndex]);
                    newDownlines.splice(foundIndex, 1);
                }
            });
            this.currentDownlines = intersectDownlines_1.concat(newDownlines);
        }
        return this.currentDownlines;
    };
    return OrderDownlineTreeviewEventParser;
}(TreeviewEventParser));
export { OrderDownlineTreeviewEventParser };
OrderDownlineTreeviewEventParser.decorators = [
    { type: Injectable },
];
/** @nocollapse */
OrderDownlineTreeviewEventParser.ctorParameters = function () { return []; };
//# sourceMappingURL=treeview-event-parser.js.map