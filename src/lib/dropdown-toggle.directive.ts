import { Directive, ElementRef } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';

@Directive({
    selector: '[ngxDropdownToggle]',
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        'class': 'dropdown-toggle',
        'aria-haspopup': 'true',
        '[attr.aria-expanded]': 'dropdown.isOpen',
        '(click)': 'dropdown.toggle()'
    }
})
export class DropdownToggleDirective {
    constructor(
        public dropdown: DropdownDirective,
        elementRef: ElementRef
    ) {
        dropdown.toggleElement = elementRef.nativeElement;
    }
}
