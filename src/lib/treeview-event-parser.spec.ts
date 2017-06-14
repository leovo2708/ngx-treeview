import { TestBed } from '@angular/core/testing';
import { TreeviewItem } from './treeview-item';
import { TreeviewParserComponent } from './treeview-parser-component';
import {
    TreeviewEventParser, DefaultTreeviewEventParser, DownlineTreeviewEventParser, OrderDownlineTreeviewEventParser
} from './treeview-event-parser';

describe('DefaultTreeviewEventParser', () => {
    let parser: TreeviewEventParser;
    let fakeComponent: TreeviewParserComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: TreeviewEventParser, useClass: DefaultTreeviewEventParser }
            ]
        });
        parser = TestBed.get(TreeviewEventParser);
    });

    it('should return empty list if checkedItems is null or undefined', () => {
        fakeComponent = {
            items: undefined,
            checkedItems: undefined
        };
        let result = parser.getSelectedChange(fakeComponent);
        expect(result).toEqual([]);

        fakeComponent = {
            items: undefined,
            checkedItems: null
        };
        result = parser.getSelectedChange(fakeComponent);
        expect(result).toEqual([]);
    });

    it('should return list of value of checked items', () => {
        fakeComponent = {
            items: undefined,
            checkedItems: [
                new TreeviewItem({ text: 'Item1', value: 1 }),
                new TreeviewItem({ text: 'Item2', value: 2 })
            ]
        };

        const result = parser.getSelectedChange(fakeComponent);
        expect(result).toEqual([1, 2]);
    });
});

describe('DownlineTreeviewEventParser', () => {
    let parser: TreeviewEventParser;
    let fakeComponent: TreeviewParserComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: TreeviewEventParser, useClass: DownlineTreeviewEventParser }
            ]
        });
        parser = TestBed.get(TreeviewEventParser);
    });

    it('should return empty list if items is null or undefined', () => {
        fakeComponent = {
            items: undefined,
            checkedItems: undefined
        };
        let result = parser.getSelectedChange(fakeComponent);
        expect(result).toEqual([]);

        fakeComponent = {
            items: null,
            checkedItems: undefined
        };
        result = parser.getSelectedChange(fakeComponent);
        expect(result).toEqual([]);
    });

    it('should return list of checked items with links', () => {
        const item1 = new TreeviewItem({ text: 'Item1', value: 1, checked: false });
        const item1Child1 = new TreeviewItem({ text: 'Item11', value: 11 });
        const item1Child2 = new TreeviewItem({
            text: 'Item12', value: 12, checked: false,
            children: [
                { text: 'Item12', value: 12, checked: false }
            ]
        });
        item1.children = [item1Child1, item1Child2];
        const item2 = new TreeviewItem({ text: 'Item2', value: 2 });
        const item3 = new TreeviewItem({ text: 'Item3', value: 3, checked: false });
        fakeComponent = {
            items: [item1, item2, item3],
            checkedItems: undefined
        };
        const result = parser.getSelectedChange(fakeComponent);
        const expected = [
            {
                item: item1Child1,
                parent: {
                    item: item1,
                    parent: null
                }
            },
            {
                item: item2,
                parent: null
            }
        ];
        expect(result).toEqual(expected);
    });
});

describe('OrderDownlineTreeviewEventParser', () => {
    let parser: TreeviewEventParser;
    let fakeComponent: TreeviewParserComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser }
            ]
        });
        parser = TestBed.get(TreeviewEventParser);
    });

    it('should return empty list if items is null or undefined', () => {
        fakeComponent = {
            items: undefined,
            checkedItems: undefined
        };
        let result = parser.getSelectedChange(fakeComponent);
        expect(result).toEqual([]);

        fakeComponent = {
            items: null,
            checkedItems: undefined
        };
        result = parser.getSelectedChange(fakeComponent);
        expect(result).toEqual([]);
    });

    describe('', () => {
        const item1 = new TreeviewItem({ text: 'Item1', value: 1, checked: false });
        const item1Child1 = new TreeviewItem({ text: 'Item11', value: 11 });
        const item1Child2 = new TreeviewItem({
            text: 'Item12', value: 12, checked: false,
            children: [
                { text: 'Item12', value: 12, checked: false }
            ]
        });
        item1.children = [item1Child1, item1Child2];
        const item2 = new TreeviewItem({ text: 'Item2', value: 2, checked: false });
        const item3 = new TreeviewItem({ text: 'Item3', value: 3 });

        beforeEach(() => {
            fakeComponent = {
                items: [item1, item2, item3],
                checkedItems: undefined
            };
        });

        it('should return list of checked items with links', () => {
            const result = parser.getSelectedChange(fakeComponent);
            const expected = [
                {
                    item: item1Child1,
                    parent: {
                        item: item1,
                        parent: null
                    }
                },
                {
                    item: item3,
                    parent: null
                }
            ];
            expect(result).toEqual(expected);
        });

        it('should return list of checked items with links by order', () => {
            parser.getSelectedChange(fakeComponent);
            item1Child1.checked = false;
            item2.checked = true;
            const result = parser.getSelectedChange(fakeComponent);
            const expected = [
                {
                    item: item3,
                    parent: null
                },
                {
                    item: item2,
                    parent: null
                }
            ];
            expect(result).toEqual(expected);
        });
    });
});
