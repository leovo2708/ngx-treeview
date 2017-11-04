import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as _ from 'lodash';
import { TreeviewConfig } from './treeview-config';
var TreeviewItemComponent = (function () {
    function TreeviewItemComponent(defaultConfig) {
        var _this = this;
        this.defaultConfig = defaultConfig;
        this.checkedChange = new EventEmitter();
        this.onCollapseExpand = function () {
            _this.item.collapsed = !_this.item.collapsed;
        };
        this.onCheckedChange = function () {
            var checked = _this.item.checked;
            if (!_.isNil(_this.item.children) && !_this.config.decoupleChildFromParent) {
                _this.item.children.forEach(function (child) { return child.setCheckedRecursive(checked); });
            }
            _this.checkedChange.emit(checked);
        };
        this.config = this.defaultConfig;
    }
    TreeviewItemComponent.prototype.onChildCheckedChange = function (child, checked) {
        if (!this.config.decoupleChildFromParent) {
            var itemChecked = null;
            for (var _i = 0, _a = this.item.children; _i < _a.length; _i++) {
                var childItem = _a[_i];
                if (itemChecked === null) {
                    itemChecked = childItem.checked;
                }
                else if (itemChecked !== childItem.checked) {
                    itemChecked = undefined;
                    break;
                }
            }
            if (itemChecked === null) {
                itemChecked = false;
            }
            if (this.item.checked !== itemChecked) {
                this.item.checked = itemChecked;
            }
        }
        this.checkedChange.emit(checked);
    };
    return TreeviewItemComponent;
}());
export { TreeviewItemComponent };
TreeviewItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-treeview-item',
                template: "\n      <div *ngIf=\"item\" class=\"treeview-item\">\n          <ng-template [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"{item: item, onCollapseExpand: onCollapseExpand, onCheckedChange: onCheckedChange}\">\n          </ng-template>\n          <div *ngIf=\"!item.collapsed\" [ngClass]=\"itemsContainerClass\">\n              <ngx-treeview-item [config]=\"config\" *ngFor=\"let child of item.children\" [item]=\"child\" [template]=\"template\" (checkedChange)=\"onChildCheckedChange(child, $event)\">\n              </ngx-treeview-item>\n          </div>\n      </div>\n    ",
                styles: ["\n      :host {\n        display: block;\n      }\n\n      :host .treeview-item {\n        white-space: nowrap;\n      }\n\n      :host .treeview-item .treeview-item {\n        margin-left: 2rem;\n      }\n    "]
            },] },
];
/** @nocollapse */
TreeviewItemComponent.ctorParameters = function () { return [
    { type: TreeviewConfig, },
]; };
TreeviewItemComponent.propDecorators = {
    'config': [{ type: Input },],
    'template': [{ type: Input },],
    'item': [{ type: Input },],
    'itemsContainerClass': [{ type: Input },],
    'checkedChange': [{ type: Output },],
};
//# sourceMappingURL=treeview-item.component.js.map