import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges, TemplateRef } from '@angular/core';
import * as _ from 'lodash';
import { TreeviewI18n } from './treeview-i18n';
import { TreeviewItem } from './treeview-item';
import { TreeviewConfig } from './treeview-config';
import { TreeviewEventParser } from './treeview-event-parser';
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
        if (!_.isNil(this.children)) {
            this.children.forEach(child => {
                if (child instanceof FilterTreeviewItem) {
                    child.updateRefChecked();
                }
            });
        }

        let refChecked = this.checked;
        if (!_.isNil(this.refItem.children)) {
            for (let i = 0; i < this.refItem.children.length; i++) {
                const refChild = this.refItem.children[i];
                if (refChild instanceof FilterTreeviewItem) {
                    refChild.updateRefChecked();
                }
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
    template: `
<ng-template #tpl let-item="item"
    let-toggleCollapseExpand="toggleCollapseExpand"
    let-onCheckedChange="onCheckedChange">
    <div class="form-check">
        <i *ngIf="item.children" (click)="toggleCollapseExpand()" aria-hidden="true"
            class="fa" [class.fa-caret-right]="item.collapsed" [class.fa-caret-down]="!item.collapsed"></i>
        <label class="form-check-label">
            <input type="checkbox" class="form-check-input"
                [(ngModel)]="item.checked" (ngModelChange)="onCheckedChange()" [disabled]="item.disabled" />
            {{item.text}}
        </label>
    </div>
</ng-template>
<div class="treeview-header">
    <div *ngIf="config.isShowFilter" class="row">
        <div class="col-12">
            <input class="form-control" type="text" [placeholder]="i18n.filterPlaceholder()"
                [(ngModel)]="filterText" (ngModelChange)="onFilterTextChange()" />
        </div>
    </div>
    <div *ngIf="hasFilterItems">
        <div *ngIf="config.isShowAllCheckBox || config.isShowCollapseExpand" class="row">
            <div class="col-12" [class.row-margin]="config.isShowFilter && (config.isShowAllCheckBox || config.isShowCollapseExpand)">
                <label *ngIf="config.isShowAllCheckBox" class="form-check-label label-item-all">
                    <input type="checkbox" class="form-check-input"
                        [(ngModel)]="allItem.checked" (ngModelChange)="onAllCheckedChange($event)" />
                        {{i18n.allCheckboxText()}}
                </label>
                <label *ngIf="config.isShowCollapseExpand" class="pull-right label-collapse-expand" (click)="toggleCollapseExpand()">
                    <i [title]="i18n.tooltipCollapseExpand(allItem.collapsed)" aria-hidden="true"
                        class="fa" [class.fa-expand]="allItem.collapsed" [class.fa-compress]="!allItem.collapsed"></i>
                </label>
            </div>
        </div>
        <div *ngIf="config.isShowFilter || config.isShowAllCheckBox || config.isShowCollapseExpand" class="divider"></div>
    </div>
</div>
<div class="treeview-container" [style.max-height.px]="maxHeight">
    <div *ngFor="let item of filterItems">
        <ngx-treeview-item [item]="item" [template]="template || tpl" (checkedChange)="onItemCheckedChange(item, $event)">
        </ngx-treeview-item>
    </div>
</div>
<div *ngIf="!hasFilterItems" class="treeview-text">
    {{i18n.filterNoItemsFoundText()}}
</div>`,
    styles: [`
.row-margin {
    margin-top: .3rem;
}
.label-item-all {
}
.label-collapse-expand {
    margin: 0;
    padding: 0 .3rem;
    cursor: pointer;
}
.divider {
    height: 1px;
    margin: 0.5rem 0;
    overflow: hidden;
    background: #000;
}
.treeview-container {
    overflow-x: hidden;
    overflow-y: auto;
    padding-right: 18px;
}
.treeview-text {
    padding: .3rem 0;
    white-space: nowrap;
}
`]
})
export class TreeviewComponent implements OnChanges {
    @Input() template: TemplateRef<TreeviewItemTemplateContext>;
    @Input() items: TreeviewItem[];
    @Input() config: TreeviewConfig;
    @Output() selectedChange = new EventEmitter<any[]>();
    allItem: TreeviewItem;
    filterText: string;
    filterItems: TreeviewItem[];
    checkedItems: TreeviewItem[];

    constructor(
        public i18n: TreeviewI18n,
        private defaultConfig: TreeviewConfig,
        private eventParser: TreeviewEventParser
    ) {
        this.config = this.defaultConfig;
        this.allItem = new TreeviewItem({ text: 'All', value: undefined });
    }

    get hasItems(): boolean {
        return !_.isNil(this.items) && this.items.length > 0;
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
            this.updateFilterItems();
            this.updateCollapsedAll();
            this.raiseSelectedChange();
        }
    }

    toggleCollapseExpand() {
        this.allItem.collapsed = !this.allItem.collapsed;
        if (!_.isNil(this.filterItems)) {
            this.filterItems.forEach(item => item.setCollapsedRecursive(this.allItem.collapsed));
        }
    }

    onFilterTextChange() {
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
            for (let i = 0; i < this.filterItems.length; i++) {
                if (!this.filterItems[i].checked) {
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

    private getCheckedItems(): TreeviewItem[] {
        let checkedItems: TreeviewItem[] = [];
        if (!_.isNil(this.items)) {
            for (let i = 0; i < this.items.length; i++) {
                checkedItems = _.concat(checkedItems, this.items[i].getCheckedItems());
            }
        }

        return checkedItems;
    }

    private updateFilterItems() {
        if (!_.isNil(this.items) && _.isString(this.filterText) && this.filterText !== '') {
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
                let checkedCount = 0;
                if (!_.isNil(item.children)) {
                    item.children.forEach(child => {
                        const newChild = this.filterItem(child, filterText);
                        if (!_.isNil(newChild)) {
                            children.push(newChild);
                            if (newChild.checked) {
                                checkedCount++;
                            }
                        }
                    });
                    if (children.length > 0) {
                        const newItem = new FilterTreeviewItem(item);
                        newItem.children = children;
                        return newItem;
                    }
                }
            }
        }

        return undefined;
    }

    private updateCheckedAll() {
        if (!_.isNil(this.filterItems)) {
            let hasItemUnchecked = false;
            for (let i = 0; i < this.filterItems.length; i++) {
                if (!this.filterItems[i].checked) {
                    hasItemUnchecked = true;
                    break;
                }
            }

            if (this.allItem.checked === hasItemUnchecked) {
                this.allItem.checked = !hasItemUnchecked;
            }
        }
    }

    private updateCollapsedAll() {
        let hasItemExpanded = false;
        if (!_.isNil(this.filterItems)) {
            for (let i = 0; i < this.filterItems.length; i++) {
                if (!this.filterItems[i].collapsed) {
                    hasItemExpanded = true;
                    break;
                }
            }
        }
        this.allItem.collapsed = !hasItemExpanded;
    }
}
