import { TreeviewItem } from './treeview-item';
import { TreeviewConfig } from './treeview-config';

export interface TreeviewItemTemplateContext {
    item: TreeviewItem;
    onCollapseExpand: () => void;
    onCheckedChange: () => void;
}
