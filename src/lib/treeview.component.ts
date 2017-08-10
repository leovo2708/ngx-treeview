import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges, TemplateRef } from '@angular/core';
import * as _ from 'lodash';
import { TreeviewI18n } from './treeview-i18n';
import { TreeviewItem } from './treeview-item';
import { TreeviewConfig } from './treeview-config';
import { TreeviewEventParser } from './treeview-event-parser';
import { TreeviewHeaderTemplateContext } from './treeview-header-template-context';
import { TreeviewItemTemplateContext } from './treeview-item-template-context';
import { TreeviewParserComponent } from './treeview-parser-component';

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
export class TreeviewComponent implements OnChanges, TreeviewParserComponent {
    @Input() headerTemplate: TemplateRef<TreeviewHeaderTemplateContext>;
    @Input() itemTemplate: TemplateRef<TreeviewItemTemplateContext>;
    @Input() items: TreeviewItem[];
    @Input() config: TreeviewConfig;
    @Output() selectedChange = new EventEmitter<any[]>();
    headerTemplateContext: TreeviewHeaderTemplateContext;
    allItem: TreeviewItem;
    filterText = '';
    filterItems: TreeviewItem[];
    checkedItems: TreeviewItem[];

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
                this.updateCollapsedAll();
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
        this.updateFilterItems();
    }

    onAllCheckedChange(checked: boolean) {
        this.filterItems.forEach(item => {
            item.setCheckedRecursive(checked);
            if (item instanceof FilterTreeviewItem) {
                item.updateRefChecked();
            }
        });

        this.raiseSelectedChange();
    }

    onItemCheckedChange(item: TreeviewItem, checked: boolean) {
        if (this.allItem.checked !== checked) {
            let allItemChecked = true;
            for (const filterItem of this.filterItems) {
                if (!filterItem.checked) {
                    allItemChecked = false;
                    break;
                }
            }

            if (this.allItem.checked !== allItemChecked) {
                this.allItem.checked = allItemChecked;
            }
        }

        if (item instanceof FilterTreeviewItem) {
            item.updateRefChecked();
        }

        this.raiseSelectedChange();
    }

    raiseSelectedChange() {
        this.checkedItems = this.getCheckedItems();
        const values = this.eventParser.getSelectedChange(this);
        this.selectedChange.emit(values);
    }

    private createHeaderTemplateContext() {
        this.headerTemplateContext = {
            config: this.config,
            item: this.allItem,
            onCheckedChange: (checked) => this.onAllCheckedChange(checked),
            onCollapseExpand: () => this.onAllCollapseExpand(),
            onFilterTextChange: (text) => this.onFilterTextChange(text)
        };
    }

    private getCheckedItems(): TreeviewItem[] {
        let checkedItems: TreeviewItem[] = [];
        if (!_.isNil(this.items)) {
            for (const item of this.items) {
                checkedItems = _.concat(checkedItems, item.getCheckedItems());
            }
        }

        return checkedItems;
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

        this.updateCheckedAll();
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

    private updateCheckedAll() {
        let hasItemUnchecked = false;
        for (const filterItem of this.filterItems) {
            if (!filterItem.checked) {
                hasItemUnchecked = true;
                break;
            }
        }

        if (this.allItem.checked === hasItemUnchecked) {
            this.allItem.checked = !hasItemUnchecked;
        }
    }

    private updateCollapsedAll() {
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
