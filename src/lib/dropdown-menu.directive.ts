import { Directive } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';

@Directive({
    selector: '[ngxDropdownMenu]',
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        '[class.dropdown-menu]': 'true',
        '[class.show]': 'dropdown.isOpen'
    }
})
export class DropdownMenuDirective {
    constructor(
        public dropdown: DropdownDirective
    ) { }
}
