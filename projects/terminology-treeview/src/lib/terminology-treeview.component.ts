import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { TreeviewConfig } from './model/treeview-config';
import { TerminologyTreeviewItemTemplateContext } from './model/terminology-treeview-item-template-context';
import { TerminologyTreeviewItem } from './model/terminology-treeview-item';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'edutr-terminology-treeview',
  templateUrl: './terminology-treeview.component.html',
  styles: [],
})
export class TerminologyTreeviewComponent {
  @Input() config: TreeviewConfig = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 400,
    hasElementCheckBox: false,
  });
  @Input() template: TemplateRef<TerminologyTreeviewItemTemplateContext>;
  @Input() items: TerminologyTreeviewItem;
  @Output() checkedChange = new EventEmitter<boolean>();
  @Output() selectedChange = new EventEmitter<any[]>();
  @Output() filterChange = new EventEmitter<string>();
  values: number[];

  constructor() {}

  onFilterChange(value: string): void {
    console.log('filter:', value);
  }
}
