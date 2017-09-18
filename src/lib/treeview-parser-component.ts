import { TreeviewItem, TreeviewSelection } from './treeview-item';

export interface TreeviewParserComponent {
    items: TreeviewItem[];
    selection: TreeviewSelection;
}
