import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import {
    TreeviewI18n, TreeviewItem, TreeviewConfig, TreeviewHelper, TreeviewComponent,
    TreeviewEventParser, DownlineTreeviewItem, TreeviewI18nDefault
} from '../../lib';

export class DropdownTreeviewSelectI18n extends TreeviewI18nDefault {
    private _selectedItem: TreeviewItem;

    set selectedItem(value: TreeviewItem) {
        if (value && value.children === undefined) {
            this._selectedItem = value;
        }
    }

    get selectedItem(): TreeviewItem {
        return this._selectedItem;
    }

    getText(checkededItems: TreeviewItem[], isAll: boolean): string {
        return this._selectedItem ? this._selectedItem.text : 'All';
    }
}

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
export class DropdownTreeviewSelectComponent {
    @Input() config: TreeviewConfig;
    @Input() items: TreeviewItem[];
    @Output() selectedChange = new EventEmitter<TreeviewItem>();
    filterText: string;
    private dropdownTreeviewSelectI18n: DropdownTreeviewSelectI18n;

    constructor(
        public i18n: TreeviewI18n
    ) {
        this.dropdownTreeviewSelectI18n = i18n as DropdownTreeviewSelectI18n;
    }

    select(item: TreeviewItem) {
        if (item.children === undefined) {
            this.dropdownTreeviewSelectI18n.selectedItem = item;
            this.selectedChange.emit(item);
        }
    }
}
