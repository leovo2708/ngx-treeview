webpackJsonp([1],{

/***/ "../../../../../dist/lib/src/dropdown-toggle.directive.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dropdown_directive__ = __webpack_require__("../../../../../dist/lib/src/dropdown.directive.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DropdownToggleDirective; });


var DropdownToggleDirective = (function () {
    function DropdownToggleDirective(dropdown, elementRef) {
        this.dropdown = dropdown;
        dropdown.toggleElement = elementRef.nativeElement;
    }
    Object.defineProperty(DropdownToggleDirective.prototype, "ariaExpanded", {
        get: function () {
            return this.dropdown.isOpen;
        },
        enumerable: true,
        configurable: true
    });
    DropdownToggleDirective.prototype.onClick = function () {
        this.dropdown.toggle();
    };
    DropdownToggleDirective.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                    selector: '[ngxDropdownToggle]',
                    // tslint:disable-next-line:use-host-property-decorator
                    host: {
                        'class': 'dropdown-toggle',
                        'aria-haspopup': 'true'
                    }
                },] },
    ];
    /** @nocollapse */
    DropdownToggleDirective.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_1__dropdown_directive__["a" /* DropdownDirective */], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
    ]; };
    DropdownToggleDirective.propDecorators = {
        'ariaExpanded': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"], args: ['attr.aria-expanded',] },],
        'onClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"], args: ['click',] },],
    };
    return DropdownToggleDirective;
}());



/***/ }),

/***/ "../../../../../dist/lib/src/dropdown-treeview.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__treeview_i18n__ = __webpack_require__("../../../../../dist/lib/src/treeview-i18n.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__treeview_config__ = __webpack_require__("../../../../../dist/lib/src/treeview-config.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__treeview_component__ = __webpack_require__("../../../../../dist/lib/src/treeview.component.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DropdownTreeviewComponent; });




var DropdownTreeviewComponent = (function () {
    function DropdownTreeviewComponent(i18n, defaultConfig) {
        this.i18n = i18n;
        this.defaultConfig = defaultConfig;
        this.selectedChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](true);
        this.config = this.defaultConfig;
    }
    DropdownTreeviewComponent.prototype.getText = function () {
        return this.i18n.getText(this.treeviewComponent.checkedItems, this.treeviewComponent.allItem.checked);
    };
    DropdownTreeviewComponent.prototype.onSelectedChange = function (values) {
        this.selectedChange.emit(values);
    };
    DropdownTreeviewComponent.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: 'ngx-dropdown-treeview',
                    template: "\n      <div class=\"dropdown\" ngxDropdown>\n          <button class=\"btn btn-secondary\" type=\"button\" role=\"button\" ngxDropdownToggle>\n              {{getText()}}\n          </button>\n          <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\" (click)=\"$event.stopPropagation()\">\n              <div class=\"dropdown-container\">\n                  <ngx-treeview [config]=\"config\" [headerTemplate]=\"headerTemplate\" [items]=\"items\" [itemTemplate]=\"itemTemplate\" (selectedChange)=\"onSelectedChange($event)\">\n                  </ngx-treeview>\n              </div>\n          </div>\n      </div>\n    ",
                    styles: ["\n      .dropdown {\n        width: 100%;\n        display: inline-block;\n      }\n\n      .dropdown button {\n        width: 100%;\n        margin-right: .9rem;\n        text-align: left;\n      }\n\n      .dropdown button::after {\n        position: absolute;\n        right: .6rem;\n        margin-top: .6rem;\n      }\n\n      .dropdown .dropdown-menu .dropdown-container {\n        padding: 0 .6rem;\n      }\n    "]
                },] },
    ];
    /** @nocollapse */
    DropdownTreeviewComponent.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_1__treeview_i18n__["a" /* TreeviewI18n */], },
        { type: __WEBPACK_IMPORTED_MODULE_2__treeview_config__["a" /* TreeviewConfig */], },
    ]; };
    DropdownTreeviewComponent.propDecorators = {
        'headerTemplate': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'itemTemplate': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'items': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'config': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'selectedChange': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
        'treeviewComponent': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"], args: [__WEBPACK_IMPORTED_MODULE_3__treeview_component__["a" /* TreeviewComponent */],] },],
    };
    return DropdownTreeviewComponent;
}());



/***/ }),

/***/ "../../../../../dist/lib/src/dropdown.directive.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DropdownDirective; });


var DropdownDirective = (function () {
    function DropdownDirective() {
        // tslint:disable-next-line:no-input-rename
        this.internalOpen = false;
        this.openChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    Object.defineProperty(DropdownDirective.prototype, "isOpen", {
        get: function () {
            return this.internalOpen;
        },
        enumerable: true,
        configurable: true
    });
    DropdownDirective.prototype.onKeyupEsc = function () {
        this.close();
    };
    DropdownDirective.prototype.onDocumentClick = function (event) {
        if (event.button !== 2 && !this.isEventFromToggle(event)) {
            this.close();
        }
    };
    DropdownDirective.prototype.open = function () {
        if (!this.internalOpen) {
            this.internalOpen = true;
            this.openChange.emit(true);
        }
    };
    DropdownDirective.prototype.close = function () {
        if (this.internalOpen) {
            this.internalOpen = false;
            this.openChange.emit(false);
        }
    };
    DropdownDirective.prototype.toggle = function () {
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    };
    DropdownDirective.prototype.isEventFromToggle = function (event) {
        return !__WEBPACK_IMPORTED_MODULE_1_lodash__["isNil"](this.toggleElement) && this.toggleElement.contains(event.target);
    };
    DropdownDirective.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                    selector: '[ngxDropdown]',
                    exportAs: 'ngxDropdown'
                },] },
    ];
    /** @nocollapse */
    DropdownDirective.ctorParameters = function () { return []; };
    DropdownDirective.propDecorators = {
        'internalOpen': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['open',] },],
        'openChange': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
        'isOpen': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"], args: ['class.show',] },],
        'onKeyupEsc': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"], args: ['keyup.esc',] },],
        'onDocumentClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"], args: ['document:click', ['$event'],] },],
    };
    return DropdownDirective;
}());



/***/ }),

/***/ "../../../../../dist/lib/src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__treeview_module__ = __webpack_require__("../../../../../dist/lib/src/treeview.module.js");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TreeviewModule", function() { return __WEBPACK_IMPORTED_MODULE_0__treeview_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__treeview_component__ = __webpack_require__("../../../../../dist/lib/src/treeview.component.js");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TreeviewComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__treeview_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__treeview_pipe__ = __webpack_require__("../../../../../dist/lib/src/treeview.pipe.js");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TreeviewPipe", function() { return __WEBPACK_IMPORTED_MODULE_2__treeview_pipe__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__treeview_item__ = __webpack_require__("../../../../../dist/lib/src/treeview-item.js");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TreeviewItem", function() { return __WEBPACK_IMPORTED_MODULE_3__treeview_item__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__treeview_config__ = __webpack_require__("../../../../../dist/lib/src/treeview-config.js");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TreeviewConfig", function() { return __WEBPACK_IMPORTED_MODULE_4__treeview_config__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__treeview_i18n__ = __webpack_require__("../../../../../dist/lib/src/treeview-i18n.js");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TreeviewI18n", function() { return __WEBPACK_IMPORTED_MODULE_5__treeview_i18n__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TreeviewI18nDefault", function() { return __WEBPACK_IMPORTED_MODULE_5__treeview_i18n__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__treeview_event_parser__ = __webpack_require__("../../../../../dist/lib/src/treeview-event-parser.js");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TreeviewEventParser", function() { return __WEBPACK_IMPORTED_MODULE_6__treeview_event_parser__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DefaultTreeviewEventParser", function() { return __WEBPACK_IMPORTED_MODULE_6__treeview_event_parser__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DownlineTreeviewEventParser", function() { return __WEBPACK_IMPORTED_MODULE_6__treeview_event_parser__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "OrderDownlineTreeviewEventParser", function() { return __WEBPACK_IMPORTED_MODULE_6__treeview_event_parser__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__treeview_helper__ = __webpack_require__("../../../../../dist/lib/src/treeview-helper.js");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TreeviewHelper", function() { return __WEBPACK_IMPORTED_MODULE_7__treeview_helper__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dropdown_treeview_component__ = __webpack_require__("../../../../../dist/lib/src/dropdown-treeview.component.js");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DropdownTreeviewComponent", function() { return __WEBPACK_IMPORTED_MODULE_8__dropdown_treeview_component__["a"]; });











/***/ }),

/***/ "../../../../../dist/lib/src/treeview-config.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeviewConfig; });

var TreeviewConfig = (function () {
    function TreeviewConfig() {
        this.hasAllCheckBox = true;
        this.hasFilter = false;
        this.hasCollapseExpand = false;
        this.maxHeight = 500;
    }
    Object.defineProperty(TreeviewConfig.prototype, "hasDivider", {
        get: function () {
            return this.hasFilter || this.hasAllCheckBox || this.hasCollapseExpand;
        },
        enumerable: true,
        configurable: true
    });
    TreeviewConfig.create = function (fields) {
        var config = new TreeviewConfig();
        Object.assign(config, fields);
        return config;
    };
    TreeviewConfig.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    TreeviewConfig.ctorParameters = function () { return []; };
    return TreeviewConfig;
}());



/***/ }),

/***/ "../../../../../dist/lib/src/treeview-event-parser.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeviewEventParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DefaultTreeviewEventParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return DownlineTreeviewEventParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return OrderDownlineTreeviewEventParser; });
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


var TreeviewEventParser = (function () {
    function TreeviewEventParser() {
    }
    TreeviewEventParser.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    TreeviewEventParser.ctorParameters = function () { return []; };
    return TreeviewEventParser;
}());

var DefaultTreeviewEventParser = (function (_super) {
    __extends(DefaultTreeviewEventParser, _super);
    function DefaultTreeviewEventParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultTreeviewEventParser.prototype.getSelectedChange = function (component) {
        var checkedItems = component.checkedItems;
        if (!__WEBPACK_IMPORTED_MODULE_1_lodash__["isNil"](checkedItems)) {
            return checkedItems.map(function (item) { return item.value; });
        }
        return [];
    };
    DefaultTreeviewEventParser.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    DefaultTreeviewEventParser.ctorParameters = function () { return []; };
    return DefaultTreeviewEventParser;
}(TreeviewEventParser));

var DownlineTreeviewEventParser = (function (_super) {
    __extends(DownlineTreeviewEventParser, _super);
    function DownlineTreeviewEventParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DownlineTreeviewEventParser.prototype.getSelectedChange = function (component) {
        var _this = this;
        var items = component.items;
        if (!__WEBPACK_IMPORTED_MODULE_1_lodash__["isNil"](items)) {
            var result_1 = [];
            items.forEach(function (item) {
                var links = _this.getLinks(item, null);
                if (!__WEBPACK_IMPORTED_MODULE_1_lodash__["isNil"](links)) {
                    result_1 = result_1.concat(links);
                }
            });
            return result_1;
        }
        return [];
    };
    DownlineTreeviewEventParser.prototype.getLinks = function (item, parent) {
        var _this = this;
        if (!__WEBPACK_IMPORTED_MODULE_1_lodash__["isNil"](item.children)) {
            var link_1 = {
                item: item,
                parent: parent
            };
            var result_2 = [];
            item.children.forEach(function (child) {
                var links = _this.getLinks(child, link_1);
                if (!__WEBPACK_IMPORTED_MODULE_1_lodash__["isNil"](links)) {
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
    DownlineTreeviewEventParser.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    DownlineTreeviewEventParser.ctorParameters = function () { return []; };
    return DownlineTreeviewEventParser;
}(TreeviewEventParser));

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
    OrderDownlineTreeviewEventParser.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    OrderDownlineTreeviewEventParser.ctorParameters = function () { return []; };
    return OrderDownlineTreeviewEventParser;
}(TreeviewEventParser));



/***/ }),

/***/ "../../../../../dist/lib/src/treeview-helper.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeviewHelper; });

var TreeviewHelper = {
    findParent: findParent,
    removeItem: removeItem
};
function findParent(root, item) {
    if (__WEBPACK_IMPORTED_MODULE_0_lodash__["isNil"](root) || __WEBPACK_IMPORTED_MODULE_0_lodash__["isNil"](root.children)) {
        return undefined;
    }
    for (var i = 0; i < root.children.length; i++) {
        var child = root.children[i];
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
        __WEBPACK_IMPORTED_MODULE_0_lodash__["pull"](parent.children, item);
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


/***/ }),

/***/ "../../../../../dist/lib/src/treeview-i18n.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeviewI18n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TreeviewI18nDefault; });
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

var TreeviewI18n = (function () {
    function TreeviewI18n() {
    }
    TreeviewI18n.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    TreeviewI18n.ctorParameters = function () { return []; };
    return TreeviewI18n;
}());

var TreeviewI18nDefault = (function (_super) {
    __extends(TreeviewI18nDefault, _super);
    function TreeviewI18nDefault() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TreeviewI18nDefault.prototype.getText = function (checkededItems, isAll) {
        if (isAll) {
            return 'All';
        }
        switch (checkededItems.length) {
            case 0:
                return 'Select options';
            case 1:
                return checkededItems[0].text;
            default:
                return checkededItems.length + " options selected";
        }
    };
    TreeviewI18nDefault.prototype.allCheckboxText = function () {
        return 'All';
    };
    TreeviewI18nDefault.prototype.filterPlaceholder = function () {
        return 'Filter';
    };
    TreeviewI18nDefault.prototype.filterNoItemsFoundText = function () {
        return 'No items found';
    };
    TreeviewI18nDefault.prototype.tooltipCollapseExpand = function (isCollapse) {
        return isCollapse ? 'Expand' : 'Collapse';
    };
    TreeviewI18nDefault.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    TreeviewI18nDefault.ctorParameters = function () { return []; };
    return TreeviewI18nDefault;
}(TreeviewI18n));



/***/ }),

