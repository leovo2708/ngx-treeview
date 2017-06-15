import { TestBed } from '@angular/core/testing';
import { TreeviewItem } from './treeview-item';
import { TreeviewI18nDefault, TreeviewI18n } from './treeview-i18n';

describe('TreeviewI18nDefault', () => {
    let treeviewI18n: TreeviewI18n;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TreeviewI18nDefault
            ]
        });
        treeviewI18n = TestBed.get(TreeviewI18nDefault);
    });

    describe('getText', () => {
        it('should return "All" if second param = true', () => {
            expect(treeviewI18n.getText(undefined, true)).toBe('All');
        })

        it('should return "Select options" if list of checked items is empty', () => {
            expect(treeviewI18n.getText([], false)).toBe('Select options');
        });

        it('should return text of first checked item if length of checked items is 1', () => {
            const list: TreeviewItem[] = [
                new TreeviewItem({ text: 'Item 1', value: undefined })
            ];
            expect(treeviewI18n.getText(list, false)).toBe('Item 1');
        });

        it('should return "2 options selected" if length of checked items is 2', () => {
            const list: TreeviewItem[] = [
                new TreeviewItem({ text: 'Item 1', value: undefined }),
                new TreeviewItem({ text: 'Item 2', value: undefined })
            ];
            expect(treeviewI18n.getText(list, false)).toBe('2 options selected');
        });
    });
});
