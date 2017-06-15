import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick, async } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import * as _ from 'lodash';
import { TreeviewComponent } from './treeview.component';
import { TreeviewItemComponent } from './treeview-item.component';
import { TreeviewConfig } from './treeview-config';
import { TreeviewI18n, TreeviewI18nDefault } from './treeview-i18n';
import { TreeviewEventParser, DefaultTreeviewEventParser } from './treeview-event-parser';
import { TreeviewItem } from './treeview-item';
import { expect, createGenericTestComponent, eventHelper } from '../testing';

interface FakeData {
    config: TreeviewConfig;
    items: TreeviewItem[];
    selectedChange(data: any[]): void;
}

const fakeData: FakeData = {
    config: undefined,
    items: undefined,
    selectedChange(data: any[]) { }
};

@Component({
    selector: 'ngx-test',
    template: ''
})
class TestComponent {
    config = fakeData.config;
    items = fakeData.items;
    selectedChange = fakeData.selectedChange;
}

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

export function queryCheckboxAll(debugElement: DebugElement): DebugElement {
    return debugElement.query(By.css('.label-item-all > input'));
}

export function queryFilterTextBox(debugElement: DebugElement): DebugElement {
    return debugElement.query(By.css('input[type=text]'));
}

export function queryCollapseExpandIcon(debugElement: DebugElement): DebugElement {
    return debugElement.query(By.css('.label-collapse-expand > i'));
}

export function queryItemCheckboxes(debugElement: DebugElement): DebugElement[] {
    return debugElement.queryAll(By.css('.treeview-container input'));
}

export function queryItemTexts(debugElement: DebugElement): string[] {
    const treeviewLabels = debugElement.queryAll(By.css('.treeview-container .form-check-label'));
    return treeviewLabels.map(label => label.nativeElement.innerText.trim());
}