/***/ "../../../../../dist/lib/src/treeview-item.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeviewItemComponent; });


var TreeviewItemComponent = (function () {
    function TreeviewItemComponent() {
        var _this = this;
        this.checkedChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onCollapseExpand = function () {
            _this.item.collapsed = !_this.item.collapsed;
        };
        this.onCheckedChange = function () {
            var checked = _this.item.checked;
            if (!__WEBPACK_IMPORTED_MODULE_1_lodash__["isNil"](_this.item.children)) {
                _this.item.children.forEach(function (child) { return child.setCheckedRecursive(checked); });
            }
            _this.checkedChange.emit(checked);
        };
    }
    TreeviewItemComponent.prototype.onChildCheckedChange = function (child, checked) {
        if (this.item.checked !== checked) {
            var itemChecked = true;
            for (var i = 0; i < this.item.children.length; i++) {
                if (!this.item.children[i].checked) {
                    itemChecked = false;
                    break;
                }
            }
            this.item.checked = itemChecked;
        }
        this.checkedChange.emit(checked);
    };
    TreeviewItemComponent.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: 'ngx-treeview-item',
                    template: "\n      <div *ngIf=\"item\" class=\"treeview-item\">\n          <ng-template [ngTemplateOutlet]=\"template\" [ngOutletContext]=\"{item: item, onCollapseExpand: onCollapseExpand, onCheckedChange: onCheckedChange}\">\n          </ng-template>\n          <div *ngIf=\"!item.collapsed\">\n              <ngx-treeview-item *ngFor=\"let child of item.children\" [item]=\"child\" [template]=\"template\" (checkedChange)=\"onChildCheckedChange(child, $event)\">\n              </ngx-treeview-item>\n          </div>\n      </div>\n    ",
                    styles: ["\n      :host {\n        display: block;\n      }\n\n      :host .treeview-item {\n        white-space: nowrap;\n      }\n\n      :host .treeview-item .treeview-item {\n        margin-left: 2rem;\n      }\n    "]
                },] },
    ];
    /** @nocollapse */
    TreeviewItemComponent.ctorParameters = function () { return []; };
    TreeviewItemComponent.propDecorators = {
        'template': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'item': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'checkedChange': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    };
    return TreeviewItemComponent;
}());



/***/ }),

/***/ "../../../../../dist/lib/src/treeview-item.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeviewItem; });

