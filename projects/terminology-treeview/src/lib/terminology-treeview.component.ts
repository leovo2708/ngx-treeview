import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { TreeviewConfig } from './model/treeview-config';
import { TerminologyTreeviewItemTemplateContext } from './model/terminology-treeview-item-template-context';
import { TerminologyTreeviewItem } from './model/terminology-treeview-item';

@Component({
  selector: 'edutr-terminology-treeview',
  templateUrl: './terminology-treeview.component.html',
  styles: [],
})
export class TerminologyTreeviewComponent implements OnInit {
  @Input() edutrSelectedItems: {
    id: string;
    name: string;
    nameAggregated: string;
  }[] = [];
  @Input() edutrConfig: TreeviewConfig = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 400,
    hasElementCheckBox: false,
  });
  @Input() edutrTemplate: TemplateRef<TerminologyTreeviewItemTemplateContext>;
  @Input() edutrItems: TerminologyTreeviewItem;

  @Output() edutrCheckedChange = new EventEmitter<boolean>();
  @Output() edutrSelectedChange = new EventEmitter<TerminologyTreeviewItem[]>();
  @Output() edutrFilterChange = new EventEmitter<string>();

  values: number[];

  edutrTermSelectedItems: TerminologyTreeviewItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.mapSelectedItemsToTermTree();
  }

  onFilterChange(value: string): void {
    console.log('filter:', value);
  }

  onEdutrSelectedChange(items: TerminologyTreeviewItem[]) {
    this.edutrSelectedChange.emit(items);
  }

  mapSelectedItemsToTermTree() {
    if (this.edutrSelectedItems && this.edutrSelectedItems.length > 0) {
      this.edutrSelectedItems.map((s, i) => {
        const termTreeItem = new TerminologyTreeviewItem({
          meaning: s.name,
          id: s.id,
        });
        this.edutrTermSelectedItems.push(termTreeItem);
      });
    }
  }
}
