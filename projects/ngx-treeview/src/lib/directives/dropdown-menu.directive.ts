import { Directive, HostBinding } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';

@Directive({
  selector: '[ngxDropdownMenu]',
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
