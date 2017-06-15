import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { DropdownDirective } from './dropdown.directive';
import { expect, createGenericTestComponent } from '../testing';

@Component({
    selector: 'ngx-test',
    template: ''
})
class TestComponent { }

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

describe('DropdownToggleDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let element: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                BrowserModule
            ],
            declarations: [
                TestComponent,
                DropdownDirective,
                DropdownToggleDirective
            ]
        });
    });

    beforeEach(() => {
        fixture = createTestComponent('<div ngxDropdown><div ngxDropdownToggle></div></div>');
        fixture.detectChanges();
        element = fixture.debugElement.query(By.directive(DropdownToggleDirective));
    });

    it('should work', () => {
        expect(element).toBeDefined();
        expect(element.nativeElement).toHaveCssClass('dropdown-toggle');
        expect(element.nativeElement.attributes['aria-haspopup'].value).toBe('true');
    });

    it('should set attribute "aria-expanded" is "false" when initializing', () => {
        expect(element.nativeElement.attributes['aria-expanded'].value).toBe('false');
    });

    describe('click element', () => {
        beforeEach(() => {
            element.nativeElement.click();
            fixture.detectChanges();
        });

        it('should change attribute "aria-expanded" to "true"', () => {
            expect(element.nativeElement.attributes['aria-expanded'].value).toBe('true');
        });

        describe('click element again', () => {
            beforeEach(() => {
                element.nativeElement.click();
                fixture.detectChanges();
            });

            it('should change attribute "aria-expanded" to "false"', () => {
                expect(element.nativeElement.attributes['aria-expanded'].value).toBe('false');
            });
        });
    });
});
