import { TreeviewItem } from './treeview-item';

export interface TreeviewParserComponent {
    items: TreeviewItem[];
    checkedItems: TreeviewItem[];
}
