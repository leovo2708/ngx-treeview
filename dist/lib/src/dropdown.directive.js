import { Directive, Input, Output, HostBinding, HostListener, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
var DropdownDirective = (function () {
    function DropdownDirective() {
        // tslint:disable-next-line:no-input-rename
        this.internalOpen = false;
        this.openChange = new EventEmitter();
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
    return DropdownDirective;
}());
export { DropdownDirective };
DropdownDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxDropdown]',
                exportAs: 'ngxDropdown'
            },] },
];
/** @nocollapse */
DropdownDirective.ctorParameters = function () { return []; };
DropdownDirective.propDecorators = {
    'internalOpen': [{ type: Input, args: ['open',] },],
    'openChange': [{ type: Output },],
    'isOpen': [{ type: HostBinding, args: ['class.show',] },],
    'onKeyupEsc': [{ type: HostListener, args: ['keyup.esc',] },],
    'onDocumentClick': [{ type: HostListener, args: ['document:click', ['$event'],] },],
};
//# sourceMappingURL=dropdown.directive.js.map