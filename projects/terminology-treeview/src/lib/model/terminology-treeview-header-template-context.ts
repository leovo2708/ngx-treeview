import { TreeviewConfig } from './treeview-config';
import { TerminologyTreeviewItem } from './terminology-treeview-item';

export interface TerminologyTreeviewHeaderTemplateContext {
  config: TreeviewConfig;
  item: TerminologyTreeviewItem;
  onCollapseExpand: () => void;
  onCheckedChange: (checked: boolean) => void;
  onFilterTextChange: (text: string) => void;
}
