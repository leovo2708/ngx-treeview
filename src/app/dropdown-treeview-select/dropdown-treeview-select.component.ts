import { Component, Injectable, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { isNil } from 'lodash';
import { TreeviewI18n, TreeviewItem, TreeviewConfig, DropdownTreeviewComponent, TreeviewHelper } from 'ngx-treeview';
import { DropdownTreeviewSelectI18n } from './dropdown-treeview-select-i18n';

@Component({
  selector: 'ngx-dropdown-treeview-select',
  templateUrl: './dropdown-treeview-select.component.html',
  styleUrls: [
    './dropdown-treeview-select.component.scss'
  ],
  providers: [
    { provide: TreeviewI18n, useClass: DropdownTreeviewSelectI18n }
  ]
})
export class DropdownTreeviewSelectComponent implements OnChanges {
  @Input() config: TreeviewConfig;
  @Input() items: TreeviewItem[];
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();
  @ViewChild(DropdownTreeviewComponent, { static: false }) dropdownTreeviewComponent: DropdownTreeviewComponent;
  filterText: string;
  private dropdownTreeviewSelectI18n: DropdownTreeviewSelectI18n;

  constructor(
    public i18n: TreeviewI18n
  ) {
    this.config = TreeviewConfig.create({
      hasAllCheckBox: false,
      hasCollapseExpand: false,
      hasFilter: true,
      maxHeight: 500
    });
    this.dropdownTreeviewSelectI18n = i18n as DropdownTreeviewSelectI18n;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isNil(this.value)) {
      this.selectAll();
    } else {
      this.updateSelectedItem();
    }
  }

  select(item: TreeviewItem): void {
    if (item.children === undefined) {
      this.selectItem(item);
    }
  }

  private updateSelectedItem(): void {
    if (!isNil(this.items)) {
      const selectedItem = TreeviewHelper.findItemInList(this.items, this.value);
      if (selectedItem) {
        this.selectItem(selectedItem);
      } else {
        this.selectAll();
      }
    }
  }

  private selectItem(item: TreeviewItem): void {
    if (this.dropdownTreeviewSelectI18n.selectedItem !== item) {
      this.dropdownTreeviewSelectI18n.selectedItem = item;
      if (this.value !== item.value) {
        this.value = item.value;
        this.valueChange.emit(item.value);
      }
    }
  }

  private selectAll(): void {
    const allItem = this.dropdownTreeviewComponent.treeviewComponent.allItem;
    this.selectItem(allItem);
  }
}
