import { TreeviewItem } from './treeview-item';
export declare const TreeviewHelper: {
    findItem: (root: TreeviewItem, value: any) => TreeviewItem;
    findItemInList: (list: TreeviewItem[], value: any) => TreeviewItem;
    findParent: (root: TreeviewItem, item: TreeviewItem) => TreeviewItem;
    removeItem: (root: TreeviewItem, item: TreeviewItem) => boolean;
};
