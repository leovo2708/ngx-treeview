import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TreeviewI18n } from './treeview-i18n';
import { TreeviewConfig } from './treeview-config';
import { TreeviewComponent } from './treeview.component';
import { DropdownDirective } from './dropdown.directive';
var DropdownTreeviewComponent = (function () {
    function DropdownTreeviewComponent(i18n, defaultConfig) {
        this.i18n = i18n;
        this.defaultConfig = defaultConfig;
        this.buttonClass = 'btn-outline-secondary';
        this.selectedChange = new EventEmitter(true);
        this.config = this.defaultConfig;
    }
    DropdownTreeviewComponent.prototype.getText = function () {
        return this.i18n.getText(this.treeviewComponent.selection);
    };
    DropdownTreeviewComponent.prototype.onSelectedChange = function (values) {
        this.selectedChange.emit(values);
    };
    return DropdownTreeviewComponent;
}());
export { DropdownTreeviewComponent };
DropdownTreeviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-dropdown-treeview',
                template: "\n      <div class=\"dropdown\" ngxDropdown>\n          <button class=\"btn\" [ngClass]=\"buttonClass\" type=\"button\" role=\"button\" ngxDropdownToggle>\n              {{getText()}}\n          </button>\n          <div ngxDropdownMenu aria-labelledby=\"dropdownMenu\" (click)=\"$event.stopPropagation()\">\n              <div class=\"dropdown-container\">\n                  <ngx-treeview [config]=\"config\" [headerTemplate]=\"headerTemplate\" [items]=\"items\" [itemTemplate]=\"itemTemplate\" (selectedChange)=\"onSelectedChange($event)\">\n                  </ngx-treeview>\n              </div>\n          </div>\n      </div>\n    ",
                styles: ["\n      .dropdown {\n        width: 100%;\n        display: inline-block;\n      }\n\n      .dropdown button {\n        width: 100%;\n        margin-right: .9rem;\n        text-align: left;\n      }\n\n      .dropdown button::after {\n        position: absolute;\n        right: .6rem;\n        margin-top: .6rem;\n      }\n\n      .dropdown .dropdown-menu .dropdown-container {\n        padding: 0 .6rem;\n      }\n    "]
            },] },
];
/** @nocollapse */
DropdownTreeviewComponent.ctorParameters = function () { return [
    { type: TreeviewI18n, },
    { type: TreeviewConfig, },
]; };
DropdownTreeviewComponent.propDecorators = {
    'buttonClass': [{ type: Input },],
    'headerTemplate': [{ type: Input },],
    'itemTemplate': [{ type: Input },],
    'items': [{ type: Input },],
    'config': [{ type: Input },],
    'selectedChange': [{ type: Output },],
    'treeviewComponent': [{ type: ViewChild, args: [TreeviewComponent,] },],
    'dropdownDirective': [{ type: ViewChild, args: [DropdownDirective,] },],
};
//# sourceMappingURL=dropdown-treeview.component.js.map