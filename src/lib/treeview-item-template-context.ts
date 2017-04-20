import { TreeviewItem } from './treeview-item';

export interface TreeviewItemTemplateContext {
    item: TreeviewItem;
    toggleCollapseExpand: () => {};
    onCheckedChange: () => {};
}
