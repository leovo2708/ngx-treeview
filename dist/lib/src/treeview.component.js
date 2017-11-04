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
import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { TreeviewI18n } from './treeview-i18n';
import { TreeviewItem } from './treeview-item';
import { TreeviewConfig } from './treeview-config';
import { TreeviewEventParser } from './treeview-event-parser';
var FilterTreeviewItem = (function (_super) {
    __extends(FilterTreeviewItem, _super);
    function FilterTreeviewItem(item) {
        var _this = _super.call(this, {
            text: item.text,
            value: item.value,
            disabled: item.disabled,
            checked: item.checked,
            collapsed: item.collapsed,
            children: item.children
        }) || this;
        _this.refItem = item;
        return _this;
    }
    FilterTreeviewItem.prototype.updateRefChecked = function () {
        this.children.forEach(function (child) {
            if (child instanceof FilterTreeviewItem) {
                child.updateRefChecked();
            }
        });
        var refChecked = this.checked;
        if (refChecked) {
            for (var _i = 0, _a = this.refItem.children; _i < _a.length; _i++) {
                var refChild = _a[_i];
                if (!refChild.checked) {
                    refChecked = false;
                    break;
                }
            }
        }
        this.refItem.checked = refChecked;
    };
    return FilterTreeviewItem;
}(TreeviewItem));
var TreeviewComponent = (function () {
    function TreeviewComponent(i18n, defaultConfig, eventParser) {
        this.i18n = i18n;
        this.defaultConfig = defaultConfig;
        this.eventParser = eventParser;
        this.selectedChange = new EventEmitter();
        this.filterText = '';
        this.config = this.defaultConfig;
        this.allItem = new TreeviewItem({ text: 'All', value: undefined });
        this.createHeaderTemplateContext();
    }
    Object.defineProperty(TreeviewComponent.prototype, "hasFilterItems", {
        get: function () {
            return !_.isNil(this.filterItems) && this.filterItems.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeviewComponent.prototype, "maxHeight", {
        get: function () {
            return "" + this.config.maxHeight;
        },
        enumerable: true,
        configurable: true
    });
    TreeviewComponent.prototype.ngOnChanges = function (changes) {
        var itemsSimpleChange = changes['items'];
        if (!_.isNil(itemsSimpleChange)) {
            if (!_.isNil(this.items)) {
                this.updateFilterItems();
                this.updateCollapsedOfAll();
                this.raiseSelectedChange();
            }
        }
        this.createHeaderTemplateContext();
    };
    TreeviewComponent.prototype.onAllCollapseExpand = function () {
        var _this = this;
        this.allItem.collapsed = !this.allItem.collapsed;
        this.filterItems.forEach(function (item) { return item.setCollapsedRecursive(_this.allItem.collapsed); });
    };
    TreeviewComponent.prototype.onFilterTextChange = function (text) {
        this.filterText = text;
        this.updateFilterItems();
    };
    TreeviewComponent.prototype.onAllCheckedChange = function (checked) {
        this.filterItems.forEach(function (item) {
            item.setCheckedRecursive(checked);
            if (item instanceof FilterTreeviewItem) {
                item.updateRefChecked();
            }
        });
        this.raiseSelectedChange();
    };
    TreeviewComponent.prototype.onItemCheckedChange = function (item, checked) {
        if (item instanceof FilterTreeviewItem) {
            item.updateRefChecked();
        }
        this.updateCheckedOfAll();
        this.raiseSelectedChange();
    };
    TreeviewComponent.prototype.raiseSelectedChange = function () {
        this.generateSelection();
        var values = this.eventParser.getSelectedChange(this);
        this.selectedChange.emit(values);
    };
    TreeviewComponent.prototype.createHeaderTemplateContext = function () {
        var _this = this;
        this.headerTemplateContext = {
            config: this.config,
            item: this.allItem,
            onCheckedChange: function (checked) { return _this.onAllCheckedChange(checked); },
            onCollapseExpand: function () { return _this.onAllCollapseExpand(); },
            onFilterTextChange: function (text) { return _this.onFilterTextChange(text); }
        };
    };
    TreeviewComponent.prototype.generateSelection = function () {
        var checkedItems = [];
        var uncheckedItems = [];
        if (!_.isNil(this.items)) {
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var item = _a[_i];
                var selection = item.getSelection();
                checkedItems = _.concat(checkedItems, selection.checkedItems);
                uncheckedItems = _.concat(uncheckedItems, selection.uncheckedItems);
            }
        }
        this.selection = {
            checkedItems: checkedItems,
            uncheckedItems: uncheckedItems
        };
    };
    TreeviewComponent.prototype.updateFilterItems = function () {
        var _this = this;
        if (this.filterText !== '') {
            var filterItems_1 = [];
            var filterText_1 = this.filterText.toLowerCase();
            this.items.forEach(function (item) {
                var newItem = _this.filterItem(item, filterText_1);
                if (!_.isNil(newItem)) {
                    filterItems_1.push(newItem);
                }
            });
            this.filterItems = filterItems_1;
        }
        else {
            this.filterItems = this.items;
        }
        this.updateCheckedOfAll();
    };
    TreeviewComponent.prototype.filterItem = function (item, filterText) {
        var _this = this;
        var isMatch = _.includes(item.text.toLowerCase(), filterText);
        if (isMatch) {
            return item;
        }
        else {
            if (!_.isNil(item.children)) {
                var children_1 = [];
                item.children.forEach(function (child) {
                    var newChild = _this.filterItem(child, filterText);
                    if (!_.isNil(newChild)) {
                        children_1.push(newChild);
                    }
                });
                if (children_1.length > 0) {
                    var newItem = new FilterTreeviewItem(item);
                    newItem.collapsed = false;
                    newItem.children = children_1;
                    return newItem;
                }
            }
        }
        return undefined;
    };
    TreeviewComponent.prototype.updateCheckedOfAll = function () {
        var itemChecked = null;
        for (var _i = 0, _a = this.filterItems; _i < _a.length; _i++) {
            var filterItem = _a[_i];
            if (itemChecked === null) {
                itemChecked = filterItem.checked;
            }
            else if (itemChecked !== filterItem.checked) {
                itemChecked = undefined;
                break;
            }
        }
        if (itemChecked === null) {
            itemChecked = false;
        }
        this.allItem.checked = itemChecked;
    };
    TreeviewComponent.prototype.updateCollapsedOfAll = function () {
        var hasItemExpanded = false;
        for (var _i = 0, _a = this.filterItems; _i < _a.length; _i++) {
            var filterItem = _a[_i];
            if (!filterItem.collapsed) {
                hasItemExpanded = true;
                break;
            }
        }
        this.allItem.collapsed = !hasItemExpanded;
    };
    return TreeviewComponent;
}());
export { TreeviewComponent };
TreeviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-treeview',
                template: "\n      <ng-template #defaultItemTemplate let-item=\"item\" let-onCollapseExpand=\"onCollapseExpand\" let-onCheckedChange=\"onCheckedChange\">\n          <div class=\"form-check\">\n              <i *ngIf=\"item.children\" (click)=\"onCollapseExpand()\" aria-hidden=\"true\" class=\"fa\" [class.fa-caret-right]=\"item.collapsed\"\n                  [class.fa-caret-down]=\"!item.collapsed\"></i>\n              <label class=\"form-check-label\">\n                  <input type=\"checkbox\" class=\"form-check-input\"\n                      [(ngModel)]=\"item.checked\" (ngModelChange)=\"onCheckedChange()\" [disabled]=\"item.disabled\" [indeterminate]=\"item.indeterminate\" />\n                  {{item.text}}\n              </label>\n          </div>\n      </ng-template>\n      <ng-template #defaultHeaderTemplate let-config=\"config\" let-item=\"item\" let-onCollapseExpand=\"onCollapseExpand\" let-onCheckedChange=\"onCheckedChange\"\n          let-onFilterTextChange=\"onFilterTextChange\">\n          <div *ngIf=\"config.hasFilter\" class=\"row row-filter\">\n              <div class=\"col-12\">\n                  <input class=\"form-control\" type=\"text\" [placeholder]=\"i18n.getFilterPlaceholder()\" [(ngModel)]=\"filterText\" (ngModelChange)=\"onFilterTextChange($event)\"\n                  />\n              </div>\n          </div>\n          <div *ngIf=\"hasFilterItems\">\n              <div *ngIf=\"config.hasAllCheckBox || config.hasCollapseExpand\" class=\"row\">\n                  <div class=\"col-12\">\n                      <label *ngIf=\"config.hasAllCheckBox\" class=\"form-check-label\">\n                          <input type=\"checkbox\" class=\"form-check-input\"\n                              [(ngModel)]=\"item.checked\" (ngModelChange)=\"onCheckedChange($event)\" [indeterminate]=\"item.indeterminate\" />\n                              {{i18n.getAllCheckboxText()}}\n                      </label>\n                      <label *ngIf=\"config.hasCollapseExpand\" class=\"pull-right form-check-label\" (click)=\"onCollapseExpand()\">\n                          <i [title]=\"i18n.getTooltipCollapseExpandText(item.collapsed)\" aria-hidden=\"true\"\n                              class=\"fa\" [class.fa-expand]=\"item.collapsed\" [class.fa-compress]=\"!item.collapsed\"></i>\n                      </label>\n                  </div>\n              </div>\n              <div *ngIf=\"config.hasDivider\" class=\"dropdown-divider\"></div>\n          </div>\n      </ng-template>\n      <div class=\"treeview-header\">\n          <ng-template [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\" [ngTemplateOutletContext]=\"headerTemplateContext\">\n          </ng-template>\n      </div>\n      <div [ngSwitch]=\"hasFilterItems\">\n          <div *ngSwitchCase=\"true\" class=\"treeview-container\" [style.max-height.px]=\"maxHeight\">\n              <ngx-treeview-item *ngFor=\"let item of filterItems\" [config]=\"config\" [item]=\"item\" [template]=\"itemTemplate || defaultItemTemplate\"\n                  [itemsContainerClass]=\"itemsContainerClass\" (checkedChange)=\"onItemCheckedChange(item, $event)\">\n              </ngx-treeview-item>\n          </div>\n          <div *ngSwitchCase=\"false\" class=\"treeview-text\">\n              {{i18n.getFilterNoItemsFoundText()}}\n          </div>\n      </div>\n    ",
                styles: ["\n      :host /deep/ .treeview-header .row-filter {\n        margin-bottom: .5rem;\n      }\n\n      :host /deep/ .treeview-container .fa {\n        width: .8rem;\n        cursor: pointer;\n      }\n\n      .treeview-container {\n        overflow-x: hidden;\n        overflow-y: auto;\n        padding-right: 18px;\n      }\n\n      .treeview-text {\n        padding: .3rem 0;\n        white-space: nowrap;\n      }\n    "]
            },] },
];
/** @nocollapse */
TreeviewComponent.ctorParameters = function () { return [
    { type: TreeviewI18n, },
    { type: TreeviewConfig, },
    { type: TreeviewEventParser, },
]; };
TreeviewComponent.propDecorators = {
    'headerTemplate': [{ type: Input },],
    'itemTemplate': [{ type: Input },],
    'items': [{ type: Input },],
    'config': [{ type: Input },],
    'itemsContainerClass': [{ type: Input },],
    'selectedChange': [{ type: Output },],
};
//# sourceMappingURL=treeview.component.js.map