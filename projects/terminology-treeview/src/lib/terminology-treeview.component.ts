import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { TreeviewConfig } from './model/treeview-config';
import { TerminologyTreeviewItemTemplateContext } from './model/terminology-treeview-item-template-context';
import { TerminologyTreeviewItem } from './model/terminology-treeview-item';

@Component({
  selector: 'edutr-terminology-treeview',
  template: ` <edutr-terminology-tree-main></edutr-terminology-tree-main>`,
  styles: [],
})
export class TerminologyTreeviewComponent {
  @Input() config: TreeviewConfig;
  @Input() template: TemplateRef<TerminologyTreeviewItemTemplateContext>;
  @Input() item: TerminologyTreeviewItem;
  @Output() checkedChange = new EventEmitter<boolean>();
  constructor() {}
}
