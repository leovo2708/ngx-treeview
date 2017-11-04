import { EventEmitter } from '@angular/core';
export declare class DropdownDirective {
    toggleElement: any;
    internalOpen: boolean;
    openChange: EventEmitter<boolean>;
    readonly isOpen: boolean;
    onKeyupEsc(): void;
    onDocumentClick(event: MouseEvent): void;
    open(): void;
    close(): void;
    toggle(): void;
    private isEventFromToggle(event);
}
