import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import {
  TerminologyTreeviewItem,
  TerminologyTreeviewSelection,
} from '../model/terminology-treeview-item';
import { TerminologyTreeviewHeaderTemplateContext } from '../model/terminology-treeview-header-template-context';
import { TreeviewConfig } from '../model/treeview-config';
import { TerminologyTreeviewItemTemplateContext } from '../model/terminology-treeview-item-template-context';
import { TerminologyTreeviewI18n } from '../model/terminology-treeview-i18n';
import { TerminologyTreeviewEventParser } from '../helpers/terminology-treeview-event-parser';
import { isNil, includes } from 'lodash';
import { TerminologyTreeviewHelper } from '../helpers/terminology-treeview-helper';
import { TreeViewSelectHelperService } from '../services/tree-view-select-helper.service';
import { Subscription } from 'rxjs';

class FilterTreeviewItem extends TerminologyTreeviewItem {
  private readonly refItem: TerminologyTreeviewItem;
  constructor(item: TerminologyTreeviewItem) {
    super({
      meaning: item.meaning,
      id: item.id,
      disabled: item.disabled,
      checked: item.checked,
      collapsed: item.collapsed,
      children: item.children,
    });
    this.refItem = item;
  }

  updateRefChecked(): void {
    this.children.forEach(child => {
      if (child instanceof FilterTreeviewItem) {
        child.updateRefChecked();
      }
    });

    let refChecked = this.checked;
    if (refChecked) {
      for (const refChild of this.refItem.children) {
        if (!refChild.checked) {
          refChecked = false;
          break;
        }
      }
    }
    this.refItem.checked = refChecked;
  }
}

