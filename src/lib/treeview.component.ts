import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges, TemplateRef } from '@angular/core';
import * as _ from 'lodash';
import { TreeviewI18n } from './treeview-i18n';
import { TreeviewItem, TreeviewSelection } from './treeview-item';
import { TreeviewConfig } from './treeview-config';
import { TreeviewEventParser } from './treeview-event-parser';
import { TreeviewHeaderTemplateContext } from './treeview-header-template-context';
import { TreeviewItemTemplateContext } from './treeview-item-template-context';

class FilterTreeviewItem extends TreeviewItem {
    private readonly refItem: TreeviewItem;
    constructor(item: TreeviewItem) {
        super({
            text: item.text,
            value: item.value,
            disabled: item.disabled,
            checked: item.checked,
            collapsed: item.collapsed,
            children: item.children
        });
        this.refItem = item;
    }

    updateRefChecked() {
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
    selector: 'ngx-treeview',
    templateUrl: './treeview.component.html',
    styleUrls: ['./treeview.component.scss']
})
export class TreeviewComponent implements OnChanges {
    @Input() headerTemplate: TemplateRef<TreeviewHeaderTemplateContext>;
    @Input() itemTemplate: TemplateRef<TreeviewItemTemplateContext>;
    @Input() items: TreeviewItem[];
    @Input() config: TreeviewConfig;
    @Output() selectedChange = new EventEmitter<any[]>();
    @Output() filterChange = new EventEmitter<string>();
    headerTemplateContext: TreeviewHeaderTemplateContext;
    allItem: TreeviewItem;
    filterText = '';
    filterItems: TreeviewItem[];
    selection: TreeviewSelection;

    constructor(
        public i18n: TreeviewI18n,
        private defaultConfig: TreeviewConfig,
        private eventParser: TreeviewEventParser
    ) {
        this.config = this.defaultConfig;
        this.allItem = new TreeviewItem({ text: 'All', value: undefined });
        this.createHeaderTemplateContext();
    }

    get hasFilterItems(): boolean {
        return !_.isNil(this.filterItems) && this.filterItems.length > 0;
    }

    get maxHeight(): string {
        return `${this.config.maxHeight}`;
    }

    ngOnChanges(changes: SimpleChanges) {
        const itemsSimpleChange = changes['items'];
        if (!_.isNil(itemsSimpleChange)) {
            if (!_.isNil(this.items)) {
                this.updateFilterItems();
                this.updateCollapsedOfAll();
                this.raiseSelectedChange();
            }
        }
        this.createHeaderTemplateContext();
    }

    onAllCollapseExpand() {
        this.allItem.collapsed = !this.allItem.collapsed;
        this.filterItems.forEach(item => item.setCollapsedRecursive(this.allItem.collapsed));
    }

    onFilterTextChange(text: string) {
        this.filterText = text;
        this.filterChange.emit(text);
        this.updateFilterItems();
    }

    onAllCheckedChange() {
        const checked = this.allItem.checked;
        this.filterItems.forEach(item => {
            item.setCheckedRecursive(checked);
            if (item instanceof FilterTreeviewItem) {
                item.updateRefChecked();
            }
        });

        this.raiseSelectedChange();
    }

    onItemCheckedChange(item: TreeviewItem, checked: boolean) {
        if (item instanceof FilterTreeviewItem) {
            item.updateRefChecked();
        }

        this.updateCheckedOfAll();
        this.raiseSelectedChange();
    }

    raiseSelectedChange() {
        this.generateSelection();
        const values = this.eventParser.getSelectedChange(this);
        this.selectedChange.emit(values);
    }

    private createHeaderTemplateContext() {
        this.headerTemplateContext = {
            config: this.config,
            item: this.allItem,
            onCheckedChange: () => this.onAllCheckedChange(),
            onCollapseExpand: () => this.onAllCollapseExpand(),
            onFilterTextChange: (text) => this.onFilterTextChange(text)
        };
    }

    private generateSelection() {
        let checkedItems: TreeviewItem[] = [];
        let uncheckedItems: TreeviewItem[] = [];
        if (!_.isNil(this.items)) {
            for (const item of this.items) {
                const selection = item.getSelection();
                checkedItems = _.concat(checkedItems, selection.checkedItems);
                uncheckedItems = _.concat(uncheckedItems, selection.uncheckedItems);
            }
        }

        this.selection = {
            checkedItems: checkedItems,
            uncheckedItems: uncheckedItems
        };
    }

    private updateFilterItems() {
        if (this.filterText !== '') {
            const filterItems: TreeviewItem[] = [];
            const filterText = this.filterText.toLowerCase();
            this.items.forEach(item => {
                const newItem = this.filterItem(item, filterText);
                if (!_.isNil(newItem)) {
                    filterItems.push(newItem);
                }
            });
            this.filterItems = filterItems;
        } else {
            this.filterItems = this.items;
        }

        this.updateCheckedOfAll();
    }

    private filterItem(item: TreeviewItem, filterText: string): TreeviewItem {
        const isMatch = _.includes(item.text.toLowerCase(), filterText);
        if (isMatch) {
            return item;
        } else {
            if (!_.isNil(item.children)) {
                const children: TreeviewItem[] = [];
                item.children.forEach(child => {
                    const newChild = this.filterItem(child, filterText);
                    if (!_.isNil(newChild)) {
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

    private updateCheckedOfAll() {
        let itemChecked: boolean = null;
        for (const filterItem of this.filterItems) {
            if (itemChecked === null) {
                itemChecked = filterItem.checked;
            } else if (itemChecked !== filterItem.checked) {
                itemChecked = undefined;
                break;
            }
        }

        if (itemChecked === null) {
            itemChecked = false;
        }

        this.allItem.checked = itemChecked;
    }

    private updateCollapsedOfAll() {
        let hasItemExpanded = false;
        for (const filterItem of this.filterItems) {
            if (!filterItem.collapsed) {
                hasItemExpanded = true;
                break;
            }
        }

        this.allItem.collapsed = !hasItemExpanded;
    }
}
