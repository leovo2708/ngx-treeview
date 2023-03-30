import { TerminologyTreeviewItem } from './terminology-treeview-item';

export interface TerminologyTreeviewItemTemplateContext {
  item: TerminologyTreeviewItem;
  onCollapseExpand: () => void;
  onCheckedChange: () => void;
}
