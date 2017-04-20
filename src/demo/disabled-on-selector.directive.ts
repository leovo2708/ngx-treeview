import { Directive, Input, OnChanges, ElementRef, Renderer } from '@angular/core';

@Directive({
    selector: '[ngxDisabledOnSelector]'
})
export class DisabledOnSelectorDirective implements OnChanges {
    @Input('ngxDisabledOnSelector') ngxDisabledOnSelector: string;
    @Input() disabled: boolean;
    private readonly nativeElement: HTMLElement;

    constructor(
        private el: ElementRef,
        private renderer: Renderer) {
        this.nativeElement = el.nativeElement;
    }

    ngOnChanges() {
        const elements = this.nativeElement.querySelectorAll(this.ngxDisabledOnSelector);
        for (let i = 0; i < elements.length; i++) {
            this.renderer.setElementProperty(elements[i], 'disabled', this.disabled);
        }
    }
}
