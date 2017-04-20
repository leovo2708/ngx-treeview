import { TestBed, ComponentFixture } from '@angular/core/testing';

export function createGenericTestComponent<T>(html: string, type: { new (...args: any[]): T }): ComponentFixture<T> {
    TestBed.overrideComponent(type, { set: { template: html } });
    const fixture = TestBed.createComponent(type);
    fixture.detectChanges();
    return fixture as ComponentFixture<T>;
}
export function raiseInputEvent(inputElement: HTMLInputElement, text: string) {
    inputElement.value = text;
    inputElement.dispatchEvent(new Event('input'));
}

export function raiseClickEvent(element: HTMLElement) {
    element.click();
}
