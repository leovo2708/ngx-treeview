import * as _ from 'lodash';
import { TreeviewItem } from './treeview-item';

export const TreeviewHelper = {
    findParent: findParent,
    removeItem: removeItem
};

function findParent(root: TreeviewItem, item: TreeviewItem): TreeviewItem {
    if (_.isNil(root) || _.isNil(root.children)) {
        return undefined;
    }

    for (let i = 0; i < root.children.length; i++) {
        const child = root.children[i];
        if (child === item) {
            return root;
        } else {
            const parent = findParent(child, item);
            if (parent) {
                return parent;
            }
        }
    }

    return undefined;
}

function removeItem(root: TreeviewItem, item: TreeviewItem): boolean {
    const parent = findParent(root, item);
    if (parent) {
        _.pull(parent.children, item);
        if (parent.children.length === 0) {
            parent.children = undefined;
        } else {
            parent.correctChecked();
        }
        return true;
    }

    return false;
}
