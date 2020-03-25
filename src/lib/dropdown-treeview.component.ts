﻿import { Component, EventEmitter, Input, Output, HostListener, ViewChild, TemplateRef } from '@angular/core';
import { TreeviewI18n } from './treeview-i18n';
import { TreeviewItem } from './treeview-item';
import { TreeviewConfig } from './treeview-config';
import { TreeviewComponent } from './treeview.component';
import { DropdownDirective } from './dropdown.directive';
import { TreeviewHeaderTemplateContext } from './treeview-header-template-context';
import { TreeviewItemTemplateContext } from './treeview-item-template-context';
import {faCaretDown, faCaretRight} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'ngx-dropdown-treeview',
    templateUrl: './dropdown-treeview.component.html',
    styleUrls: ['./dropdown-treeview.component.scss']
})
export class DropdownTreeviewComponent {
    @Input() buttonClass = 'btn-outline-secondary';
    @Input() headerTemplate: TemplateRef<TreeviewHeaderTemplateContext>;
    @Input() itemTemplate: TemplateRef<TreeviewItemTemplateContext>;
    @Input() items: TreeviewItem[];
    @Input() config: TreeviewConfig;
    @Output() selectedChange = new EventEmitter<any[]>(true);
    @Output() filterChange = new EventEmitter<string>();
    @ViewChild(TreeviewComponent, {static: true}) treeviewComponent: TreeviewComponent;
    @ViewChild(DropdownDirective, {static: false}) dropdownDirective: DropdownDirective;

    constructor(
        public i18n: TreeviewI18n,
        private defaultConfig: TreeviewConfig
    ) {
        this.config = this.defaultConfig;
    }

    getText(): string {
        return this.i18n.getText(this.treeviewComponent.selection);
    }

    onSelectedChange(values: any[]) {
        this.selectedChange.emit(values);
    }

    onFilterChange(text: string) {
      this.filterChange.emit(text);
    }
}