var TreeviewItem = (function () {
    function TreeviewItem(item, autoCorrectChecked) {
        if (autoCorrectChecked === void 0) { autoCorrectChecked = false; }
        var _this = this;
        this.internalDisabled = false;
        this.internalChecked = true;
        this.internalCollapsed = false;
        if (__WEBPACK_IMPORTED_MODULE_0_lodash__["isNil"](item)) {
            throw new Error('Item must be defined');
        }
        if (__WEBPACK_IMPORTED_MODULE_0_lodash__["isString"](item.text)) {
            this.text = item.text;
        }
        else {
            throw new Error('A text of item must be string object');
        }
        this.value = item.value;
        if (__WEBPACK_IMPORTED_MODULE_0_lodash__["isBoolean"](item.checked)) {
            this.checked = item.checked;
        }
        if (__WEBPACK_IMPORTED_MODULE_0_lodash__["isBoolean"](item.collapsed)) {
            this.collapsed = item.collapsed;
        }
        if (__WEBPACK_IMPORTED_MODULE_0_lodash__["isBoolean"](item.disabled)) {
            this.disabled = item.disabled;
        }
        if (this.disabled === true && this.checked === false) {
            throw new Error('A disabled item must be checked');
        }
        if (!__WEBPACK_IMPORTED_MODULE_0_lodash__["isNil"](item.children)) {
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
    TreeviewItem.prototype.setCheckedRecursive = function (value) {
        if (!this.internalDisabled) {
            this.internalChecked = value;
            if (!__WEBPACK_IMPORTED_MODULE_0_lodash__["isNil"](this.internalChildren)) {
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
                if (!__WEBPACK_IMPORTED_MODULE_0_lodash__["isNil"](this.internalChildren)) {
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
        if (!__WEBPACK_IMPORTED_MODULE_0_lodash__["isNil"](this.internalChildren)) {
            this.internalChildren.forEach(function (child) { return child.setCollapsedRecursive(value); });
        }
    };
    Object.defineProperty(TreeviewItem.prototype, "children", {
        get: function () {
            return this.internalChildren;
        },
        set: function (value) {
            if (this.internalChildren !== value) {
                if (!__WEBPACK_IMPORTED_MODULE_0_lodash__["isNil"](value) && value.length === 0) {
                    throw new Error('Children must be not an empty array');
                }
                this.internalChildren = value;
                if (!__WEBPACK_IMPORTED_MODULE_0_lodash__["isNil"](this.internalChildren)) {
                    var checked_1 = true;
                    this.internalChildren.forEach(function (child) {
                        if (child.checked === false) {
                            checked_1 = false;
                        }
                    });
                    this.internalChecked = checked_1;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    TreeviewItem.prototype.getCheckedItems = function () {
        var checkedItems = [];
        if (__WEBPACK_IMPORTED_MODULE_0_lodash__["isNil"](this.internalChildren)) {
            if (this.internalChecked) {
                checkedItems.push(this);
            }
        }
        else {
            var childCount = this.internalChildren.length;
            for (var i = 0; i < childCount; i++) {
                checkedItems = __WEBPACK_IMPORTED_MODULE_0_lodash__["concat"](checkedItems, this.internalChildren[i].getCheckedItems());
            }
        }
        return checkedItems;
    };
    TreeviewItem.prototype.correctChecked = function () {
        this.internalChecked = this.getCorrectChecked();
    };
    TreeviewItem.prototype.getCorrectChecked = function () {
        var checked = this.checked;
        if (!__WEBPACK_IMPORTED_MODULE_0_lodash__["isNil"](this.internalChildren)) {
            checked = true;
            var childCount = this.internalChildren.length;
            for (var i = 0; i < childCount; i++) {
                var child = this.internalChildren[i];
                child.internalChecked = child.getCorrectChecked();
                if (!child.internalChecked) {
                    checked = false;
                    break;
                }
            }
        }
        return checked;
    };
    return TreeviewItem;
}());



/***/ }),

/***/ "../../../../../dist/lib/src/treeview.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__treeview_i18n__ = __webpack_require__("../../../../../dist/lib/src/treeview-i18n.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__treeview_item__ = __webpack_require__("../../../../../dist/lib/src/treeview-item.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__treeview_config__ = __webpack_require__("../../../../../dist/lib/src/treeview-config.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__treeview_event_parser__ = __webpack_require__("../../../../../dist/lib/src/treeview-event-parser.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeviewComponent; });
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
        for (var i = 0; i < this.refItem.children.length; i++) {
            var refChild = this.refItem.children[i];
            if (!refChild.checked) {
                refChecked = false;
                break;
            }
        }
        this.refItem.checked = refChecked;
    };
    return FilterTreeviewItem;
}(__WEBPACK_IMPORTED_MODULE_3__treeview_item__["a" /* TreeviewItem */]));
var TreeviewComponent = (function () {
    function TreeviewComponent(i18n, defaultConfig, eventParser) {
        this.i18n = i18n;
        this.defaultConfig = defaultConfig;
        this.eventParser = eventParser;
        this.selectedChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.filterText = '';
        this.config = this.defaultConfig;
        this.allItem = new __WEBPACK_IMPORTED_MODULE_3__treeview_item__["a" /* TreeviewItem */]({ text: 'All', value: undefined });
        this.createHeaderTemplateContext();
    }
    Object.defineProperty(TreeviewComponent.prototype, "hasFilterItems", {
        get: function () {
            return !__WEBPACK_IMPORTED_MODULE_1_lodash__["isNil"](this.filterItems) && this.filterItems.length > 0;
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
        if (!__WEBPACK_IMPORTED_MODULE_1_lodash__["isNil"](itemsSimpleChange)) {
            if (!__WEBPACK_IMPORTED_MODULE_1_lodash__["isNil"](this.items)) {
                this.updateFilterItems();
                this.updateCollapsedAll();
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
        if (this.allItem.checked !== checked) {
            var allItemChecked = true;
            for (var i = 0; i < this.filterItems.length; i++) {
                if (!this.filterItems[i].checked) {
                    allItemChecked = false;
                    break;
                }
            }
            if (this.allItem.checked !== allItemChecked) {
                this.allItem.checked = allItemChecked;
            }
        }
        if (item instanceof FilterTreeviewItem) {
            item.updateRefChecked();
        }
        this.raiseSelectedChange();
    };
    TreeviewComponent.prototype.raiseSelectedChange = function () {
        this.checkedItems = this.getCheckedItems();
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
    TreeviewComponent.prototype.getCheckedItems = function () {
        var checkedItems = [];
        if (!__WEBPACK_IMPORTED_MODULE_1_lodash__["isNil"](this.items)) {
            for (var i = 0; i < this.items.length; i++) {
                checkedItems = __WEBPACK_IMPORTED_MODULE_1_lodash__["concat"](checkedItems, this.items[i].getCheckedItems());
            }
        }
        return checkedItems;
    };
    TreeviewComponent.prototype.updateFilterItems = function () {
        var _this = this;
        if (this.filterText !== '') {
            var filterItems_1 = [];
            var filterText_1 = this.filterText.toLowerCase();
            this.items.forEach(function (item) {
                var newItem = _this.filterItem(item, filterText_1);
                if (!__WEBPACK_IMPORTED_MODULE_1_lodash__["isNil"](newItem)) {
                    filterItems_1.push(newItem);
                }
            });
            this.filterItems = filterItems_1;
        }
        else {
            this.filterItems = this.items;
        }
        this.updateCheckedAll();
    };
    TreeviewComponent.prototype.filterItem = function (item, filterText) {
        var _this = this;
        var isMatch = __WEBPACK_IMPORTED_MODULE_1_lodash__["includes"](item.text.toLowerCase(), filterText);
        if (isMatch) {
            return item;
        }
        else {
            if (!__WEBPACK_IMPORTED_MODULE_1_lodash__["isNil"](item.children)) {
                var children_1 = [];
                item.children.forEach(function (child) {
                    var newChild = _this.filterItem(child, filterText);
                    if (!__WEBPACK_IMPORTED_MODULE_1_lodash__["isNil"](newChild)) {
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
    TreeviewComponent.prototype.updateCheckedAll = function () {
        var hasItemUnchecked = false;
        for (var i = 0; i < this.filterItems.length; i++) {
            if (!this.filterItems[i].checked) {
                hasItemUnchecked = true;
                break;
            }
        }
        if (this.allItem.checked === hasItemUnchecked) {
            this.allItem.checked = !hasItemUnchecked;
        }
    };
    TreeviewComponent.prototype.updateCollapsedAll = function () {
        var hasItemExpanded = false;
        for (var i = 0; i < this.filterItems.length; i++) {
            if (!this.filterItems[i].collapsed) {
                hasItemExpanded = true;
                break;
            }
        }
        this.allItem.collapsed = !hasItemExpanded;
    };
    TreeviewComponent.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: 'ngx-treeview',
                    template: "\n      <ng-template #defaultItemTemplate let-item=\"item\" let-onCollapseExpand=\"onCollapseExpand\" let-onCheckedChange=\"onCheckedChange\">\n          <div class=\"form-check\">\n              <i *ngIf=\"item.children\" (click)=\"onCollapseExpand()\" aria-hidden=\"true\" class=\"fa\" [class.fa-caret-right]=\"item.collapsed\"\n                  [class.fa-caret-down]=\"!item.collapsed\"></i>\n              <label class=\"form-check-label\">\n                  <input type=\"checkbox\" class=\"form-check-input\"\n                      [(ngModel)]=\"item.checked\" (ngModelChange)=\"onCheckedChange()\" [disabled]=\"item.disabled\" />\n                  {{item.text}}\n              </label>\n          </div>\n      </ng-template>\n      <ng-template #defaultHeaderTemplate let-config=\"config\" let-item=\"item\" let-onCollapseExpand=\"onCollapseExpand\"\n          let-onCheckedChange=\"onCheckedChange\" let-onFilterTextChange=\"onFilterTextChange\">\n          <div *ngIf=\"config.hasFilter\" class=\"row\">\n              <div class=\"col-12\">\n                  <input class=\"form-control\" type=\"text\" [placeholder]=\"i18n.filterPlaceholder()\" [(ngModel)]=\"filterText\" (ngModelChange)=\"onFilterTextChange($event)\"\n                  />\n              </div>\n          </div>\n          <div *ngIf=\"hasFilterItems\">\n              <div *ngIf=\"config.hasAllCheckBox || config.hasCollapseExpand\" class=\"row\">\n                  <div class=\"col-12\" [class.row-margin]=\"config.hasFilter && (config.hasAllCheckBox || config.hasCollapseExpand)\">\n                      <label *ngIf=\"config.hasAllCheckBox\" class=\"form-check-label label-item-all\">\n                          <input type=\"checkbox\" class=\"form-check-input\"\n                              [(ngModel)]=\"item.checked\" (ngModelChange)=\"onCheckedChange($event)\" />\n                              {{i18n.allCheckboxText()}}\n                      </label>\n                      <label *ngIf=\"config.hasCollapseExpand\" class=\"pull-right label-collapse-expand\" (click)=\"onCollapseExpand()\">\n                          <i [title]=\"i18n.tooltipCollapseExpand(item.collapsed)\" aria-hidden=\"true\"\n                              class=\"fa\" [class.fa-expand]=\"item.collapsed\" [class.fa-compress]=\"!item.collapsed\"></i>\n                      </label>\n                  </div>\n              </div>\n              <div *ngIf=\"config.hasDivider\" class=\"divider\"></div>\n          </div>\n      </ng-template>\n      <div class=\"treeview-header\">\n          <ng-template [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\" [ngOutletContext]=\"headerTemplateContext\">\n          </ng-template>\n      </div>\n      <div [ngSwitch]=\"hasFilterItems\">\n          <div *ngSwitchCase=\"true\" class=\"treeview-container\" [style.max-height.px]=\"maxHeight\">\n              <ngx-treeview-item *ngFor=\"let item of filterItems\" [item]=\"item\" [template]=\"itemTemplate || defaultItemTemplate\" (checkedChange)=\"onItemCheckedChange(item, $event)\">\n              </ngx-treeview-item>\n          </div>\n          <div *ngSwitchCase=\"false\" class=\"treeview-text\">\n              {{i18n.filterNoItemsFoundText()}}\n          </div>\n      </div>\n    ",
                    styles: ["\n      :host /deep/ .fa {\n        margin-right: .2rem;\n        width: .5rem;\n        cursor: pointer;\n      }\n\n      :host /deep/ .treeview-header .row .row-margin {\n        margin-top: .3rem;\n      }\n\n      :host /deep/ .treeview-header .row .row-margin .label-collapse-expand {\n        margin-bottom: 0;\n        padding: 0 .3rem;\n        cursor: pointer;\n      }\n\n      :host /deep/ .treeview-header .divider {\n        height: 1px;\n        margin: 0.5rem 0;\n        overflow: hidden;\n        background: #000;\n      }\n\n      .treeview-container {\n        overflow-x: hidden;\n        overflow-y: auto;\n        padding-right: 18px;\n      }\n\n      .treeview-text {\n        padding: .3rem 0;\n        white-space: nowrap;\n      }\n    "]
                },] },
    ];
    /** @nocollapse */
    TreeviewComponent.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_2__treeview_i18n__["a" /* TreeviewI18n */], },
        { type: __WEBPACK_IMPORTED_MODULE_4__treeview_config__["a" /* TreeviewConfig */], },
        { type: __WEBPACK_IMPORTED_MODULE_5__treeview_event_parser__["a" /* TreeviewEventParser */], },
    ]; };
    TreeviewComponent.propDecorators = {
        'headerTemplate': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'itemTemplate': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'items': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'config': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'selectedChange': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    };
    return TreeviewComponent;
}());



/***/ }),

/***/ "../../../../../dist/lib/src/treeview.module.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dropdown_directive__ = __webpack_require__("../../../../../dist/lib/src/dropdown.directive.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dropdown_toggle_directive__ = __webpack_require__("../../../../../dist/lib/src/dropdown-toggle.directive.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dropdown_treeview_component__ = __webpack_require__("../../../../../dist/lib/src/dropdown-treeview.component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__treeview_component__ = __webpack_require__("../../../../../dist/lib/src/treeview.component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__treeview_item_component__ = __webpack_require__("../../../../../dist/lib/src/treeview-item.component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__treeview_pipe__ = __webpack_require__("../../../../../dist/lib/src/treeview.pipe.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__treeview_i18n__ = __webpack_require__("../../../../../dist/lib/src/treeview-i18n.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__treeview_config__ = __webpack_require__("../../../../../dist/lib/src/treeview-config.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__treeview_event_parser__ = __webpack_require__("../../../../../dist/lib/src/treeview-event-parser.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeviewModule; });












var TreeviewModule = (function () {
    function TreeviewModule() {
    }
    TreeviewModule.forRoot = function () {
        return {
            ngModule: TreeviewModule,
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__treeview_config__["a" /* TreeviewConfig */],
                { provide: __WEBPACK_IMPORTED_MODULE_9__treeview_i18n__["a" /* TreeviewI18n */], useClass: __WEBPACK_IMPORTED_MODULE_9__treeview_i18n__["b" /* TreeviewI18nDefault */] },
                { provide: __WEBPACK_IMPORTED_MODULE_11__treeview_event_parser__["a" /* TreeviewEventParser */], useClass: __WEBPACK_IMPORTED_MODULE_11__treeview_event_parser__["b" /* DefaultTreeviewEventParser */] }
            ]
        };
    };
    TreeviewModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                    imports: [
                        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
                        __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"]
                    ],
                    declarations: [
                        __WEBPACK_IMPORTED_MODULE_6__treeview_component__["a" /* TreeviewComponent */],
                        __WEBPACK_IMPORTED_MODULE_7__treeview_item_component__["a" /* TreeviewItemComponent */],
                        __WEBPACK_IMPORTED_MODULE_8__treeview_pipe__["a" /* TreeviewPipe */],
                        __WEBPACK_IMPORTED_MODULE_3__dropdown_directive__["a" /* DropdownDirective */],
                        __WEBPACK_IMPORTED_MODULE_4__dropdown_toggle_directive__["a" /* DropdownToggleDirective */],
                        __WEBPACK_IMPORTED_MODULE_5__dropdown_treeview_component__["a" /* DropdownTreeviewComponent */]
                    ], exports: [
                        __WEBPACK_IMPORTED_MODULE_6__treeview_component__["a" /* TreeviewComponent */],
                        __WEBPACK_IMPORTED_MODULE_8__treeview_pipe__["a" /* TreeviewPipe */],
                        __WEBPACK_IMPORTED_MODULE_5__dropdown_treeview_component__["a" /* DropdownTreeviewComponent */]
                    ]
                },] },
    ];
    /** @nocollapse */
    TreeviewModule.ctorParameters = function () { return []; };
    return TreeviewModule;
}());



/***/ }),

/***/ "../../../../../dist/lib/src/treeview.pipe.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__treeview_item__ = __webpack_require__("../../../../../dist/lib/src/treeview-item.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeviewPipe; });



var TreeviewPipe = (function () {
    function TreeviewPipe() {
    }
    TreeviewPipe.prototype.transform = function (objects, textField) {
        if (__WEBPACK_IMPORTED_MODULE_1_lodash__["isNil"](objects)) {
            return undefined;
        }
        return objects.map(function (object) { return new __WEBPACK_IMPORTED_MODULE_2__treeview_item__["a" /* TreeviewItem */]({ text: object[textField], value: object }); });
    };
    TreeviewPipe.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"], args: [{
                    name: 'ngxTreeview'
                },] },
    ];
    /** @nocollapse */
    TreeviewPipe.ctorParameters = function () { return []; };
    return TreeviewPipe;
}());



/***/ }),

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/demo/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n    <h2>Angular ngx-treeview component demo</h2>\r\n    <hr />\r\n    <br />\r\n    <div class=\"row\">\r\n        <label for=\"item-category\" class=\"col-3 col-form-label\">Language</label>\r\n        <div class=\"col-9\">\r\n            <select class=\"form-control\" [(ngModel)]=\"language\">\r\n                <option value=\"en\">\r\n                    English\r\n                </option>\r\n                <option value=\"vi\">\r\n                    Tiếng Việt\r\n                </option>\r\n            </select>\r\n        </div>\r\n    </div>\r\n    <hr>\r\n    <h4>Example 1: Primary features</h4>\r\n    <ngx-book></ngx-book>\r\n    <br />\r\n    <h4>Example 2: Performance with 1000 items</h4>\r\n    <ngx-room></ngx-room>\r\n    <br />\r\n    <h4>Example 3: Using pipe & i18n</h4>\r\n    <ngx-city></ngx-city>\r\n    <br />\r\n    <h4>Example 4: dropdown-treeview-select Component</h4>\r\n    <ngx-dropdown-treeview-select-demo></ngx-dropdown-treeview-select-demo>\r\n    <br />\r\n    <h4>Example 5: Tree-view without drop-down & custom TreeviewConfig & custom TreeviewEventParser & custom template</h4>\r\n    <ngx-product></ngx-product>\r\n</div>"

/***/ }),

