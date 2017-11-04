import { EventEmitter, TemplateRef } from '@angular/core';
import { TreeviewItem } from './treeview-item';
import { TreeviewConfig } from './treeview-config';
import { TreeviewItemTemplateContext } from './treeview-item-template-context';
export declare class TreeviewItemComponent {
    private defaultConfig;
    config: TreeviewConfig;
    template: TemplateRef<TreeviewItemTemplateContext>;
    item: TreeviewItem;
    itemsContainerClass: string;
    checkedChange: EventEmitter<boolean>;
    constructor(defaultConfig: TreeviewConfig);
    onCollapseExpand: () => void;
    onCheckedChange: () => void;
    onChildCheckedChange(child: TreeviewItem, checked: boolean): void;
}
