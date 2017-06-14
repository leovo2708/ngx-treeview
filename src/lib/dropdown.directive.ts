import { Directive, Input, Output, HostBinding, HostListener, EventEmitter, ElementRef } from '@angular/core';
import * as _ from 'lodash';

@Directive({
    selector: '[ngxDropdown]',
    exportAs: 'ngxDropdown'
})
export class DropdownDirective {
    toggleElement: any;
    // tslint:disable-next-line:no-input-rename
    @Input('open') internalOpen = false;
    @Output() openChange = new EventEmitter<boolean>();

    @HostBinding('class.show') get isOpen(): boolean {
        return this.internalOpen;
    }

    @HostListener('keyup.esc')
    onKeyupEsc() {
        this.close();
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        if (event.button !== 2 && !this.isEventFromToggle(event)) {
            this.close();
        }
    }

    open() {
        if (!this.internalOpen) {
            this.internalOpen = true;
            this.openChange.emit(true);
        }
    }

    close() {
        if (this.internalOpen) {
            this.internalOpen = false;
            this.openChange.emit(false);
        }
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    private isEventFromToggle(event: MouseEvent) {
        return !_.isNil(this.toggleElement) && this.toggleElement.contains(event.target);
    }
}
