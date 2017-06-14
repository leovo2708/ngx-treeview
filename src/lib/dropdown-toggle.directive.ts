import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';

@Directive({
    selector: '[ngxDropdownToggle]',
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        'class': 'dropdown-toggle',
        'aria-haspopup': 'true'
    }
})
export class DropdownToggleDirective {
    @HostBinding('attr.aria-expanded') get ariaExpanded(): boolean {
        return this.dropdown.isOpen;
    }

    constructor(
        private dropdown: DropdownDirective,
        elementRef: ElementRef
    ) {
        dropdown.toggleElement = elementRef.nativeElement;
    }

    @HostListener('click')
    onClick() {
        this.dropdown.toggle();
    }
}
