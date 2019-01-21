import { TreeviewPipe } from './treeview.pipe';

describe('TreeviewPipe', () => {
    const pipe = new TreeviewPipe();

    it('transforms null or undefined to undefined', () => {
        expect(pipe.transform(null, undefined)).toBe(undefined, 'case of null');
        expect(pipe.transform(undefined, undefined)).toBe(undefined, 'case of undefined');
    });

    it('transforms a list of objects to list of TreeItem objects', () => {
        const objects: any[] = [{
            name: 'leo',
            age: '18'
        }, {
            name: 'vo',
            age: '14'
        }];

        const treeItems = pipe.transform(objects, 'name');
        expect(objects.length === treeItems.length).toBe(true, 'same length');
        expect(objects[0].name === treeItems[0].text && objects[1].name === treeItems[1].text).toBe(true, 'validate text');
        expect(objects[0] === treeItems[0].value && objects[1] === treeItems[1].value).toBe(true, 'validate value');
    });

    it('transforms a list of objects to list of TreeItem objects that include checked property', () => {
        const objects: any[] = [{
            name: 'leo',
            age: '18',
            checked: true
        }, {
            name: 'vo',
            age: '14',
            checked: false
        }];

        const treeItems = pipe.transform(objects, 'name');
        expect(objects[0].checked === treeItems[0].value.checked
            && objects[1].checked === treeItems[1].value.checked).toBe(true, 'validate checked');
    });

    it('only includes checked property when provided', () => {
        const objects: any[] = [{
            name: 'leo',
            age: '18',
        }, {
            name: 'vo',
            age: '14',
            checked: false
        }];

        const treeItems = pipe.transform(objects, 'name');
        expect(treeItems[0].checked).toBe(true);
        expect(treeItems[1].checked).toBe(false);
    });

});
