import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import * as _ from 'lodash';
import { TreeviewModule } from './treeview.module';
import { createGenericTestComponent, raiseInputEvent, raiseClickEvent } from './testing/common';
import { model } from './testing/model';
import { queryTextboxFilter, queryCheckboxAll } from './treeview.component.spec';
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

function queryDropdownButton(debugElement: DebugElement): DebugElement {
    return debugElement.query(By.css('.dropdown-toggle'));
}

describe('DropdownTreeviewComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                BrowserModule,
                TreeviewModule.forRoot()
            ],
            declarations: [
                TestComponent
            ]
        });
    });

    it('search "ad" -> uncheck "All" -> Expect: text is not "All"', fakeAsync(() => {
        const fixture = createTestComponent('<ngx-dropdown-treeview [items]="items" [config]="config"></ngx-dropdown-treeview>');
        tick();
        const dropdownButton = queryDropdownButton(fixture.debugElement);
        const textboxFilter = queryTextboxFilter(fixture.debugElement);
        raiseInputEvent(textboxFilter.nativeElement, 'ad');
        fixture.detectChanges();
        tick();
        const checkboxAll = queryCheckboxAll(fixture.debugElement);
        raiseClickEvent(checkboxAll.nativeElement);
        fixture.detectChanges();
        tick();
        expect(dropdownButton.nativeElement).not.toHaveText('All');
    }));
});