describe('TreeviewComponent', () => {
    const baseConfig: TreeviewConfig = {
        isShowAllCheckBox: undefined,
        isShowCollapseExpand: undefined,
        isShowFilter: undefined,
        maxHeight: undefined
    };
    const baseTemplate = '<ngx-treeview [items]="items" [config]="config" (selectedChange)="selectedChange($event)"></ngx-treeview>';
    let spy: jasmine.Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                BrowserModule
            ],
            declarations: [
                TestComponent,
                TreeviewComponent,
                TreeviewItemComponent
            ],
            providers: [
                TreeviewConfig,
                { provide: TreeviewI18n, useClass: TreeviewI18nDefault },
                { provide: TreeviewEventParser, useClass: DefaultTreeviewEventParser }
            ]
        });
        spy = spyOn(fakeData, 'selectedChange');
    });

    it('should initialize with default config', () => {
        const defaultConfig = new TreeviewConfig();
        const component = TestBed.createComponent(TreeviewComponent).componentInstance;
        expect(component.config).toEqual(defaultConfig);
    });

    it('should raise event selectedChange when invoking raiseSelectedChange', () => {
        const fixture = TestBed.createComponent(TreeviewComponent)
        const component = fixture.componentInstance;
        const selectedChangeSpy = spyOn(component.selectedChange, 'emit');
        component.raiseSelectedChange();
        expect(selectedChangeSpy.calls.any()).toBeTruthy();
        const args = selectedChangeSpy.calls.mostRecent().args;
        expect(args[0]).toEqual([]);
    })

    it('should display "No items found" if no items provided', () => {
        const fixture = createTestComponent('<ngx-treeview></ngx-treeview>');
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent.trim()).toBe('No items found');
    });

    it('should display "No items found" if binding items with null', () => {
        fakeData.items = null;
        const fixture = createTestComponent('<ngx-treeview [items]="items"></ngx-treeview>');
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent.trim()).toBe('No items found');
    });

    describe('config', () => {

        beforeEach(() => {
            fakeData.items = [new TreeviewItem({ text: '1', value: 1 })];
        });

        describe('isShowAllCheckBox', () => {
            it('should display checkbox "All" if value is true', () => {
                fakeData.config = _.extend({}, baseConfig, { isShowAllCheckBox: true });
                const fixture = createTestComponent('<ngx-treeview [config]="config" [items]="items"></ngx-treeview>');
                fixture.detectChanges();
                const checkboxAll = queryCheckboxAll(fixture.debugElement);
                expect(checkboxAll).not.toBeNull();
            });

            it('should not display checkbox "All" if value is false', () => {
                fakeData.config = _.extend({}, baseConfig, { isShowAllCheckBox: false });
                const fixture = createTestComponent('<ngx-treeview [config]="config" [items]="items"></ngx-treeview>');
                fixture.detectChanges();
                const checkboxAll = queryCheckboxAll(fixture.debugElement);
                expect(checkboxAll).toBeNull();
            });
        });

        describe('isShowFilter', () => {
            it('should display checkbox Filter textbox if value is true', () => {
                fakeData.config = _.extend({}, baseConfig, { isShowFilter: true });
                const fixture = createTestComponent('<ngx-treeview [config]="config" [items]="items"></ngx-treeview>');
                fixture.detectChanges();
                const filterTextBox = queryFilterTextBox(fixture.debugElement);
                expect(filterTextBox).not.toBeNull();
            });

            it('should not display checkbox Filter textbox if value is false', () => {
                fakeData.config = _.extend({}, baseConfig, { isShowFilter: false });
                const fixture = createTestComponent('<ngx-treeview [config]="config" [items]="items"></ngx-treeview>');
                fixture.detectChanges();
                const filterTextBox = queryFilterTextBox(fixture.debugElement);
                expect(filterTextBox).toBeNull();
            });
        });

        describe('isShowCollapseExpand', () => {
            it('should display icon Collapse/Expand if value is true', () => {
                fakeData.config = _.extend({}, baseConfig, { isShowCollapseExpand: true });
                const fixture = createTestComponent('<ngx-treeview [config]="config" [items]="items"></ngx-treeview>');
                fixture.detectChanges();
                const collapseExpandIcon = queryCollapseExpandIcon(fixture.debugElement);
                expect(collapseExpandIcon).not.toBeNull();
            });

            it('should not display icon Collapse/Expand if value is false', () => {
                fakeData.config = _.extend({}, baseConfig, { isShowCollapseExpand: false });
                const fixture = createTestComponent('<ngx-treeview [config]="config" [items]="items"></ngx-treeview>');
                fixture.detectChanges();
                const collapseExpandIcon = queryCollapseExpandIcon(fixture.debugElement);
                expect(collapseExpandIcon).toBeNull();
            });
        });

        describe('maxHeight', () => {
            it('should display style correct max-height value', () => {
                fakeData.config = _.extend({}, baseConfig, { maxHeight: 400 });
                const fixture = createTestComponent('<ngx-treeview [config]="config" [items]="items"></ngx-treeview>');
                fixture.detectChanges();
                const container = fixture.debugElement.query(By.css('.treeview-container'));
                expect(container.nativeElement).toHaveCssStyle({ 'max-height': '400px' });
            });
        });

        describe('baseConfig', () => {
            let fixture: ComponentFixture<TestComponent>;

            beforeEach(() => {
                fakeData.config = baseConfig;
                fixture = createTestComponent('<ngx-treeview [config]="config" [items]="items"></ngx-treeview>');
                fixture.detectChanges();
            });

            it('should not display divider with base config', () => {
                const divider = fixture.debugElement.query(By.css('.divider'));
                expect(divider).toBeNull();
            });

            it('should display divider when binding new config which has isShowAllCheckBox value = true', () => {
                fixture.componentInstance.config = _.extend({}, baseConfig, { isShowAllCheckBox: true });
                fixture.detectChanges();
                const divider = fixture.debugElement.query(By.css('.divider'));
                expect(divider).not.toBeNull();
            });
        });
    });

    describe('template', () => {
        let fixture: ComponentFixture<TestComponent>;

        beforeEach(() => {
            fakeData.items = [new TreeviewItem({ text: '1', value: 1 })];
        });

        it('should work with default template', fakeAsync(() => {
            fixture = createTestComponent('<ngx-treeview [items]="items"></ngx-treeview>');
            fixture.detectChanges();
            tick();
            const treeviewTemplate = fixture.debugElement.query(By.css('.form-check'));
            expect(treeviewTemplate).not.toBeNull();
        }));

        it('should work with custom template', fakeAsync(() => {
            const htmlTemplate = `
<ng-template #tpl let-item="item"
    let-toggleCollapseExpand="toggleCollapseExpand"
    let-onCheckedChange="onCheckedChange">
    <div class="treeview-template">{{item.text}}</div>
</ng-template>
<ngx-treeview [items]="items" [template]="tpl"></ngx-treeview>`;
            fixture = createTestComponent(htmlTemplate);
            fixture.detectChanges();
            tick();
            const treeviewTemplate = fixture.debugElement.query(By.css('.treeview-template'));
            expect(treeviewTemplate.nativeElement).toHaveText('1');
        }));
    });

    it('should set icon is collapsed if all items is collapsed', fakeAsync(() => {
        fakeData.config = _.extend({}, baseConfig, { isShowCollapseExpand: true });
        fakeData.items = [new TreeviewItem({ text: '1', value: 1, collapsed: true })];
        const fixture = createTestComponent('<ngx-treeview [config]="config" [items]="items"></ngx-treeview>');
        fixture.detectChanges();
        tick();
        const collapseExpandIcon = queryCollapseExpandIcon(fixture.debugElement);
        expect(collapseExpandIcon.nativeElement).toHaveCssClass('fa-expand');
    }));

    describe('items', () => {
        let fixture: ComponentFixture<TestComponent>;
        let allCheckBox: DebugElement;
        let itemCheckBoxes: DebugElement[];
        let filterTextBox: DebugElement;

        beforeEach(() => {
            fakeData.config = {
                isShowAllCheckBox: true,
                isShowCollapseExpand: true,
                isShowFilter: true,
                maxHeight: 400
            };
            fakeData.items = [
                new TreeviewItem({
                    text: 'Item1',
                    value: 1,
                    children: [{
                        text: 'Item11',
                        value: 11,
                        children: [{
                            text: 'Item111',
                            value: 111
                        }, {
                            text: 'Item112',
                            value: 112
                        }]
                    }, {
                        text: 'Item12',
                        value: 12
                    }]
                }),
                new TreeviewItem({
                    text: 'Item2',
                    value: 2
                })
            ];
        });

        beforeEach(fakeAsync(() => {
            spy.calls.reset();
            fixture = createTestComponent(baseTemplate);
            fixture.detectChanges();
            tick();
            allCheckBox = queryCheckboxAll(fixture.debugElement);
            itemCheckBoxes = queryItemCheckboxes(fixture.debugElement);
            filterTextBox = queryFilterTextBox(fixture.debugElement);
        }));

        it('should raise selectedChange when binding items', () => {
            expect(spy.calls.any()).toBeTruthy();
            const args = spy.calls.mostRecent().args;
            expect(args[0]).toEqual([111, 112, 12, 2]);
        });

        it('should have "All" checkbox is checked', () => {
            expect(allCheckBox.nativeElement.checked).toBeTruthy();
        });

        it('should have all of items are checked', () => {
            const checkedItems = itemCheckBoxes.filter(item => item.nativeElement.checked);
            expect(checkedItems.length).toBe(itemCheckBoxes.length);
        });

        describe('uncheck "All"', () => {
            beforeEach(fakeAsync(() => {
                spy.calls.reset();
                allCheckBox.nativeElement.click();
                fixture.detectChanges();
                tick();
            }));

            it('should uncheck all of items', () => {
                const checkedItems = itemCheckBoxes.filter(item => item.nativeElement.checked);
                expect(checkedItems.length).toBe(0);
            });

            it('should raise event selectedChange', () => {
                expect(spy.calls.any()).toBeTruthy();
                const args = spy.calls.mostRecent().args;
                expect(args[0]).toEqual([]);
            });
        });

        describe('uncheck "Item1"', () => {
            beforeEach(fakeAsync(() => {
                spy.calls.reset();
                itemCheckBoxes[0].nativeElement.click();
                fixture.detectChanges();
                tick();
            }));

            it('should have "All" checkbox is unchecked', () => {
                expect(allCheckBox.nativeElement.checked).toBeFalsy();
            });

            it('should raise event selectedChange', () => {
                expect(spy.calls.any()).toBeTruthy();
                const args = spy.calls.mostRecent().args;
                expect(args[0]).toEqual([2]);
            });

            describe('filtering "em2"', () => {
                beforeEach(fakeAsync(() => {
                    eventHelper.raiseInput(filterTextBox.nativeElement, 'em2');
                    fixture.detectChanges();
                    tick();
                }));

                it('should not display item "Item1" & its children', () => {
                    const texts = queryItemTexts(fixture.debugElement);
                    expect(texts).toEqual(['Item2']);
                });

                it('should have checkbox "All" is checked', () => {
                    expect(allCheckBox.nativeElement.checked).toBeTruthy();
                });
            });

            describe('filtering "em1"', () => {
                let itemCheckboxes: DebugElement[];

                beforeEach(fakeAsync(() => {
                    itemCheckboxes = queryItemCheckboxes(fixture.debugElement);
                    eventHelper.raiseInput(filterTextBox.nativeElement, 'em1');
                    fixture.detectChanges();
                    tick();
                }));

                it('should not display item "Item2"', () => {
                    const texts = queryItemTexts(fixture.debugElement);
                    expect(texts).toEqual(['Item1', 'Item11', 'Item111', 'Item112', 'Item12']);
                });

                it('should have checkbox "All" is unchecked', () => {
                    expect(allCheckBox.nativeElement.checked).toBeFalsy();
                });

                it('should have "Item11" is unchecked', () => {
                    expect(itemCheckBoxes[1].nativeElement.checked).toBeFalsy();
                });

                describe('check "Item11"', () => {
                    beforeEach(fakeAsync(() => {
                        itemCheckBoxes[1].nativeElement.click();
                        fixture.detectChanges();
                        tick();
                    }));

                    it('should have "Item1" is unchecked', () => {
                        expect(itemCheckBoxes[0].nativeElement.checked).toBeFalsy();
                    });

                    it('should have checkbox "All" is unchecked', () => {
                        expect(allCheckBox.nativeElement.checked).toBeFalsy();
                    });
                });
            });

            describe('uncheck "Item2"', () => {
                beforeEach(fakeAsync(() => {
                    spy.calls.reset();
                    itemCheckBoxes[itemCheckBoxes.length - 1].nativeElement.click();
                    fixture.detectChanges();
                    tick();
                }));

                it('should keep "All" checkbox is unchecked', () => {
                    expect(allCheckBox.nativeElement.checked).toBeFalsy();
                });

                it('should raise event selectedChange', () => {
                    expect(spy.calls.any()).toBeTruthy();
                    const args = spy.calls.mostRecent().args;
                    expect(args[0]).toEqual([]);
                });
            });

            describe('check "Item11"', () => {
                beforeEach(fakeAsync(() => {
                    spy.calls.reset();
                    itemCheckBoxes[1].nativeElement.click();
                    fixture.detectChanges();
                    tick();
                }));

                it('should have "All" checkbox is unchecked', () => {
                    expect(allCheckBox.nativeElement.checked).toBeFalsy();
                });

                it('should have 4 items are checked', () => {
                    const checkedItems = itemCheckBoxes.filter(item => item.nativeElement.checked);
                    expect(checkedItems.length).toBe(4);
                });

                it('should raise event selectedChange', () => {
                    expect(spy.calls.any()).toBeTruthy();
                    const args = spy.calls.mostRecent().args;
                    expect(args[0]).toEqual([111, 112, 2]);
                });
            });

            describe('check "Item111"', () => {
                beforeEach(fakeAsync(() => {
                    spy.calls.reset();
                    itemCheckBoxes[2].nativeElement.click();
                    fixture.detectChanges();
                    tick();
                }));

                it('should have "All" checkbox is unchecked', () => {
                    expect(allCheckBox.nativeElement.checked).toBeFalsy();
                });

                it('should have "Item1" is unchecked', () => {
                    expect(itemCheckBoxes[0].nativeElement.checked).toBeFalsy();
                });
            });
        });

        describe('collapse/expand icon', () => {
            let collapseExpandIcon: DebugElement;

            beforeEach(() => {
                collapseExpandIcon = queryCollapseExpandIcon(fixture.debugElement);
            });

            it('should have element class "fa-compress"', () => {
                expect(collapseExpandIcon.nativeElement).toHaveCssClass('fa-compress');
            });

            it('should display "Item1" & "Item2"', () => {
                const texts = queryItemTexts(fixture.debugElement);
                expect(texts).toEqual(['Item1', 'Item11', 'Item111', 'Item112', 'Item12', 'Item2']);
            });

            describe('toggle', () => {
                beforeEach(fakeAsync(() => {
                    collapseExpandIcon.nativeElement.click();
                    fixture.detectChanges();
                    tick();
                }));

                it('should have element class "fa-expand"', () => {
                    expect(collapseExpandIcon.nativeElement).toHaveCssClass('fa-expand');
                });

                it('should display "Item1" & "Item2"', () => {
                    const texts = queryItemTexts(fixture.debugElement);
                    expect(texts).toEqual(['Item1', 'Item2']);
                });
            });
        });

        describe('filtering "em1"', () => {
            beforeEach(fakeAsync(() => {
                eventHelper.raiseInput(filterTextBox.nativeElement, 'em1');
                fixture.detectChanges();
                tick();
            }));

            it('should not display item "Item2"', () => {
                const texts = queryItemTexts(fixture.debugElement);
                expect(texts).toEqual(['Item1', 'Item11', 'Item111', 'Item112', 'Item12']);
            });

            it('should have checkbox "All" is checked', () => {
                expect(allCheckBox.nativeElement.checked).toBeTruthy();
            });

            describe('uncheck "Item1"', () => {
                let itemCheckboxes: DebugElement[];

                beforeEach(fakeAsync(() => {
                    itemCheckboxes = queryItemCheckboxes(fixture.debugElement);
                    itemCheckboxes[0].nativeElement.click();
                    fixture.detectChanges();
                    tick();
                }));

                it('should change checked value of checkbox "All" to false', () => {
                    expect(allCheckBox.nativeElement.checked).toBeFalsy();
                });

                it('should have checked value of "Item1" && its children are false', () => {
                    itemCheckboxes = queryItemCheckboxes(fixture.debugElement);
                    const checkedValues = itemCheckboxes.map(checkbox => checkbox.nativeElement.checked);
                    expect(checkedValues).toEqual([false, false, false, false, false]);
                });

                describe('clear filter', () => {
                    beforeEach(fakeAsync(() => {
                        itemCheckboxes = queryItemCheckboxes(fixture.debugElement);
                        eventHelper.raiseInput(filterTextBox.nativeElement, '');
                        fixture.detectChanges();
                        tick();
                    }));

                    it('should have checked of "Item1" is false', () => {
                        itemCheckboxes = queryItemCheckboxes(fixture.debugElement);
                        const checkedValues = itemCheckboxes.map(checkbox => checkbox.nativeElement.checked);
                        expect(checkedValues).toEqual([false, false, false, false, false, true]);
                    });

                    it('should have checked value of "All" checkbox is false', () => {
                        expect(allCheckBox.nativeElement.checked).toBeFalsy();
                    });

                    describe('check "All"', () => {
                        beforeEach(fakeAsync(() => {
                            allCheckBox.nativeElement.click();
                            fixture.detectChanges();
                            tick();
                        }));

                        it('should have checked value of "Item1" is true', () => {
                            itemCheckboxes = queryItemCheckboxes(fixture.debugElement);
                            const checkedValues = itemCheckboxes.map(checkbox => checkbox.nativeElement.checked);
                            expect(checkedValues).toEqual([true, true, true, true, true, true]);
                        });
                    });
                });
            });
        });

        describe('filtering "em11"', () => {
            beforeEach(fakeAsync(() => {
                eventHelper.raiseInput(filterTextBox.nativeElement, 'em11');
                fixture.detectChanges();
                tick();
            }));

            it('should display only "Item1" & its children', () => {
                const texts = queryItemTexts(fixture.debugElement);
                expect(texts).toEqual(['Item1', 'Item11', 'Item111', 'Item112']);
            });

            describe('uncheck "Item11', () => {
                let itemCheckboxes: DebugElement[];

                beforeEach(fakeAsync(() => {
                    itemCheckboxes = queryItemCheckboxes(fixture.debugElement);
                    itemCheckboxes[1].nativeElement.click();
                    fixture.detectChanges();
                    tick();
                }));

                it('should have "Item1" is unchecked', () => {
                    expect(itemCheckboxes[0].nativeElement.checked).toBeFalsy();
                });

                describe('clear filter', () => {
                    beforeEach(fakeAsync(() => {
                        eventHelper.raiseInput(filterTextBox.nativeElement, '');
                        fixture.detectChanges();
                        tick();
                    }));

                    it('should have "Item12" & "Item2" are checked', () => {
                        itemCheckboxes = queryItemCheckboxes(fixture.debugElement);
                        const checkedValues = itemCheckboxes.map(checkbox => checkbox.nativeElement.checked);
                        expect(checkedValues).toEqual([false, false, false, false, true, true]);
                    });
                });

                describe('check "Item11"', () => {
                    beforeEach(fakeAsync(() => {
                        itemCheckboxes = queryItemCheckboxes(fixture.debugElement);
                        itemCheckboxes[1].nativeElement.click();
                        fixture.detectChanges();
                        tick();
                    }));

                    it('should have "All" checkbox is checked', () => {
                        expect(allCheckBox.nativeElement.checked).toBeTruthy();
                    });
                });
            });

            describe('uncheck "All"', () => {
                beforeEach(fakeAsync(() => {
                    allCheckBox.nativeElement.click();
                    fixture.detectChanges();
                    tick();
                }));

                it('should uncheck "Item11" & its children', () => {
                    const itemCheckboxes = queryItemCheckboxes(fixture.debugElement);
                    const checkedValues = itemCheckboxes.map(checkbox => checkbox.nativeElement.checked);
                    expect(checkedValues).toEqual([false, false, false, false]);
                });

                describe('clear filter', () => {
                    beforeEach(fakeAsync(() => {
                        eventHelper.raiseInput(filterTextBox.nativeElement, '');
                        fixture.detectChanges();
                        tick();
                    }));

                    it('should have "Item12" & "Item2" are checked', () => {
                        const itemCheckboxes = queryItemCheckboxes(fixture.debugElement);
                        const checkedValues = itemCheckboxes.map(checkbox => checkbox.nativeElement.checked);
                        expect(checkedValues).toEqual([false, false, false, false, true, true]);
                    });
                });
            });
        });

        describe('filtering "Item111"', () => {
            let itemCheckboxes: DebugElement[];

            beforeEach(fakeAsync(() => {
                eventHelper.raiseInput(filterTextBox.nativeElement, 'Item111');
                fixture.detectChanges();
                tick();
                itemCheckboxes = queryItemCheckboxes(fixture.debugElement);
            }));

            it('should display "Item1", "Item11" & "Item111"', () => {
                const texts = queryItemTexts(fixture.debugElement);
                expect(texts).toEqual(['Item1', 'Item11', 'Item111']);
            });

            describe('uncheck "Item1"', () => {
                beforeEach(fakeAsync(() => {
                    itemCheckboxes[0].nativeElement.click();
                    fixture.detectChanges();
                    tick();
                }));

                it('should have displayed items are unchecked', () => {
                    const checkedValues = itemCheckboxes.map(checkbox => checkbox.nativeElement.checked);
                    expect(checkedValues).toEqual([false, false, false]);
                });
            });
        });

        describe('filtering "fake"', () => {
            beforeEach(fakeAsync(() => {
                eventHelper.raiseInput(filterTextBox.nativeElement, 'fake');
                fixture.detectChanges();
                tick();
            }));

            it('should not display any items', () => {
                const texts = queryItemTexts(fixture.debugElement);
                expect(texts).toEqual([]);
            });

            it('should display a text "No items found"', () => {
                const textElement = fixture.debugElement.query(By.css('.treeview-text'));
                expect(textElement.nativeElement.textContent.trim()).toBe('No items found');
            })
        });
    });
});