/***/ "../../../../../src/demo/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var ngx_treeview_1 = __webpack_require__("../../../../../dist/lib/src/index.js");
var i18n_1 = __webpack_require__("../../../../../src/demo/i18n.ts");
var default_treeview_i18n_1 = __webpack_require__("../../../../../src/demo/default-treeview-i18n.ts");
var AppComponent = (function () {
    function AppComponent(i18n) {
        this.i18n = i18n;
    }
    Object.defineProperty(AppComponent.prototype, "language", {
        get: function () {
            return this.i18n.language;
        },
        set: function (language) {
            this.i18n.language = language;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent = __decorate([
        core_1.Component({
            selector: 'ngx-app',
            template: __webpack_require__("../../../../../src/demo/app.component.html"),
            providers: [
                { provide: ngx_treeview_1.TreeviewI18n, useClass: default_treeview_i18n_1.DefaultTreeviewI18n }
            ]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof i18n_1.I18n !== "undefined" && i18n_1.I18n) === "function" && _a || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/demo/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var platform_browser_1 = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var lib_1 = __webpack_require__("../../../../../src/lib/index.ts");
var app_component_1 = __webpack_require__("../../../../../src/demo/app.component.ts");
var book_component_1 = __webpack_require__("../../../../../src/demo/book/book.component.ts");
var city_component_1 = __webpack_require__("../../../../../src/demo/city/city.component.ts");
var room_component_1 = __webpack_require__("../../../../../src/demo/room/room.component.ts");
var product_component_1 = __webpack_require__("../../../../../src/demo/product/product.component.ts");
var dropdown_treeview_select_1 = __webpack_require__("../../../../../src/demo/dropdown-treeview-select/index.ts");
var i18n_1 = __webpack_require__("../../../../../src/demo/i18n.ts");
var disabled_on_selector_directive_1 = __webpack_require__("../../../../../src/demo/disabled-on-selector.directive.ts");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                lib_1.TreeviewModule.forRoot(),
                dropdown_treeview_select_1.DropdownTreeviewSelectModule
            ],
            declarations: [
                book_component_1.BookComponent,
                city_component_1.CityComponent,
                room_component_1.RoomComponent,
                product_component_1.ProductComponent,
                app_component_1.AppComponent,
                disabled_on_selector_directive_1.DisabledOnSelectorDirective
            ],
            providers: [
                i18n_1.I18n
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/demo/book/book.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-12\">\r\n        <div class=\"alert alert-success\" role=\"alert\">\r\n            Selected books: {{values}}\r\n        </div>\r\n    </div>\r\n    <div class=\"col-12\">\r\n        <div class=\"form-check\">\r\n            <label class=\"form-check-label\">\r\n                <input class=\"form-check-input\" type=\"checkbox\" [(ngModel)]=\"enableButton\">\r\n                Check/uncheck to enable/disable dropdown button\r\n            </label>\r\n        </div>\r\n        <div class=\"form-group row\">\r\n            <label for=\"book-category\" class=\"col-3 col-form-label\">Book category</label>\r\n            <div class=\"col-9\">\r\n                <div class=\"d-inline-block\">\r\n                    <ngx-dropdown-treeview [config]=\"config\" [items]=\"items\" (selectedChange)=\"values = $event\"\r\n                        [disabled]=\"!enableButton\" [ngxDisabledOnSelector]=\"'button.dropdown-toggle'\">\r\n                    </ngx-dropdown-treeview>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/demo/book/book.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var lib_1 = __webpack_require__("../../../../../src/lib/index.ts");
var book_service_1 = __webpack_require__("../../../../../src/demo/book/book.service.ts");
var BookComponent = (function () {
    function BookComponent(service) {
        this.service = service;
        this.enableButton = true;
        this.config = lib_1.TreeviewConfig.create({
            hasAllCheckBox: true,
            hasFilter: true,
            hasCollapseExpand: true,
            maxHeight: 500
        });
    }
    BookComponent.prototype.ngOnInit = function () {
        this.items = this.service.getBooks();
    };
    BookComponent = __decorate([
        core_1.Component({
            selector: 'ngx-book',
            template: __webpack_require__("../../../../../src/demo/book/book.component.html"),
            providers: [
                book_service_1.BookService
            ]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof book_service_1.BookService !== "undefined" && book_service_1.BookService) === "function" && _a || Object])
    ], BookComponent);
    return BookComponent;
    var _a;
}());
exports.BookComponent = BookComponent;
//# sourceMappingURL=book.component.js.map

/***/ }),

/***/ "../../../../../src/demo/book/book.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = __webpack_require__("../../../../../src/lib/index.ts");
var BookService = (function () {
    function BookService() {
    }
    BookService.prototype.getBooks = function () {
        var childrenCategory = new lib_1.TreeviewItem({
            text: 'Children', value: 1, collapsed: true, children: [
                { text: 'Baby 3-5', value: 11 },
                { text: 'Baby 6-8', value: 12 },
                { text: 'Baby 9-12', value: 13 }
            ]
        });
        var itCategory = new lib_1.TreeviewItem({
            text: 'IT', value: 9, children: [
                {
                    text: 'Programming', value: 91, children: [{
                            text: 'Frontend', value: 911, children: [
                                { text: 'Angular 1', value: 9111 },
                                { text: 'Angular 2', value: 9112 },
                                { text: 'ReactJS', value: 9113 }
                            ]
                        }, {
                            text: 'Backend', value: 912, children: [
                                { text: 'C#', value: 9121 },
                                { text: 'Java', value: 9122 },
                                { text: 'Python', value: 9123, checked: false }
                            ]
                        }]
                },
                {
                    text: 'Networking', value: 92, children: [
                        { text: 'Internet', value: 921 },
                        { text: 'Security', value: 922 }
                    ]
                }
            ]
        });
        var teenCategory = new lib_1.TreeviewItem({
            text: 'Teen', value: 2, collapsed: true, disabled: true, children: [
                { text: 'Adventure', value: 21 },
                { text: 'Science', value: 22 }
            ]
        });
        var othersCategory = new lib_1.TreeviewItem({ text: 'Others', value: 3, collapsed: true, disabled: true });
        return [childrenCategory, itCategory, teenCategory, othersCategory];
    };
    return BookService;
}());
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map

/***/ }),

/***/ "../../../../../src/demo/city/city-treeview-i18n.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var i18n_1 = __webpack_require__("../../../../../src/demo/i18n.ts");
var default_treeview_i18n_1 = __webpack_require__("../../../../../src/demo/default-treeview-i18n.ts");
var CityTreeviewI18n = (function (_super) {
    __extends(CityTreeviewI18n, _super);
    function CityTreeviewI18n(i18n) {
        var _this = _super.call(this, i18n) || this;
        _this.i18n = i18n;
        return _this;
    }
    CityTreeviewI18n.prototype.getText = function (checkededItems, isAll) {
        if (isAll) {
            return this.i18n.language === 'en' ? 'All cities' : 'Tất cả thành phố';
        }
        switch (checkededItems.length) {
            case 0:
                return this.i18n.language === 'en' ? 'Select cities' : 'Chọn thành phố';
            case 1:
                return checkededItems[0].text;
            default:
                return this.i18n.language === 'en'
                    ? checkededItems.length + " cities selected"
                    : checkededItems.length + " th\u00E0nh ph\u1ED1 \u0111\u00E3 \u0111\u01B0\u1EE3c ch\u1ECDn";
        }
    };
    CityTreeviewI18n.prototype.allCheckboxText = function () {
        return _super.prototype.allCheckboxText.call(this);
    };
    CityTreeviewI18n.prototype.filterPlaceholder = function () {
        return _super.prototype.filterPlaceholder.call(this);
    };
    CityTreeviewI18n.prototype.filterNoItemsFoundText = function () {
        if (this.i18n.language === 'en') {
            return 'No cities found';
        }
        else {
            return 'Không có thành phố nào được tìm thấy';
        }
    };
    CityTreeviewI18n.prototype.tooltipCollapseExpand = function (isCollapse) {
        return _super.prototype.tooltipCollapseExpand.call(this, isCollapse);
    };
    CityTreeviewI18n = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof i18n_1.I18n !== "undefined" && i18n_1.I18n) === "function" && _a || Object])
    ], CityTreeviewI18n);
    return CityTreeviewI18n;
    var _a;
}(default_treeview_i18n_1.DefaultTreeviewI18n));
exports.CityTreeviewI18n = CityTreeviewI18n;
//# sourceMappingURL=city-treeview-i18n.js.map

/***/ }),

/***/ "../../../../../src/demo/city/city.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-12\">\r\n        <div class=\"alert alert-success\" role=\"alert\">\r\n            Selected cities: {{values | json}}\r\n        </div>\r\n    </div>\r\n    <div class=\"col-12\">\r\n        <div class=\"form-group row\">\r\n            <label for=\"city-category\" class=\"col-3 col-form-label\">City category</label>\r\n            <div class=\"col-9\">\r\n                <ngx-dropdown-treeview [items]=\"cities | ngxTreeview:'name'\" (selectedChange)=\"values = $event\">\r\n                </ngx-dropdown-treeview>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/demo/city/city.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var lib_1 = __webpack_require__("../../../../../src/lib/index.ts");
var city_service_1 = __webpack_require__("../../../../../src/demo/city/city.service.ts");
var city_treeview_i18n_1 = __webpack_require__("../../../../../src/demo/city/city-treeview-i18n.ts");
var CityComponent = (function () {
    function CityComponent(service) {
        this.service = service;
    }
    CityComponent.prototype.ngOnInit = function () {
        this.cities = this.service.getCities();
    };
    CityComponent = __decorate([
        core_1.Component({
            selector: 'ngx-city',
            template: __webpack_require__("../../../../../src/demo/city/city.component.html"),
            providers: [
                city_service_1.CityService,
                { provide: lib_1.TreeviewI18n, useClass: city_treeview_i18n_1.CityTreeviewI18n }
            ]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof city_service_1.CityService !== "undefined" && city_service_1.CityService) === "function" && _a || Object])
    ], CityComponent);
    return CityComponent;
    var _a;
}());
exports.CityComponent = CityComponent;
//# sourceMappingURL=city.component.js.map

/***/ }),

/***/ "../../../../../src/demo/city/city.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var CityService = (function () {
    function CityService() {
    }
    CityService.prototype.getCities = function () {
        return [
            {
                id: 1,
                name: 'Ho Chi Minh',
                postCode: 700000
            },
            {
                id: 2,
                name: 'Ha Noi',
                postCode: 100000
            },
            {
                id: 3,
                name: 'Da Nang',
                postCode: 550000
            }
        ];
    };
    CityService = __decorate([
        core_1.Injectable()
    ], CityService);
    return CityService;
}());
exports.CityService = CityService;
//# sourceMappingURL=city.service.js.map

/***/ }),

/***/ "../../../../../src/demo/default-treeview-i18n.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var lib_1 = __webpack_require__("../../../../../src/lib/index.ts");
var i18n_1 = __webpack_require__("../../../../../src/demo/i18n.ts");
var DefaultTreeviewI18n = (function (_super) {
    __extends(DefaultTreeviewI18n, _super);
    function DefaultTreeviewI18n(i18n) {
        var _this = _super.call(this) || this;
        _this.i18n = i18n;
        return _this;
    }
    DefaultTreeviewI18n.prototype.getText = function (checkededItems, isAll) {
        if (isAll) {
            return this.i18n.language === 'en' ? 'All' : 'Tất cả';
        }
        switch (checkededItems.length) {
            case 0:
                return this.i18n.language === 'en' ? 'Select options' : 'Chọn mục';
            case 1:
                return checkededItems[0].text;
            default:
                return this.i18n.language === 'en'
                    ? checkededItems.length + " options selected"
                    : checkededItems.length + " m\u1EE5c \u0111\u00E3 \u0111\u01B0\u1EE3c ch\u1ECDn";
        }
    };
    DefaultTreeviewI18n.prototype.allCheckboxText = function () {
        if (this.i18n.language === 'en') {
            return 'All';
        }
        else {
            return 'Tất cả';
        }
    };
    DefaultTreeviewI18n.prototype.filterPlaceholder = function () {
        if (this.i18n.language === 'en') {
            return 'Filter';
        }
        else {
            return 'Lọc';
        }
    };
    DefaultTreeviewI18n.prototype.filterNoItemsFoundText = function () {
        if (this.i18n.language === 'en') {
            return 'No items found';
        }
        else {
            return 'Không có mục nào được tìm thấy';
        }
    };
    DefaultTreeviewI18n.prototype.tooltipCollapseExpand = function (isCollapse) {
        return isCollapse
            ? this.i18n.language === 'en' ? 'Expand' : 'Mở rộng'
            : this.i18n.language === 'en' ? 'Collapse' : 'Thu lại';
    };
    DefaultTreeviewI18n = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof i18n_1.I18n !== "undefined" && i18n_1.I18n) === "function" && _a || Object])
    ], DefaultTreeviewI18n);
    return DefaultTreeviewI18n;
    var _a;
}(lib_1.TreeviewI18n));
exports.DefaultTreeviewI18n = DefaultTreeviewI18n;
//# sourceMappingURL=default-treeview-i18n.js.map

