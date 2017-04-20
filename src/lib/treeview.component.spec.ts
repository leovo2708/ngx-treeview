import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import * as _ from 'lodash';
import { TreeviewModule } from './treeview.module';
import { TreeviewComponent } from './treeview.component';
import { TreeviewConfig } from './treeview-config';
import { createGenericTestComponent, raiseInputEvent, raiseClickEvent } from './testing/common';
import { model } from './testing/model';
import { expect } from '../testing/jasmine-matchers';

@Component({
    selector: 'ngx-test',
    template: '',
})
class TestComponent {
    config = _.cloneDeep(model.config);
    items = _.cloneDeep(model.items);
}

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

export function queryCheckboxAll(debugElement: DebugElement): DebugElement {
    return debugElement.query(By.css('.label-item-all > input'));
}

export function queryTextboxFilter(debugElement: DebugElement): DebugElement {
    return debugElement.query(By.css('input[type=text]'));
}

export function queryCollapseExpandIcon(debugElement: DebugElement): DebugElement {
    return debugElement.query(By.css('.label-collapse-expand > i'));
}

export function queryCheckboxItems(debugElement: DebugElement): DebugElement[] {
    return debugElement.queryAll(By.css('.treeview-container input'));
}

describe('TreeviewComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TreeviewModule.forRoot(),
                FormsModule,
                BrowserModule
            ],
            declarations: [
                TestComponent
            ]
        });
    });

    it('should initialize with provided config', () => {
        const defaultConfig = new TreeviewConfig();
        const treeview = TestBed.createComponent(TreeviewComponent).componentInstance;
        expect(treeview.config.isShowAllCheckBox).toBe(defaultConfig.isShowAllCheckBox);
        expect(treeview.config.isShowCollapseExpand).toBe(defaultConfig.isShowCollapseExpand);
        expect(treeview.config.isShowFilter).toBe(defaultConfig.isShowFilter);
    });

    it('should display "No items found" if no items provided', () => {
        const fixture = createTestComponent('<ngx-treeview></ngx-treeview>');
        expect(fixture.nativeElement.textContent.trim()).toBe('No items found');
    });

    it('should handle correct configuration', () => {
        const fixture = createTestComponent('<ngx-treeview [items]="items" [config]="config"></ngx-treeview>');
        const config = fixture.componentInstance.config;

        config.isShowAllCheckBox = true;
        fixture.detectChanges();
        let checkboxAll = queryCheckboxAll(fixture.debugElement);
        expect(checkboxAll).not.toBeNull('checkbox "All" exists');

        config.isShowAllCheckBox = false;
        fixture.detectChanges();
        checkboxAll = queryCheckboxAll(fixture.debugElement);
        expect(checkboxAll).toBeNull('checkbox "All" does not exist');

        config.isShowFilter = true;
        fixture.detectChanges();
        let textboxFilter = queryTextboxFilter(fixture.debugElement);
        expect(textboxFilter).not.toBeNull('textbox "Filter" exists');

        config.isShowFilter = false;
        fixture.detectChanges();
        textboxFilter = queryTextboxFilter(fixture.debugElement);
        expect(textboxFilter).toBeNull('textbox "Filter" does not exist');

        config.isShowCollapseExpand = true;
        fixture.detectChanges();
        let collapseExpandIcon = queryCollapseExpandIcon(fixture.debugElement);
        expect(collapseExpandIcon).not.toBeNull('icon Collapse/Expand exists');

        config.isShowCollapseExpand = false;
        fixture.detectChanges();
        collapseExpandIcon = queryCollapseExpandIcon(fixture.debugElement);
        expect(collapseExpandIcon).toBeNull('icon Collapse/Expand does not exist');
    });

    it('should support item with disabled state', () => {
        const fixture = createTestComponent('<ngx-treeview [items]="items" [config]="config"></ngx-treeview>');
        fixture.whenStable().then(() => {
            const checkboxItems = queryCheckboxItems(fixture.debugElement);
            const disabledCheckbox = checkboxItems[checkboxItems.length - 1];
            expect(disabledCheckbox.nativeElement.checked).toBeTruthy();
        });
    });

    it('should handle correct collapse / expand', () => {
        const fixture = createTestComponent('<ngx-treeview [items]="items" [config]="config"></ngx-treeview>');
        const config = fixture.componentInstance.config;
        config.isShowCollapseExpand = true;
        fixture.detectChanges();
        let treeItems = fixture.debugElement.queryAll(By.css('.treeview-container .treeview-item'));
        expect(treeItems.length).toBe(15);
        const collapseExpandIcon = queryCollapseExpandIcon(fixture.debugElement);
        expect(collapseExpandIcon.nativeElement).toHaveCssClass('fa-compress');
        const firstItem = treeItems[0];
        const itemCollapseExpandIcon = firstItem.query(By.css('i'));
        expect(itemCollapseExpandIcon.nativeElement).toHaveCssClass('fa-caret-down');
        collapseExpandIcon.nativeElement.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            treeItems = fixture.debugElement.queryAll(By.css('.treeview-container .treeview-item'));
            expect(treeItems.length).toBe(4);
            expect(collapseExpandIcon.nativeElement).toHaveCssClass('fa-expand');
            expect(itemCollapseExpandIcon.nativeElement).toHaveCssClass('fa-caret-right');
        });
    });

    it('search "b" -> uncheck "Baby 3-5" -> clear search -> Expect: item "Children" & "All" must be unchecked', fakeAsync(() => {
        const fixture = createTestComponent('<ngx-treeview [items]="items" [config]="config"></ngx-treeview>');
        tick();
        const textboxFilter = queryTextboxFilter(fixture.debugElement);
        raiseInputEvent(textboxFilter.nativeElement, 'b');
        const checkboxAll = queryCheckboxAll(fixture.debugElement);
        let checkboxItems = queryCheckboxItems(fixture.debugElement);
        let childrenCheckBox = checkboxItems[0];
        const baby35CheckBox = checkboxItems[1];
        expect(baby35CheckBox.nativeElement.checked).toBeTruthy();
        raiseClickEvent(baby35CheckBox.nativeElement);
        fixture.detectChanges();
        tick();
        raiseInputEvent(textboxFilter.nativeElement, '');
        fixture.detectChanges();
        tick();
        expect(checkboxAll.nativeElement.checked).toBeFalsy();
        checkboxItems = queryCheckboxItems(fixture.debugElement);
        childrenCheckBox = checkboxItems[0];
        expect(childrenCheckBox.nativeElement.checked).toBeFalsy();
    }));

    it('uncheck "Baby 3-5" -> search "b" -> check "Baby 3-5" -> Expect: item "Children" & "All" must be checked', fakeAsync(() => {
        const fixture = createTestComponent('<ngx-treeview [items]="items" [config]="config"></ngx-treeview>');
        tick();
        const textboxFilter = queryTextboxFilter(fixture.debugElement);
        const checkboxAll = queryCheckboxAll(fixture.debugElement);
        let checkboxItems = queryCheckboxItems(fixture.debugElement);
        let childrenCheckBox = checkboxItems[0];
        let baby35CheckBox = checkboxItems[1];
        raiseClickEvent(baby35CheckBox.nativeElement);
        fixture.detectChanges();
        tick();
        expect(checkboxAll.nativeElement.checked).toBeFalsy();
        expect(childrenCheckBox.nativeElement.checked).toBeFalsy();
        raiseInputEvent(textboxFilter.nativeElement, 'b');
        fixture.detectChanges();
        tick();
        checkboxItems = queryCheckboxItems(fixture.debugElement);
        childrenCheckBox = checkboxItems[0];
        baby35CheckBox = checkboxItems[1];
        raiseClickEvent(baby35CheckBox.nativeElement);
        fixture.detectChanges();
        tick();
        expect(checkboxAll.nativeElement.checked).toBeTruthy();
        checkboxItems = queryCheckboxItems(fixture.debugElement);
        childrenCheckBox = checkboxItems[0];
        expect(childrenCheckBox.nativeElement.checked).toBeTruthy();
    }));

    it('search "internet" -> uncheck "Internet" -> clear search -> Expect: item "Networking" must be unchecked', fakeAsync(() => {
        const fixture = createTestComponent('<ngx-treeview [items]="items" [config]="config"></ngx-treeview>');
        tick();
        const textboxFilter = queryTextboxFilter(fixture.debugElement);
        raiseInputEvent(textboxFilter.nativeElement, 'internet');
        fixture.detectChanges();
        tick();
        let checkboxItems = queryCheckboxItems(fixture.debugElement);
        const internetCheckBox = checkboxItems[checkboxItems.length - 1];
        raiseClickEvent(internetCheckBox.nativeElement);
        fixture.detectChanges();
        tick();
        raiseInputEvent(textboxFilter.nativeElement, '');
        fixture.detectChanges();
        tick();
        checkboxItems = queryCheckboxItems(fixture.debugElement);
        const networkingCheckBox = checkboxItems.filter(item =>
            _.trim(item.parent.nativeElement.textContent) === 'Networking')[0];
        expect(networkingCheckBox.nativeElement.checked).toBeFalsy();
    }));
});
