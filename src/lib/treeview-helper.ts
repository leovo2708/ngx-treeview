import * as _ from 'lodash';
import { TreeviewItem } from './treeview-item';

export const TreeviewHelper = {
    findParent: findParent,
    removeItem: removeItem
};

function findParent(x: TreeviewItem, items: TreeviewItem[]): TreeviewItem {
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (x === item) {
            return undefined;
        }

        if (item.children) {
            for (let j = 0; j < item.children.length; j++) {
                const child = item.children[j];
                if (x === child) {
                    return item;
                } else {
                    const parent = findParent(x, item.children);
                    if (parent) {
                        return parent;
                    }
                }
            }
        }
    }

    return undefined;
}

function removeItem(x: TreeviewItem, items: TreeviewItem[]) {
    const parent = TreeviewHelper.findParent(x, items);
    if (parent) {
        _.pull(parent.children, x);
        if (parent.children.length === 0) {
            parent.children = undefined;
        } else {
            parent.correctChecked();
        }
    } else {
        _.pull(items, x);
    }
}