/***/ }),

/***/ "../../../../../src/demo/disabled-on-selector.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var DisabledOnSelectorDirective = (function () {
    function DisabledOnSelectorDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.nativeElement = el.nativeElement;
    }
    DisabledOnSelectorDirective.prototype.ngOnChanges = function () {
        var elements = this.nativeElement.querySelectorAll(this.ngxDisabledOnSelector);
        for (var i = 0; i < elements.length; i++) {
            this.renderer.setElementProperty(elements[i], 'disabled', this.disabled);
        }
    };
    __decorate([
        core_1.Input('ngxDisabledOnSelector'),
        __metadata("design:type", String)
    ], DisabledOnSelectorDirective.prototype, "ngxDisabledOnSelector", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DisabledOnSelectorDirective.prototype, "disabled", void 0);
    DisabledOnSelectorDirective = __decorate([
        core_1.Directive({
            selector: '[ngxDisabledOnSelector]'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _a || Object, typeof (_b = typeof core_1.Renderer !== "undefined" && core_1.Renderer) === "function" && _b || Object])
    ], DisabledOnSelectorDirective);
    return DisabledOnSelectorDirective;
    var _a, _b;
}());
exports.DisabledOnSelectorDirective = DisabledOnSelectorDirective;
//# sourceMappingURL=disabled-on-selector.directive.js.map

/***/ }),

/***/ "../../../../../src/demo/dropdown-treeview-select/dropdown-treeview-select-demo.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-6\">\r\n        <div class=\"form-group\">\r\n            <div class=\"d-inline-block\">\r\n                <ngx-dropdown-treeview-select [config]=\"config\" [items]=\"items\" (selectedChange)=\"selectedItem = $event\">\r\n                </ngx-dropdown-treeview-select>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-6\">\r\n        <div class=\"alert alert-success\" role=\"alert\">\r\n            Selected book: {{ selectedItem | json }}\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/demo/dropdown-treeview-select/dropdown-treeview-select-demo.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var lib_1 = __webpack_require__("../../../../../src/lib/index.ts");
var book_service_1 = __webpack_require__("../../../../../src/demo/book/book.service.ts");
var DropdownTreeviewSelectDemoComponent = (function () {
    function DropdownTreeviewSelectDemoComponent(bookService) {
        this.bookService = bookService;
        this.config = lib_1.TreeviewConfig.create({
            hasFilter: true,
            hasCollapseExpand: true
        });
    }
    DropdownTreeviewSelectDemoComponent.prototype.ngOnInit = function () {
        this.items = this.bookService.getBooks();
    };
    DropdownTreeviewSelectDemoComponent = __decorate([
        core_1.Component({
            selector: 'ngx-dropdown-treeview-select-demo',
            template: __webpack_require__("../../../../../src/demo/dropdown-treeview-select/dropdown-treeview-select-demo.component.html"),
            providers: [
                book_service_1.BookService
            ]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof book_service_1.BookService !== "undefined" && book_service_1.BookService) === "function" && _a || Object])
    ], DropdownTreeviewSelectDemoComponent);
    return DropdownTreeviewSelectDemoComponent;
    var _a;
}());
exports.DropdownTreeviewSelectDemoComponent = DropdownTreeviewSelectDemoComponent;
//# sourceMappingURL=dropdown-treeview-select-demo.component.js.map

/***/ }),

/***/ "../../../../../src/demo/dropdown-treeview-select/dropdown-treeview-select.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template #itemTemplate let-item=\"item\" let-onCollapseExpand=\"onCollapseExpand\" let-onCheckedChange=\"onCheckedChange\">\r\n    <div class=\"form-check\">\r\n        <i *ngIf=\"item.children\" (click)=\"onCollapseExpand()\" aria-hidden=\"true\" class=\"fa\" [class.fa-caret-right]=\"item.collapsed\"\r\n            [class.fa-caret-down]=\"!item.collapsed\"></i>\r\n        <label (click)=\"select(item)\">{{ item.text }}</label>\r\n    </div>\r\n</ng-template>\r\n<ng-template #headerTemplate let-config=\"config\" let-item=\"item\" let-onCollapseExpand=\"onCollapseExpand\" let-onCheckedChange=\"onCheckedChange\"\r\n    let-onFilterTextChange=\"onFilterTextChange\">\r\n    <div *ngIf=\"config.hasFilter\" class=\"row\">\r\n        <div class=\"col-12\">\r\n            <input class=\"form-control\" type=\"text\" [placeholder]=\"i18n.filterPlaceholder()\" [(ngModel)]=\"filterText\" (ngModelChange)=\"onFilterTextChange($event)\"\r\n            />\r\n        </div>\r\n    </div>\r\n    <div *ngIf=\"config.hasAllCheckBox || config.hasCollapseExpand\" class=\"row\">\r\n        <div class=\"col-12\" [class.row-margin]=\"config.hasFilter && (config.hasAllCheckBox || config.hasCollapseExpand)\">\r\n            <label *ngIf=\"config.hasAllCheckBox\" (click)=\"select(item)\">\r\n                {{ i18n.allCheckboxText() }}\r\n            </label>\r\n            <label *ngIf=\"config.hasCollapseExpand\" class=\"pull-right label-collapse-expand\" (click)=\"onCollapseExpand()\">\r\n                <i [title]=\"i18n.tooltipCollapseExpand(item.collapsed)\" aria-hidden=\"true\"\r\n                    class=\"fa\" [class.fa-expand]=\"item.collapsed\" [class.fa-compress]=\"!item.collapsed\"></i>\r\n            </label>\r\n        </div>\r\n    </div>\r\n    <div class=\"divider\"></div>\r\n</ng-template>\r\n<ngx-dropdown-treeview [config]=\"config\" [headerTemplate]=\"headerTemplate\" [items]=\"items\" [itemTemplate]=\"itemTemplate\">\r\n</ngx-dropdown-treeview>"

/***/ }),

/***/ "../../../../../src/demo/dropdown-treeview-select/dropdown-treeview-select.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "label {\n  margin-bottom: 0;\n  cursor: pointer; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/demo/dropdown-treeview-select/dropdown-treeview-select.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var lib_1 = __webpack_require__("../../../../../src/lib/index.ts");
var TreeviewDropdownSelectI18n = (function (_super) {
    __extends(TreeviewDropdownSelectI18n, _super);
    function TreeviewDropdownSelectI18n() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TreeviewDropdownSelectI18n.prototype, "selectedItem", {
        get: function () {
            return this._selectedItem;
        },
        set: function (value) {
            if (value && value.children === undefined) {
                this._selectedItem = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    TreeviewDropdownSelectI18n.prototype.getText = function (checkededItems, isAll) {
        return this._selectedItem ? this._selectedItem.text : 'All';
    };
    return TreeviewDropdownSelectI18n;
}(lib_1.TreeviewI18nDefault));
exports.TreeviewDropdownSelectI18n = TreeviewDropdownSelectI18n;
var DropdownTreeviewSelectComponent = (function () {
    function DropdownTreeviewSelectComponent(i18n) {
        this.i18n = i18n;
        this.selectedChange = new core_1.EventEmitter();
        this.treeviewDropdownSelectI18n = i18n;
    }
    DropdownTreeviewSelectComponent.prototype.select = function (item) {
        if (item.children === undefined) {
            this.treeviewDropdownSelectI18n.selectedItem = item;
            this.selectedChange.emit(item);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", typeof (_a = typeof lib_1.TreeviewConfig !== "undefined" && lib_1.TreeviewConfig) === "function" && _a || Object)
    ], DropdownTreeviewSelectComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DropdownTreeviewSelectComponent.prototype, "items", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DropdownTreeviewSelectComponent.prototype, "selectedChange", void 0);
    DropdownTreeviewSelectComponent = __decorate([
        core_1.Component({
            selector: 'ngx-dropdown-treeview-select',
            template: __webpack_require__("../../../../../src/demo/dropdown-treeview-select/dropdown-treeview-select.component.html"),
            styles: [__webpack_require__("../../../../../src/demo/dropdown-treeview-select/dropdown-treeview-select.component.scss")],
            providers: [
                { provide: lib_1.TreeviewI18n, useClass: TreeviewDropdownSelectI18n }
            ]
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof lib_1.TreeviewI18n !== "undefined" && lib_1.TreeviewI18n) === "function" && _b || Object])
    ], DropdownTreeviewSelectComponent);
    return DropdownTreeviewSelectComponent;
    var _a, _b;
}());
exports.DropdownTreeviewSelectComponent = DropdownTreeviewSelectComponent;
//# sourceMappingURL=dropdown-treeview-select.component.js.map

/***/ }),

/***/ "../../../../../src/demo/dropdown-treeview-select/dropdown-treeview-select.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var common_1 = __webpack_require__("../../../common/@angular/common.es5.js");
var lib_1 = __webpack_require__("../../../../../src/lib/index.ts");
var dropdown_treeview_select_component_1 = __webpack_require__("../../../../../src/demo/dropdown-treeview-select/dropdown-treeview-select.component.ts");
var dropdown_treeview_select_demo_component_1 = __webpack_require__("../../../../../src/demo/dropdown-treeview-select/dropdown-treeview-select-demo.component.ts");
var DropdownTreeviewSelectModule = (function () {
    function DropdownTreeviewSelectModule() {
    }
    DropdownTreeviewSelectModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                common_1.CommonModule,
                lib_1.TreeviewModule.forRoot()
            ],
            declarations: [
                dropdown_treeview_select_component_1.DropdownTreeviewSelectComponent,
                dropdown_treeview_select_demo_component_1.DropdownTreeviewSelectDemoComponent
            ],
            exports: [
                dropdown_treeview_select_demo_component_1.DropdownTreeviewSelectDemoComponent
            ]
        })
    ], DropdownTreeviewSelectModule);
    return DropdownTreeviewSelectModule;
}());
exports.DropdownTreeviewSelectModule = DropdownTreeviewSelectModule;
//# sourceMappingURL=dropdown-treeview-select.module.js.map

/***/ }),

/***/ "../../../../../src/demo/dropdown-treeview-select/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../../../../../src/demo/dropdown-treeview-select/dropdown-treeview-select.module.ts"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/demo/i18n.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var I18n = (function () {
    function I18n() {
        this.language = 'en';
    }
    I18n = __decorate([
        core_1.Injectable()
    ], I18n);
    return I18n;
}());
exports.I18n = I18n;
//# sourceMappingURL=i18n.js.map

/***/ }),

