import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TreeviewComponent } from './treeview.component';
import { DropdownTreeviewComponent } from './dropdown-treeview.component';
import { TreeviewItemComponent } from './treeview-item.component';
import { TreeviewConfig } from './treeview-config';
import { TreeviewItem } from './treeview-item';
import { TreeviewI18n, TreeviewI18nDefault } from './treeview-i18n';
import { TreeviewEventParser, DefaultTreeviewEventParser } from './treeview-event-parser';
import { expect, createGenericTestComponent } from '../testing';
import { queryFilterTextBox, queryCheckboxAll } from './treeview.component.spec';

interface FakeData {
    config: TreeviewConfig;
    items: TreeviewItem[];
    selectedChange(data: any[]): void;
    hide(): void;
}

const fakeData: FakeData = {
    config: undefined,
    items: undefined,
    selectedChange(data: any[]) { },
    hide() { }
};

@Component({
    selector: 'ngx-test',
    template: ''
})
class TestComponent {
    config = fakeData.config;
    items = fakeData.items;
    selectedChange = fakeData.selectedChange;
    hide = fakeData.hide;
}

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

describe('DropdownTreeviewComponent', () => {
    const template = '<ngx-dropdown-treeview [items]="items" (selectedChange)="selectedChange($event)"></ngx-dropdown-treeview>';
    let spy: jasmine.Spy;
    let button: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                BrowserModule
            ],
            declarations: [
                TestComponent,
                TreeviewComponent,
                TreeviewItemComponent,
                DropdownTreeviewComponent
            ],
            providers: [
                TreeviewConfig,
                { provide: TreeviewI18n, useClass: TreeviewI18nDefault },
                { provide: TreeviewEventParser, useClass: DefaultTreeviewEventParser }
            ]
        });
        spy = spyOn(fakeData, 'selectedChange');
    });

    beforeEach(fakeAsync(() => {
        spy.calls.reset();
        fakeData.items = [new TreeviewItem({ text: '1', value: 1 })];
        const fixture = createTestComponent(template);
        fixture.detectChanges();
        tick();
        button = fixture.debugElement.query(By.css('button'));
    }));

    it('should initialize with default config', () => {
        const defaultConfig = new TreeviewConfig();
        const component = TestBed.createComponent(DropdownTreeviewComponent).componentInstance;
        expect(component.config).toEqual(defaultConfig);
    });

    it('should raise event selectedChange when initializing', () => {
        expect(spy.calls.any()).toBeTruthy();
    });

    it('should display button text "All"', () => {
        expect(button.nativeElement).toHaveTrimmedText('All');
    });
});
