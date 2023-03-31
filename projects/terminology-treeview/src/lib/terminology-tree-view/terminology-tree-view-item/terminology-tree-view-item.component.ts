import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { TreeviewConfig } from '../../model/treeview-config';
import { TerminologyTreeviewItemTemplateContext } from '../../model/terminology-treeview-item-template-context';
import { TerminologyTreeviewItem } from '../../model/terminology-treeview-item';
import { isNil } from 'lodash';

@Component({
  selector: 'edutr-terminology-tree-view-item',
  templateUrl: './terminology-tree-view-item.component.html',
  styleUrls: ['./terminology-tree-view-item.component.scss'],
})
export class TerminologyTreeViewItemComponent {
  @Input() config: TreeviewConfig;
  @Input() template: TemplateRef<TerminologyTreeviewItemTemplateContext>;
  @Input() item: TerminologyTreeviewItem;
  @Output() checkedChange = new EventEmitter<boolean>();

  constructor(private defaultConfig: TreeviewConfig) {
    this.config = this.defaultConfig;
  }

  onCollapseExpand = () => {
    this.item.collapsed = !this.item.collapsed;
  };

  onCheckedChange = () => {
    const checked = this.item.checked;
    if (!isNil(this.item.children) && !this.config.decoupleChildFromParent) {
      this.item.children.forEach(child => child.setCheckedRecursive(checked));
    }
    this.checkedChange.emit(checked);
  };

  onChildCheckedChange(child: TerminologyTreeviewItem, checked: boolean): void {
    if (!this.config.decoupleChildFromParent) {
      let itemChecked: boolean = null;
      for (const childItem of this.item.children) {
        if (itemChecked === null) {
          itemChecked = childItem.checked;
        } else if (itemChecked !== childItem.checked) {
          itemChecked = undefined;
          break;
        }
      }

      if (itemChecked === null) {
        itemChecked = false;
      }

      if (this.item.checked !== itemChecked) {
        this.item.checked = itemChecked;
      }
    }

    this.checkedChange.emit(checked);
  }
}