/***/ "../../../../../src/demo/product/product.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template #itemTemplate let-item=\"item\" let-onCollapseExpand=\"onCollapseExpand\" let-onCheckedChange=\"onCheckedChange\">\r\n    <div class=\"form-check\">\r\n        <i *ngIf=\"item.children\" (click)=\"onCollapseExpand()\" aria-hidden=\"true\" class=\"fa\" [class.fa-caret-right]=\"item.collapsed\"\r\n            [class.fa-caret-down]=\"!item.collapsed\"></i>\r\n        <label class=\"form-check-label\">\r\n            <input type=\"checkbox\" class=\"form-check-input\"\r\n                [(ngModel)]=\"item.checked\" (ngModelChange)=\"onCheckedChange()\" [disabled]=\"item.disabled\" />\r\n            {{item.text}}\r\n        </label>\r\n        <label class=\"form-check-label\">\r\n            <i class=\"fa fa-trash\" aria-hidden=\"true\" title=\"Remove\" (click)=\"removeItem(item)\"></i>\r\n        </label>\r\n    </div>\r\n</ng-template>\r\n<div class=\"row\">\r\n    <div class=\"col-6\">\r\n        <div class=\"form-group\">\r\n            <div class=\"d-inline-block\">\r\n                <ngx-treeview [items]=\"items\" [itemTemplate]=\"itemTemplate\" (selectedChange)=\"onSelectedChange($event)\">\r\n                </ngx-treeview>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-6\">\r\n        <div class=\"alert alert-success\" role=\"alert\">\r\n            Selected products:\r\n            <div *ngFor=\"let row of rows\">{{row}}</div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/demo/product/product.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var _ = __webpack_require__("../../../../lodash/lodash.js");
var lib_1 = __webpack_require__("../../../../../src/lib/index.ts");
var product_service_1 = __webpack_require__("../../../../../src/demo/product/product.service.ts");
var ProductTreeviewConfig = (function (_super) {
    __extends(ProductTreeviewConfig, _super);
    function ProductTreeviewConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hasAllCheckBox = true;
        _this.hasFilter = true;
        _this.hasCollapseExpand = false;
        _this.maxHeight = 500;
        return _this;
    }
    ProductTreeviewConfig = __decorate([
        core_1.Injectable()
    ], ProductTreeviewConfig);
    return ProductTreeviewConfig;
}(lib_1.TreeviewConfig));
exports.ProductTreeviewConfig = ProductTreeviewConfig;
var ProductComponent = (function () {
    function ProductComponent(service) {
        this.service = service;
    }
    ProductComponent.prototype.ngOnInit = function () {
        this.items = this.service.getProducts();
    };
    ProductComponent.prototype.onSelectedChange = function (downlineItems) {
        var _this = this;
        this.rows = [];
        downlineItems.forEach(function (downlineItem) {
            var item = downlineItem.item;
            var value = item.value;
            var texts = [item.text];
            var parent = downlineItem.parent;
            while (!_.isNil(parent)) {
                texts.push(parent.item.text);
                parent = parent.parent;
            }
            var reverseTexts = _.reverse(texts);
            var row = reverseTexts.join(' -> ') + " : " + value;
            _this.rows.push(row);
        });
    };
    ProductComponent.prototype.removeItem = function (item) {
        var isRemoved = false;
        for (var i = 0; i < this.items.length; i++) {
            isRemoved = lib_1.TreeviewHelper.removeItem(this.items[0], item);
            if (isRemoved) {
                break;
            }
        }
        if (isRemoved) {
            this.treeviewComponent.raiseSelectedChange();
        }
    };
    __decorate([
        core_1.ViewChild(lib_1.TreeviewComponent),
        __metadata("design:type", typeof (_a = typeof lib_1.TreeviewComponent !== "undefined" && lib_1.TreeviewComponent) === "function" && _a || Object)
    ], ProductComponent.prototype, "treeviewComponent", void 0);
    ProductComponent = __decorate([
        core_1.Component({
            selector: 'ngx-product',
            template: __webpack_require__("../../../../../src/demo/product/product.component.html"),
            providers: [
                product_service_1.ProductService,
                { provide: lib_1.TreeviewEventParser, useClass: lib_1.OrderDownlineTreeviewEventParser },
                { provide: lib_1.TreeviewConfig, useClass: ProductTreeviewConfig }
            ]
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" && _b || Object])
    ], ProductComponent);
    return ProductComponent;
    var _a, _b;
}());
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map

/***/ }),

/***/ "../../../../../src/demo/product/product.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = __webpack_require__("../../../../../src/lib/index.ts");
var ProductService = (function () {
    function ProductService() {
    }
    ProductService.prototype.getProducts = function () {
        var fruitCategory = new lib_1.TreeviewItem({
            text: 'Fruit', value: 1, children: [
                { text: 'Apple', value: 11 },
                { text: 'Mango', value: 12 }
            ]
        });
        var vegetableCategory = new lib_1.TreeviewItem({
            text: 'Vegetable', value: 2, children: [
                { text: 'Salad', value: 21 },
                { text: 'Potato', value: 22 }
            ]
        });
        vegetableCategory.children.push(new lib_1.TreeviewItem({ text: 'Mushroom', value: 23, checked: false }));
        vegetableCategory.correctChecked(); // need this to make 'Vegetable' node to change checked value from true to false
        return [fruitCategory, vegetableCategory];
    };
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map

/***/ }),

/***/ "../../../../../src/demo/room/room.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-12\">\r\n        <div class=\"alert alert-success\" role=\"alert\">\r\n            Selected rooms: {{values}}\r\n        </div>\r\n    </div>\r\n    <div class=\"col-12\">\r\n        <div class=\"form-group row\">\r\n            <label for=\"item-category\" class=\"col-3 col-form-label\">Item category</label>\r\n            <div class=\"col-9\">\r\n                <ngx-dropdown-treeview [config]=\"config\" [items]=\"items\" (selectedChange)=\"values = $event\">\r\n                </ngx-dropdown-treeview>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/demo/room/room.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var lib_1 = __webpack_require__("../../../../../src/lib/index.ts");
var room_service_1 = __webpack_require__("../../../../../src/demo/room/room.service.ts");
var RoomComponent = (function () {
    function RoomComponent(service) {
        this.service = service;
        this.config = lib_1.TreeviewConfig.create({
            hasAllCheckBox: true,
            hasFilter: true,
            hasCollapseExpand: false,
            maxHeight: 500
        });
    }
    RoomComponent.prototype.ngOnInit = function () {
        this.items = this.service.getRooms();
    };
    RoomComponent = __decorate([
        core_1.Component({
            selector: 'ngx-room',
            template: __webpack_require__("../../../../../src/demo/room/room.component.html"),
            providers: [
                room_service_1.RoomService
            ]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof room_service_1.RoomService !== "undefined" && room_service_1.RoomService) === "function" && _a || Object])
    ], RoomComponent);
    return RoomComponent;
    var _a;
}());
exports.RoomComponent = RoomComponent;
//# sourceMappingURL=room.component.js.map

/***/ }),

/***/ "../../../../../src/demo/room/room.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var lib_1 = __webpack_require__("../../../../../src/lib/index.ts");
var RoomService = (function () {
    function RoomService() {
    }
    RoomService.prototype.getRooms = function () {
        var items = [];
        for (var i = 0; i < 1000; i++) {
            var value = i === 0 ? { name: "" + i } : i;
            var checked = i % 100 === 0;
            var item = new lib_1.TreeviewItem({ text: "Room " + i, value: value, checked: checked });
            items.push(item);
        }
        ;
        return items;
    };
    RoomService = __decorate([
        core_1.Injectable()
    ], RoomService);
    return RoomService;
}());
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/lib/dropdown-toggle.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var dropdown_directive_1 = __webpack_require__("../../../../../src/lib/dropdown.directive.ts");
var DropdownToggleDirective = (function () {
    function DropdownToggleDirective(dropdown, elementRef) {
        this.dropdown = dropdown;
        dropdown.toggleElement = elementRef.nativeElement;
    }
    Object.defineProperty(DropdownToggleDirective.prototype, "ariaExpanded", {
        get: function () {
            return this.dropdown.isOpen;
        },
        enumerable: true,
        configurable: true
    });
    DropdownToggleDirective.prototype.onClick = function () {
        this.dropdown.toggle();
    };
    __decorate([
        core_1.HostBinding('attr.aria-expanded'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], DropdownToggleDirective.prototype, "ariaExpanded", null);
    __decorate([
        core_1.HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DropdownToggleDirective.prototype, "onClick", null);
    DropdownToggleDirective = __decorate([
        core_1.Directive({
            selector: '[ngxDropdownToggle]',
            // tslint:disable-next-line:use-host-property-decorator
            host: {
                'class': 'dropdown-toggle',
                'aria-haspopup': 'true'
            }
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof dropdown_directive_1.DropdownDirective !== "undefined" && dropdown_directive_1.DropdownDirective) === "function" && _a || Object, typeof (_b = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _b || Object])
    ], DropdownToggleDirective);
    return DropdownToggleDirective;
    var _a, _b;
}());
exports.DropdownToggleDirective = DropdownToggleDirective;
//# sourceMappingURL=dropdown-toggle.directive.js.map

/***/ }),

/***/ "../../../../../src/lib/dropdown-treeview.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"dropdown\" ngxDropdown>\r\n    <button class=\"btn btn-secondary\" type=\"button\" role=\"button\" ngxDropdownToggle>\r\n        {{getText()}}\r\n    </button>\r\n    <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\" (click)=\"$event.stopPropagation()\">\r\n        <div class=\"dropdown-container\">\r\n            <ngx-treeview [config]=\"config\" [headerTemplate]=\"headerTemplate\" [items]=\"items\" [itemTemplate]=\"itemTemplate\" (selectedChange)=\"onSelectedChange($event)\">\r\n            </ngx-treeview>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/lib/dropdown-treeview.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".dropdown {\n  width: 100%;\n  display: inline-block; }\n  .dropdown button {\n    width: 100%;\n    margin-right: .9rem;\n    text-align: left; }\n    .dropdown button::after {\n      position: absolute;\n      right: .6rem;\n      margin-top: .6rem; }\n  .dropdown .dropdown-menu .dropdown-container {\n    padding: 0 .6rem; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/lib/dropdown-treeview.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var treeview_i18n_1 = __webpack_require__("../../../../../src/lib/treeview-i18n.ts");
var treeview_config_1 = __webpack_require__("../../../../../src/lib/treeview-config.ts");
var treeview_component_1 = __webpack_require__("../../../../../src/lib/treeview.component.ts");
var DropdownTreeviewComponent = (function () {
    function DropdownTreeviewComponent(i18n, defaultConfig) {
        this.i18n = i18n;
        this.defaultConfig = defaultConfig;
        this.selectedChange = new core_1.EventEmitter(true);
        this.config = this.defaultConfig;
    }
    DropdownTreeviewComponent.prototype.getText = function () {
        return this.i18n.getText(this.treeviewComponent.checkedItems, this.treeviewComponent.allItem.checked);
    };
    DropdownTreeviewComponent.prototype.onSelectedChange = function (values) {
        this.selectedChange.emit(values);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", typeof (_a = typeof core_1.TemplateRef !== "undefined" && core_1.TemplateRef) === "function" && _a || Object)
    ], DropdownTreeviewComponent.prototype, "headerTemplate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", typeof (_b = typeof core_1.TemplateRef !== "undefined" && core_1.TemplateRef) === "function" && _b || Object)
    ], DropdownTreeviewComponent.prototype, "itemTemplate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DropdownTreeviewComponent.prototype, "items", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", typeof (_c = typeof treeview_config_1.TreeviewConfig !== "undefined" && treeview_config_1.TreeviewConfig) === "function" && _c || Object)
    ], DropdownTreeviewComponent.prototype, "config", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DropdownTreeviewComponent.prototype, "selectedChange", void 0);
    __decorate([
        core_1.ViewChild(treeview_component_1.TreeviewComponent),
        __metadata("design:type", typeof (_d = typeof treeview_component_1.TreeviewComponent !== "undefined" && treeview_component_1.TreeviewComponent) === "function" && _d || Object)
    ], DropdownTreeviewComponent.prototype, "treeviewComponent", void 0);
    DropdownTreeviewComponent = __decorate([
        core_1.Component({
            selector: 'ngx-dropdown-treeview',
            template: __webpack_require__("../../../../../src/lib/dropdown-treeview.component.html"),
            styles: [__webpack_require__("../../../../../src/lib/dropdown-treeview.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_e = typeof treeview_i18n_1.TreeviewI18n !== "undefined" && treeview_i18n_1.TreeviewI18n) === "function" && _e || Object, typeof (_f = typeof treeview_config_1.TreeviewConfig !== "undefined" && treeview_config_1.TreeviewConfig) === "function" && _f || Object])
    ], DropdownTreeviewComponent);
    return DropdownTreeviewComponent;
    var _a, _b, _c, _d, _e, _f;
}());
exports.DropdownTreeviewComponent = DropdownTreeviewComponent;
//# sourceMappingURL=dropdown-treeview.component.js.map

/***/ }),

