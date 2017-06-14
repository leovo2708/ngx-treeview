import { Component, EventEmitter, Input, Output, HostListener, ViewChild, TemplateRef } from '@angular/core';
import * as _ from 'lodash';
import { TreeviewI18n } from './treeview-i18n';
import { TreeviewItem } from './treeview-item';
import { TreeviewConfig } from './treeview-config';
import { TreeviewComponent } from './treeview.component';
import { TreeviewItemTemplateContext } from './treeview-item-template-context';

@Component({
    selector: 'ngx-dropdown-treeview',
    templateUrl: './dropdown-treeview.component.html',
    styleUrls: ['./dropdown-treeview.component.scss']
})
export class DropdownTreeviewComponent {
    @Input() template: TemplateRef<TreeviewItemTemplateContext>;
    @Input() items: TreeviewItem[];
    @Input() config: TreeviewConfig;
    @Output() selectedChange = new EventEmitter<any[]>(true);
    @ViewChild(TreeviewComponent) treeviewComponent: TreeviewComponent;

    constructor(
        public i18n: TreeviewI18n,
        private defaultConfig: TreeviewConfig
    ) {
        this.config = this.defaultConfig;
    }

    getText(): string {
        return this.i18n.getText(this.treeviewComponent.checkedItems, this.treeviewComponent.allItem.checked);
    }

    onSelectedChange(values: any[]) {
        this.selectedChange.emit(values);
    }
}
