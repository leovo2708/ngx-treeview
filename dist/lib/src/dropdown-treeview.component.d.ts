import { EventEmitter, TemplateRef } from '@angular/core';
import { TreeviewI18n } from './treeview-i18n';
import { TreeviewItem } from './treeview-item';
import { TreeviewConfig } from './treeview-config';
import { TreeviewComponent } from './treeview.component';
import { DropdownDirective } from './dropdown.directive';
import { TreeviewHeaderTemplateContext } from './treeview-header-template-context';
import { TreeviewItemTemplateContext } from './treeview-item-template-context';
export declare class DropdownTreeviewComponent {
    i18n: TreeviewI18n;
    private defaultConfig;
    buttonClass: string;
    headerTemplate: TemplateRef<TreeviewHeaderTemplateContext>;
    itemTemplate: TemplateRef<TreeviewItemTemplateContext>;
    items: TreeviewItem[];
    config: TreeviewConfig;
    selectedChange: EventEmitter<any[]>;
    treeviewComponent: TreeviewComponent;
    dropdownDirective: DropdownDirective;
    constructor(i18n: TreeviewI18n, defaultConfig: TreeviewConfig);
    getText(): string;
    onSelectedChange(values: any[]): void;
}