/***/ "../../../../../src/lib/dropdown.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var _ = __webpack_require__("../../../../lodash/lodash.js");
var DropdownDirective = (function () {
    function DropdownDirective() {
        // tslint:disable-next-line:no-input-rename
        this.internalOpen = false;
        this.openChange = new core_1.EventEmitter();
    }
    Object.defineProperty(DropdownDirective.prototype, "isOpen", {
        get: function () {
            return this.internalOpen;
        },
        enumerable: true,
        configurable: true
    });
    DropdownDirective.prototype.onKeyupEsc = function () {
        this.close();
    };
    DropdownDirective.prototype.onDocumentClick = function (event) {
        if (event.button !== 2 && !this.isEventFromToggle(event)) {
            this.close();
        }
    };
    DropdownDirective.prototype.open = function () {
        if (!this.internalOpen) {
            this.internalOpen = true;
            this.openChange.emit(true);
        }
    };
    DropdownDirective.prototype.close = function () {
        if (this.internalOpen) {
            this.internalOpen = false;
            this.openChange.emit(false);
        }
    };
    DropdownDirective.prototype.toggle = function () {
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    };
    DropdownDirective.prototype.isEventFromToggle = function (event) {
        return !_.isNil(this.toggleElement) && this.toggleElement.contains(event.target);
    };
    __decorate([
        core_1.Input('open'),
        __metadata("design:type", Object)
    ], DropdownDirective.prototype, "internalOpen", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DropdownDirective.prototype, "openChange", void 0);
    __decorate([
        core_1.HostBinding('class.show'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], DropdownDirective.prototype, "isOpen", null);
    __decorate([
        core_1.HostListener('keyup.esc'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DropdownDirective.prototype, "onKeyupEsc", null);
    __decorate([
        core_1.HostListener('document:click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DropdownDirective.prototype, "onDocumentClick", null);
    DropdownDirective = __decorate([
        core_1.Directive({
            selector: '[ngxDropdown]',
            exportAs: 'ngxDropdown'
        })
    ], DropdownDirective);
    return DropdownDirective;
}());
exports.DropdownDirective = DropdownDirective;
//# sourceMappingURL=dropdown.directive.js.map

/***/ }),

/***/ "../../../../../src/lib/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../../../../../src/lib/treeview.module.ts"));
__export(__webpack_require__("../../../../../src/lib/treeview.component.ts"));
__export(__webpack_require__("../../../../../src/lib/treeview.pipe.ts"));
__export(__webpack_require__("../../../../../src/lib/treeview-item.ts"));
__export(__webpack_require__("../../../../../src/lib/treeview-config.ts"));
__export(__webpack_require__("../../../../../src/lib/treeview-i18n.ts"));
__export(__webpack_require__("../../../../../src/lib/treeview-event-parser.ts"));
__export(__webpack_require__("../../../../../src/lib/treeview-item-template-context.ts"));
__export(__webpack_require__("../../../../../src/lib/treeview-helper.ts"));
__export(__webpack_require__("../../../../../src/lib/dropdown-treeview.component.ts"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/lib/treeview-config.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var TreeviewConfig = (function () {
    function TreeviewConfig() {
        this.hasAllCheckBox = true;
        this.hasFilter = false;
        this.hasCollapseExpand = false;
        this.maxHeight = 500;
    }
    TreeviewConfig_1 = TreeviewConfig;
    Object.defineProperty(TreeviewConfig.prototype, "hasDivider", {
        get: function () {
            return this.hasFilter || this.hasAllCheckBox || this.hasCollapseExpand;
        },
        enumerable: true,
        configurable: true
    });
    TreeviewConfig.create = function (fields) {
        var config = new TreeviewConfig_1();
        Object.assign(config, fields);
        return config;
    };
    TreeviewConfig = TreeviewConfig_1 = __decorate([
        core_1.Injectable()
    ], TreeviewConfig);
    return TreeviewConfig;
    var TreeviewConfig_1;
}());
exports.TreeviewConfig = TreeviewConfig;
//# sourceMappingURL=treeview-config.js.map

/***/ }),

/***/ "../../../../../src/lib/treeview-event-parser.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var _ = __webpack_require__("../../../../lodash/lodash.js");
var TreeviewEventParser = (function () {
    function TreeviewEventParser() {
    }
    TreeviewEventParser = __decorate([
        core_1.Injectable()
    ], TreeviewEventParser);
    return TreeviewEventParser;
}());
exports.TreeviewEventParser = TreeviewEventParser;
var DefaultTreeviewEventParser = (function (_super) {
    __extends(DefaultTreeviewEventParser, _super);
    function DefaultTreeviewEventParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultTreeviewEventParser.prototype.getSelectedChange = function (component) {
        var checkedItems = component.checkedItems;
        if (!_.isNil(checkedItems)) {
            return checkedItems.map(function (item) { return item.value; });
        }
        return [];
    };
    DefaultTreeviewEventParser = __decorate([
        core_1.Injectable()
    ], DefaultTreeviewEventParser);
    return DefaultTreeviewEventParser;
}(TreeviewEventParser));
exports.DefaultTreeviewEventParser = DefaultTreeviewEventParser;
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
    DownlineTreeviewEventParser = __decorate([
        core_1.Injectable()
    ], DownlineTreeviewEventParser);
    return DownlineTreeviewEventParser;
}(TreeviewEventParser));
exports.DownlineTreeviewEventParser = DownlineTreeviewEventParser;
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
    OrderDownlineTreeviewEventParser = __decorate([
        core_1.Injectable()
    ], OrderDownlineTreeviewEventParser);
    return OrderDownlineTreeviewEventParser;
}(TreeviewEventParser));
exports.OrderDownlineTreeviewEventParser = OrderDownlineTreeviewEventParser;
//# sourceMappingURL=treeview-event-parser.js.map

/***/ }),

/***/ "../../../../../src/lib/treeview-helper.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__("../../../../lodash/lodash.js");
exports.TreeviewHelper = {
    findParent: findParent,
    removeItem: removeItem
};
function findParent(root, item) {
    if (_.isNil(root) || _.isNil(root.children)) {
        return undefined;
    }
    for (var i = 0; i < root.children.length; i++) {
        var child = root.children[i];
        if (child === item) {
            return root;
        }
        else {
            var parent = findParent(child, item);
            if (parent) {
                return parent;
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

/***/ }),

/***/ "../../../../../src/lib/treeview-i18n.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var TreeviewI18n = (function () {
    function TreeviewI18n() {
    }
    TreeviewI18n = __decorate([
        core_1.Injectable()
    ], TreeviewI18n);
    return TreeviewI18n;
}());
exports.TreeviewI18n = TreeviewI18n;
var TreeviewI18nDefault = (function (_super) {
    __extends(TreeviewI18nDefault, _super);
    function TreeviewI18nDefault() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TreeviewI18nDefault.prototype.getText = function (checkededItems, isAll) {
        if (isAll) {
            return 'All';
        }
        switch (checkededItems.length) {
            case 0:
                return 'Select options';
            case 1:
                return checkededItems[0].text;
            default:
                return checkededItems.length + " options selected";
        }
    };
    TreeviewI18nDefault.prototype.allCheckboxText = function () {
        return 'All';
    };
    TreeviewI18nDefault.prototype.filterPlaceholder = function () {
        return 'Filter';
    };
    TreeviewI18nDefault.prototype.filterNoItemsFoundText = function () {
        return 'No items found';
    };
    TreeviewI18nDefault.prototype.tooltipCollapseExpand = function (isCollapse) {
        return isCollapse ? 'Expand' : 'Collapse';
    };
    TreeviewI18nDefault = __decorate([
        core_1.Injectable()
    ], TreeviewI18nDefault);
    return TreeviewI18nDefault;
}(TreeviewI18n));
exports.TreeviewI18nDefault = TreeviewI18nDefault;
//# sourceMappingURL=treeview-i18n.js.map

/***/ }),

/***/ "../../../../../src/lib/treeview-item-template-context.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=treeview-item-template-context.js.map

/***/ }),

/***/ "../../../../../src/lib/treeview-item.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"item\" class=\"treeview-item\">\r\n    <ng-template [ngTemplateOutlet]=\"template\" [ngOutletContext]=\"{item: item, onCollapseExpand: onCollapseExpand, onCheckedChange: onCheckedChange}\">\r\n    </ng-template>\r\n    <div *ngIf=\"!item.collapsed\">\r\n        <ngx-treeview-item *ngFor=\"let child of item.children\" [item]=\"child\" [template]=\"template\" (checkedChange)=\"onChildCheckedChange(child, $event)\">\r\n        </ngx-treeview-item>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/lib/treeview-item.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  display: block; }\n  :host .treeview-item {\n    white-space: nowrap; }\n    :host .treeview-item .treeview-item {\n      margin-left: 2rem; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/lib/treeview-item.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var _ = __webpack_require__("../../../../lodash/lodash.js");
var treeview_item_1 = __webpack_require__("../../../../../src/lib/treeview-item.ts");
var TreeviewItemComponent = (function () {
    function TreeviewItemComponent() {
        var _this = this;
        this.checkedChange = new core_1.EventEmitter();
        this.onCollapseExpand = function () {
            _this.item.collapsed = !_this.item.collapsed;
        };
        this.onCheckedChange = function () {
            var checked = _this.item.checked;
            if (!_.isNil(_this.item.children)) {
                _this.item.children.forEach(function (child) { return child.setCheckedRecursive(checked); });
            }
            _this.checkedChange.emit(checked);
        };
    }
    TreeviewItemComponent.prototype.onChildCheckedChange = function (child, checked) {
        if (this.item.checked !== checked) {
            var itemChecked = true;
            for (var i = 0; i < this.item.children.length; i++) {
                if (!this.item.children[i].checked) {
                    itemChecked = false;
                    break;
                }
            }
            this.item.checked = itemChecked;
        }
        this.checkedChange.emit(checked);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", typeof (_a = typeof core_1.TemplateRef !== "undefined" && core_1.TemplateRef) === "function" && _a || Object)
    ], TreeviewItemComponent.prototype, "template", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", typeof (_b = typeof treeview_item_1.TreeviewItem !== "undefined" && treeview_item_1.TreeviewItem) === "function" && _b || Object)
    ], TreeviewItemComponent.prototype, "item", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TreeviewItemComponent.prototype, "checkedChange", void 0);
    TreeviewItemComponent = __decorate([
        core_1.Component({
            selector: 'ngx-treeview-item',
            template: __webpack_require__("../../../../../src/lib/treeview-item.component.html"),
            styles: [__webpack_require__("../../../../../src/lib/treeview-item.component.scss")]
        })
    ], TreeviewItemComponent);
    return TreeviewItemComponent;
    var _a, _b;
}());
exports.TreeviewItemComponent = TreeviewItemComponent;
//# sourceMappingURL=treeview-item.component.js.map

/***/ }),

/***/ "../../../../../src/lib/treeview-item.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__("../../../../lodash/lodash.js");
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
        if (this.disabled === true && this.checked === false) {
            throw new Error('A disabled item must be checked');
        }
        if (!_.isNil(item.children)) {
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
                    var checked_1 = true;
                    this.internalChildren.forEach(function (child) {
                        if (child.checked === false) {
                            checked_1 = false;
                        }
                    });
                    this.internalChecked = checked_1;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    TreeviewItem.prototype.getCheckedItems = function () {
        var checkedItems = [];
        if (_.isNil(this.internalChildren)) {
            if (this.internalChecked) {
                checkedItems.push(this);
            }
        }
        else {
            var childCount = this.internalChildren.length;
            for (var i = 0; i < childCount; i++) {
                checkedItems = _.concat(checkedItems, this.internalChildren[i].getCheckedItems());
            }
        }
        return checkedItems;
    };
    TreeviewItem.prototype.correctChecked = function () {
        this.internalChecked = this.getCorrectChecked();
    };
    TreeviewItem.prototype.getCorrectChecked = function () {
        var checked = this.checked;
        if (!_.isNil(this.internalChildren)) {
            checked = true;
            var childCount = this.internalChildren.length;
            for (var i = 0; i < childCount; i++) {
                var child = this.internalChildren[i];
                child.internalChecked = child.getCorrectChecked();
                if (!child.internalChecked) {
                    checked = false;
                    break;
                }
            }
        }
        return checked;
    };
    return TreeviewItem;
}());
exports.TreeviewItem = TreeviewItem;
//# sourceMappingURL=treeview-item.js.map

/***/ }),

