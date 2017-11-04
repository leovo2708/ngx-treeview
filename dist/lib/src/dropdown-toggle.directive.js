import { Directive, ElementRef } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
var DropdownToggleDirective = (function () {
    function DropdownToggleDirective(dropdown, elementRef) {
        this.dropdown = dropdown;
        dropdown.toggleElement = elementRef.nativeElement;
    }
    return DropdownToggleDirective;
}());
export { DropdownToggleDirective };
DropdownToggleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxDropdownToggle]',
                // tslint:disable-next-line:use-host-property-decorator
                host: {
                    'class': 'dropdown-toggle',
                    'aria-haspopup': 'true',
                    '[attr.aria-expanded]': 'dropdown.isOpen',
                    '(click)': 'dropdown.toggle()'
                }
            },] },
];
/** @nocollapse */
DropdownToggleDirective.ctorParameters = function () { return [
    { type: DropdownDirective, },
    { type: ElementRef, },
]; };
//# sourceMappingURL=dropdown-toggle.directive.js.map