@Component({
  selector: 'edutr-terminology-tree-view',
  templateUrl: './terminology-tree-view.component.html',
  styleUrls: ['./terminology-tree-view.component.scss'],
})
export class TerminologyTreeViewComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input()
  headerTemplate: TemplateRef<TerminologyTreeviewHeaderTemplateContext>;
  @Input() itemTemplate: TemplateRef<TerminologyTreeviewItemTemplateContext>;
  @Input() items: TerminologyTreeviewItem[];
  @Input() config: TreeviewConfig;

  @Output() selectedChange = new EventEmitter<any[]>();
  @Output() filterChange = new EventEmitter<string>();

  headerTemplateContext: TerminologyTreeviewHeaderTemplateContext;
  selection: TerminologyTreeviewSelection;

  allItem: TerminologyTreeviewItem;
  filterText = '';
  filterItems: TerminologyTreeviewItem[];

  @Output() itemClicked = new EventEmitter<TerminologyTreeviewItem | any>();

  subscription: Subscription;
  constructor(
    public i18n: TerminologyTreeviewI18n,
    private defaultConfig: TreeviewConfig,
    private treeViewSelectHelperService: TreeViewSelectHelperService,
    private eventParser: TerminologyTreeviewEventParser
  ) {
    this.config = this.defaultConfig;
    this.allItem = new TerminologyTreeviewItem({
      meaning: 'All',
      id: undefined,
    });
  }

  get hasElementCheckBoxEnabled(): boolean {
    return this.config.hasElementCheckBox;
  }

  get hasFilterItems(): boolean {
    return !isNil(this.filterItems) && this.filterItems.length > 0;
  }

  get maxHeight(): string {
    return `${this.config.maxHeight}`;
  }

  ngOnInit(): void {
    this.createHeaderTemplateContext();
    this.generateSelection();
    this.subscription = this.treeViewSelectHelperService
      .getEdutrFilterTextChange()
      .subscribe(v => {
        if (v.value) {
          this.filterText = v.text;
          this.updateFilterItems();
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const itemsSimpleChange = changes.items;
    if (!isNil(itemsSimpleChange) && !isNil(this.items)) {
      this.updateFilterItems();
      this.updateCollapsedOfAll();
      this.raiseSelectedChange();
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onAllCollapseExpand(): void {
    this.allItem.collapsed = !this.allItem.collapsed;
    this.filterItems.forEach(item =>
      item.setCollapsedRecursive(this.allItem.collapsed)
    );
  }

  onFilterTextChange(text: string): void {
    this.filterText = text;
    this.filterChange.emit(text);
    this.updateFilterItems();
  }

  onAllCheckedChange(): void {
    const checked = this.allItem.checked;
    this.filterItems.forEach(item => {
      item.setCheckedRecursive(checked);
      if (item instanceof FilterTreeviewItem) {
        item.updateRefChecked();
      }
    });

    this.raiseSelectedChange();
  }

  onItemCheckedChange(item: TerminologyTreeviewItem, checked: boolean): void {
    if (item instanceof FilterTreeviewItem) {
      item.updateRefChecked();
    }

    this.raiseSelectedChange();
  }

  raiseSelectedChange(): void {
    this.generateSelection();
    const values = this.eventParser.getSelectedChange(this);
    setTimeout(() => {
      this.selectedChange.emit(values);
    });
  }

  private createHeaderTemplateContext(): void {
    this.headerTemplateContext = {
      config: this.config,
      item: this.allItem,
      onCheckedChange: () => this.onAllCheckedChange(),
      onCollapseExpand: () => this.onAllCollapseExpand(),
      onFilterTextChange: text => this.onFilterTextChange(text),
    };
  }

  private generateSelection(): void {
    let checkedItems: TerminologyTreeviewItem[] = [];
    let uncheckedItems: TerminologyTreeviewItem[] = [];
    if (!isNil(this.items)) {
      const selection = TerminologyTreeviewHelper.concatTerminologySelection(
        this.items,
        checkedItems,
        uncheckedItems
      );
      checkedItems = selection.checked;
      uncheckedItems = selection.unchecked;
    }

    this.selection = {
      checkedItems,
      uncheckedItems,
    };
  }

  private updateFilterItems(): void {
    if (this.filterText !== '' && this.filterText.length >= 3) {
      const filterItems: TerminologyTreeviewItem[] = [];
      const filterText = this.filterText.toLowerCase();
      this.items.forEach(item => {
        const newItem = this.filterItem(item, filterText);
        if (!isNil(newItem)) {
          filterItems.push(newItem);
        }
      });
      this.filterItems = filterItems;
    } else {
      this.filterItems = this.items;
    }

    this.updateCheckedOfAll();
  }

  private filterItem(
    item: TerminologyTreeviewItem,
    filterText: string
  ): TerminologyTreeviewItem {
    const isMatch = includes(item.meaning.toLowerCase(), filterText);
    if (isMatch) {
      return item;
    } else {
      if (!isNil(item.children)) {
        const children: TerminologyTreeviewItem[] = [];
        item.children.forEach(child => {
          const newChild = this.filterItem(child, filterText);
          if (!isNil(newChild)) {
            children.push(newChild);
          }
        });
        if (children.length > 0) {
          const newItem = new FilterTreeviewItem(item);
          newItem.collapsed = false;
          newItem.children = children;
          return newItem;
        }
      }
    }

    return undefined;
  }

  private updateCheckedOfAll(): void {
    let itemChecked: boolean = null;
    for (const filterItem of this.filterItems) {
      if (itemChecked === null) {
        itemChecked = filterItem?.checked;
      } else if (itemChecked !== filterItem?.checked) {
        itemChecked = undefined;
        break;
      }
    }

    if (itemChecked === null) {
      itemChecked = false;
    }

    this.allItem.checked = itemChecked;
  }

  private updateCollapsedOfAll(): void {
    let hasItemExpanded = false;
    for (const filterItem of this.filterItems) {
      if (!filterItem?.collapsed) {
        hasItemExpanded = true;
        break;
      }
    }

    this.allItem.collapsed = !hasItemExpanded;
  }

  onTreeItemClick(item: TerminologyTreeviewItem): void {
    if (!item.children || item.children.length === 0) {
      this.itemClicked.emit(item);
    }
  }
}