/***/ "../../../../../src/lib/treeview.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template #defaultItemTemplate let-item=\"item\" let-onCollapseExpand=\"onCollapseExpand\" let-onCheckedChange=\"onCheckedChange\">\r\n    <div class=\"form-check\">\r\n        <i *ngIf=\"item.children\" (click)=\"onCollapseExpand()\" aria-hidden=\"true\" class=\"fa\" [class.fa-caret-right]=\"item.collapsed\"\r\n            [class.fa-caret-down]=\"!item.collapsed\"></i>\r\n        <label class=\"form-check-label\">\r\n            <input type=\"checkbox\" class=\"form-check-input\"\r\n                [(ngModel)]=\"item.checked\" (ngModelChange)=\"onCheckedChange()\" [disabled]=\"item.disabled\" />\r\n            {{item.text}}\r\n        </label>\r\n    </div>\r\n</ng-template>\r\n<ng-template #defaultHeaderTemplate let-config=\"config\" let-item=\"item\" let-onCollapseExpand=\"onCollapseExpand\"\r\n    let-onCheckedChange=\"onCheckedChange\" let-onFilterTextChange=\"onFilterTextChange\">\r\n    <div *ngIf=\"config.hasFilter\" class=\"row\">\r\n        <div class=\"col-12\">\r\n            <input class=\"form-control\" type=\"text\" [placeholder]=\"i18n.filterPlaceholder()\" [(ngModel)]=\"filterText\" (ngModelChange)=\"onFilterTextChange($event)\"\r\n            />\r\n        </div>\r\n    </div>\r\n    <div *ngIf=\"hasFilterItems\">\r\n        <div *ngIf=\"config.hasAllCheckBox || config.hasCollapseExpand\" class=\"row\">\r\n            <div class=\"col-12\" [class.row-margin]=\"config.hasFilter && (config.hasAllCheckBox || config.hasCollapseExpand)\">\r\n                <label *ngIf=\"config.hasAllCheckBox\" class=\"form-check-label label-item-all\">\r\n                    <input type=\"checkbox\" class=\"form-check-input\"\r\n                        [(ngModel)]=\"item.checked\" (ngModelChange)=\"onCheckedChange($event)\" />\r\n                        {{i18n.allCheckboxText()}}\r\n                </label>\r\n                <label *ngIf=\"config.hasCollapseExpand\" class=\"pull-right label-collapse-expand\" (click)=\"onCollapseExpand()\">\r\n                    <i [title]=\"i18n.tooltipCollapseExpand(item.collapsed)\" aria-hidden=\"true\"\r\n                        class=\"fa\" [class.fa-expand]=\"item.collapsed\" [class.fa-compress]=\"!item.collapsed\"></i>\r\n                </label>\r\n            </div>\r\n        </div>\r\n        <div *ngIf=\"config.hasDivider\" class=\"divider\"></div>\r\n    </div>\r\n</ng-template>\r\n<div class=\"treeview-header\">\r\n    <ng-template [ngTemplateOutlet]=\"headerTemplate || defaultHeaderTemplate\" [ngOutletContext]=\"headerTemplateContext\">\r\n    </ng-template>\r\n</div>\r\n<div [ngSwitch]=\"hasFilterItems\">\r\n    <div *ngSwitchCase=\"true\" class=\"treeview-container\" [style.max-height.px]=\"maxHeight\">\r\n        <ngx-treeview-item *ngFor=\"let item of filterItems\" [item]=\"item\" [template]=\"itemTemplate || defaultItemTemplate\" (checkedChange)=\"onItemCheckedChange(item, $event)\">\r\n        </ngx-treeview-item>\r\n    </div>\r\n    <div *ngSwitchCase=\"false\" class=\"treeview-text\">\r\n        {{i18n.filterNoItemsFoundText()}}\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/lib/treeview.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host /deep/ .fa {\n  margin-right: .2rem;\n  width: .5rem;\n  cursor: pointer; }\n\n:host /deep/ .treeview-header .row .row-margin {\n  margin-top: .3rem; }\n  :host /deep/ .treeview-header .row .row-margin .label-collapse-expand {\n    margin-bottom: 0;\n    padding: 0 .3rem;\n    cursor: pointer; }\n\n:host /deep/ .treeview-header .divider {\n  height: 1px;\n  margin: 0.5rem 0;\n  overflow: hidden;\n  background: #000; }\n\n.treeview-container {\n  overflow-x: hidden;\n  overflow-y: auto;\n  padding-right: 18px; }\n\n.treeview-text {\n  padding: .3rem 0;\n  white-space: nowrap; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/lib/treeview.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var _ = __webpack_require__("../../../../lodash/lodash.js");
var treeview_i18n_1 = __webpack_require__("../../../../../src/lib/treeview-i18n.ts");
var treeview_item_1 = __webpack_require__("../../../../../src/lib/treeview-item.ts");
var treeview_config_1 = __webpack_require__("../../../../../src/lib/treeview-config.ts");
var treeview_event_parser_1 = __webpack_require__("../../../../../src/lib/treeview-event-parser.ts");
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
        for (var i = 0; i < this.refItem.children.length; i++) {
            var refChild = this.refItem.children[i];
            if (!refChild.checked) {
                refChecked = false;
                break;
            }
        }
        this.refItem.checked = refChecked;
    };
    return FilterTreeviewItem;
}(treeview_item_1.TreeviewItem));
var TreeviewComponent = (function () {
    function TreeviewComponent(i18n, defaultConfig, eventParser) {
        this.i18n = i18n;
        this.defaultConfig = defaultConfig;
        this.eventParser = eventParser;
        this.selectedChange = new core_1.EventEmitter();
        this.filterText = '';
        this.config = this.defaultConfig;
        this.allItem = new treeview_item_1.TreeviewItem({ text: 'All', value: undefined });
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
                this.updateCollapsedAll();
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
        if (this.allItem.checked !== checked) {
            var allItemChecked = true;
            for (var i = 0; i < this.filterItems.length; i++) {
                if (!this.filterItems[i].checked) {
                    allItemChecked = false;
                    break;
                }
            }
            if (this.allItem.checked !== allItemChecked) {
                this.allItem.checked = allItemChecked;
            }
        }
        if (item instanceof FilterTreeviewItem) {
            item.updateRefChecked();
        }
        this.raiseSelectedChange();
    };
    TreeviewComponent.prototype.raiseSelectedChange = function () {
        this.checkedItems = this.getCheckedItems();
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
    TreeviewComponent.prototype.getCheckedItems = function () {
        var checkedItems = [];
        if (!_.isNil(this.items)) {
            for (var i = 0; i < this.items.length; i++) {
                checkedItems = _.concat(checkedItems, this.items[i].getCheckedItems());
            }
        }
        return checkedItems;
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
        this.updateCheckedAll();
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
    TreeviewComponent.prototype.updateCheckedAll = function () {
        var hasItemUnchecked = false;
        for (var i = 0; i < this.filterItems.length; i++) {
            if (!this.filterItems[i].checked) {
                hasItemUnchecked = true;
                break;
            }
        }
        if (this.allItem.checked === hasItemUnchecked) {
            this.allItem.checked = !hasItemUnchecked;
        }
    };
    TreeviewComponent.prototype.updateCollapsedAll = function () {
        var hasItemExpanded = false;
        for (var i = 0; i < this.filterItems.length; i++) {
            if (!this.filterItems[i].collapsed) {
                hasItemExpanded = true;
                break;
            }
        }
        this.allItem.collapsed = !hasItemExpanded;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", typeof (_a = typeof core_1.TemplateRef !== "undefined" && core_1.TemplateRef) === "function" && _a || Object)
    ], TreeviewComponent.prototype, "headerTemplate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", typeof (_b = typeof core_1.TemplateRef !== "undefined" && core_1.TemplateRef) === "function" && _b || Object)
    ], TreeviewComponent.prototype, "itemTemplate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TreeviewComponent.prototype, "items", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", typeof (_c = typeof treeview_config_1.TreeviewConfig !== "undefined" && treeview_config_1.TreeviewConfig) === "function" && _c || Object)
    ], TreeviewComponent.prototype, "config", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TreeviewComponent.prototype, "selectedChange", void 0);
    TreeviewComponent = __decorate([
        core_1.Component({
            selector: 'ngx-treeview',
            template: __webpack_require__("../../../../../src/lib/treeview.component.html"),
            styles: [__webpack_require__("../../../../../src/lib/treeview.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_d = typeof treeview_i18n_1.TreeviewI18n !== "undefined" && treeview_i18n_1.TreeviewI18n) === "function" && _d || Object, typeof (_e = typeof treeview_config_1.TreeviewConfig !== "undefined" && treeview_config_1.TreeviewConfig) === "function" && _e || Object, typeof (_f = typeof treeview_event_parser_1.TreeviewEventParser !== "undefined" && treeview_event_parser_1.TreeviewEventParser) === "function" && _f || Object])
    ], TreeviewComponent);
    return TreeviewComponent;
    var _a, _b, _c, _d, _e, _f;
}());
exports.TreeviewComponent = TreeviewComponent;
//# sourceMappingURL=treeview.component.js.map

/***/ }),

/***/ "../../../../../src/lib/treeview.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var common_1 = __webpack_require__("../../../common/@angular/common.es5.js");
var dropdown_directive_1 = __webpack_require__("../../../../../src/lib/dropdown.directive.ts");
var dropdown_toggle_directive_1 = __webpack_require__("../../../../../src/lib/dropdown-toggle.directive.ts");
var dropdown_treeview_component_1 = __webpack_require__("../../../../../src/lib/dropdown-treeview.component.ts");
var treeview_component_1 = __webpack_require__("../../../../../src/lib/treeview.component.ts");
var treeview_item_component_1 = __webpack_require__("../../../../../src/lib/treeview-item.component.ts");
var treeview_pipe_1 = __webpack_require__("../../../../../src/lib/treeview.pipe.ts");
var treeview_i18n_1 = __webpack_require__("../../../../../src/lib/treeview-i18n.ts");
var treeview_config_1 = __webpack_require__("../../../../../src/lib/treeview-config.ts");
var treeview_event_parser_1 = __webpack_require__("../../../../../src/lib/treeview-event-parser.ts");
var TreeviewModule = (function () {
    function TreeviewModule() {
    }
    TreeviewModule_1 = TreeviewModule;
    TreeviewModule.forRoot = function () {
        return {
            ngModule: TreeviewModule_1,
            providers: [
                treeview_config_1.TreeviewConfig,
                { provide: treeview_i18n_1.TreeviewI18n, useClass: treeview_i18n_1.TreeviewI18nDefault },
                { provide: treeview_event_parser_1.TreeviewEventParser, useClass: treeview_event_parser_1.DefaultTreeviewEventParser }
            ]
        };
    };
    TreeviewModule = TreeviewModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                common_1.CommonModule
            ],
            declarations: [
                treeview_component_1.TreeviewComponent,
                treeview_item_component_1.TreeviewItemComponent,
                treeview_pipe_1.TreeviewPipe,
                dropdown_directive_1.DropdownDirective,
                dropdown_toggle_directive_1.DropdownToggleDirective,
                dropdown_treeview_component_1.DropdownTreeviewComponent
            ], exports: [
                treeview_component_1.TreeviewComponent,
                treeview_pipe_1.TreeviewPipe,
                dropdown_treeview_component_1.DropdownTreeviewComponent
            ]
        })
    ], TreeviewModule);
    return TreeviewModule;
    var TreeviewModule_1;
}());
exports.TreeviewModule = TreeviewModule;
//# sourceMappingURL=treeview.module.js.map

/***/ }),

/***/ "../../../../../src/lib/treeview.pipe.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var _ = __webpack_require__("../../../../lodash/lodash.js");
var treeview_item_1 = __webpack_require__("../../../../../src/lib/treeview-item.ts");
var TreeviewPipe = (function () {
    function TreeviewPipe() {
    }
    TreeviewPipe.prototype.transform = function (objects, textField) {
        if (_.isNil(objects)) {
            return undefined;
        }
        return objects.map(function (object) { return new treeview_item_1.TreeviewItem({ text: object[textField], value: object }); });
    };
    TreeviewPipe = __decorate([
        core_1.Pipe({
            name: 'ngxTreeview'
        })
    ], TreeviewPipe);
    return TreeviewPipe;
}());
exports.TreeviewPipe = TreeviewPipe;
//# sourceMappingURL=treeview.pipe.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var platform_browser_dynamic_1 = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
var app_module_1 = __webpack_require__("../../../../../src/demo/app.module.ts");
var environment_1 = __webpack_require__("../../../../../src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[1]);
//# sourceMappingURL=main.bundle.js.map