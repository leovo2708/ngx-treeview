import { Directive, Input, OnChanges, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ngxDisabledOnSelector]'
})
export class DisabledOnSelectorDirective implements OnChanges {
  @Input() ngxDisabledOnSelector: string;
  @Input() disabled: boolean;
  private readonly nativeElement: HTMLElement;

  constructor(
    private el: ElementRef,
    private renderer2: Renderer2) {
    this.nativeElement = el.nativeElement;
  }

  ngOnChanges(): void {
    const elements = this.nativeElement.querySelectorAll(this.ngxDisabledOnSelector);
    elements.forEach(element => {
      this.renderer2.setProperty(element, 'disabled', this.disabled);
    });
  }
}
