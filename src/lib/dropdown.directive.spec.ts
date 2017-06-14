import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { expect, createGenericTestComponent, eventHelper } from '../testing';
import { DropdownDirective } from './dropdown.directive';
import { DropdownToggleDirective } from './dropdown-toggle.directive';

interface FakeData {
    open: boolean;
    openChange(open: boolean): void;
}

const fakeData: FakeData = {
    open: undefined,
    openChange(open: boolean) { }
};

@Component({
    selector: 'ngx-test',
    template: ''
})
class TestComponent {
    open = fakeData.open;
    openChange = (open) => fakeData.openChange(open);
}

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

describe('DropdownToggleDirective', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                BrowserModule
            ],
            declarations: [
                TestComponent,
                DropdownToggleDirective,
                DropdownDirective
            ]
        });
    });

    it('should not have class "show" by default', () => {
        const fixture = createTestComponent('<div ngxDropdown></div>');
        fixture.detectChanges();
        const element = fixture.debugElement.query(By.directive(DropdownDirective));
        expect(element.nativeElement).not.toHaveCssClass('show');
    });

    describe('open', () => {
        it('should not have class "show" if open is false', () => {
            fakeData.open = false;
            const fixture = createTestComponent('<div ngxDropdown [open]="open"></div>');
            fixture.detectChanges();
            const element = fixture.debugElement.query(By.directive(DropdownDirective));
            expect(element.nativeElement).not.toHaveCssClass('show');
        });

        it('should have class "show" if open is true', () => {
            fakeData.open = true;
            const fixture = createTestComponent('<div ngxDropdown [open]="open"></div>');
            fixture.detectChanges();
            const element = fixture.debugElement.query(By.directive(DropdownDirective));
            expect(element.nativeElement).toHaveCssClass('show');
        });
    });

    it('should allow toggling dropdown from outside', () => {
        const template = `
            <button (click)="drop.open(); $event.stopPropagation()"></button>
            <button (click)="drop.close(); $event.stopPropagation()"></button>
            <button (click)="drop.toggle(); $event.stopPropagation()"></button>
            <div ngxDropdown #drop="ngxDropdown" (openChange)="openChange($event)"></div>
        `;
        const fixture = createTestComponent(template);
        const element = fixture.debugElement.query(By.directive(DropdownDirective));
        const buttons = fixture.debugElement.queryAll(By.css('button'));
        const spy = spyOn(fakeData, 'openChange');

        spy.calls.reset();
        buttons[0].nativeElement.click();
        fixture.detectChanges();
        expect(element.nativeElement).toHaveCssClass('show');
        expect(spy.calls.any()).toBeTruthy();
        let args = spy.calls.mostRecent().args;
        expect(args[0]).toBe(true);

        spy.calls.reset();
        buttons[0].nativeElement.click();
        fixture.detectChanges();
        expect(spy.calls.any()).toBeFalsy();

        spy.calls.reset();
        buttons[1].nativeElement.click();
        fixture.detectChanges();
        expect(element.nativeElement).not.toHaveCssClass('show');
        expect(spy.calls.any()).toBeTruthy();
        args = spy.calls.mostRecent().args;
        expect(args[0]).toBe(false);

        spy.calls.reset();
        buttons[1].nativeElement.click();
        fixture.detectChanges();
        expect(spy.calls.any()).toBeFalsy();

        spy.calls.reset();
        buttons[2].nativeElement.click();
        fixture.detectChanges();
        expect(element.nativeElement).toHaveCssClass('show');
        expect(spy.calls.any()).toBeTruthy();
        args = spy.calls.mostRecent().args;
        expect(args[0]).toBe(true);

        spy.calls.reset();
        buttons[2].nativeElement.click();
        fixture.detectChanges();
        expect(element.nativeElement).not.toHaveCssClass('show');
        expect(spy.calls.any()).toBeTruthy();
        args = spy.calls.mostRecent().args;
        expect(args[0]).toBe(false);
    });

    it('should close when press Esc', () => {
        fakeData.open = true;
        const fixture = createTestComponent('<div ngxDropdown [open]="open"></div>');
        fixture.detectChanges();
        const element = fixture.debugElement.query(By.directive(DropdownDirective));
        element.triggerEventHandler('keyup.esc', {});
        fixture.detectChanges();
        expect(element.nativeElement).not.toHaveCssClass('show');
    });

    it('should close if click outside', () => {
        fakeData.open = true;
        const fixture = createTestComponent('<button>Outside<button><div ngxDropdown [open]="open"></div>');
        fixture.detectChanges();
        const element = fixture.debugElement.query(By.directive(DropdownDirective));
        const button = fixture.debugElement.query(By.css('button'));
        button.nativeElement.click();
        fixture.detectChanges();
        expect(element.nativeElement).not.toHaveCssClass('show');
    });

    it('should not close if click on toggle element', () => {
        const template = `
            <div ngxDropdown [open]="open">
                <button ngxDropdownToggle>Button</button>
                <p>Panel</p>
            </div>
        `;
        fakeData.open = true;
        const fixture = createTestComponent(template);
        fixture.detectChanges();
        const element = fixture.debugElement.query(By.directive(DropdownDirective));
        const button = fixture.debugElement.query(By.css('button'));
        button.nativeElement.click();
        fixture.detectChanges();
        expect(element.nativeElement).not.toHaveCssClass('show');
    });
});
