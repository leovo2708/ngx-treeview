import { Directive } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
var DropdownMenuDirective = (function () {
    function DropdownMenuDirective(dropdown) {
        this.dropdown = dropdown;
    }
    return DropdownMenuDirective;
}());
export { DropdownMenuDirective };
DropdownMenuDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxDropdownMenu]',
                // tslint:disable-next-line:use-host-property-decorator
                host: {
                    '[class.dropdown-menu]': 'true',
                    '[class.show]': 'dropdown.isOpen'
                }
            },] },
];
/** @nocollapse */
DropdownMenuDirective.ctorParameters = function () { return [
    { type: DropdownDirective, },
]; };
//# sourceMappingURL=dropdown-menu.directive.js.map