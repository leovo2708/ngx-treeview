import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import * as _ from 'lodash';
import { TreeviewItem } from './treeview-item';
import { TreeviewItemTemplateContext } from './treeview-item-template-context';

@Component({
    selector: 'ngx-treeview-item',
    templateUrl: './treeview-item.component.html',
    styleUrls: ['./treeview-item.component.scss']
})
export class TreeviewItemComponent {
    @Input() template: TemplateRef<TreeviewItemTemplateContext>;
    @Input() item: TreeviewItem;
    @Output() checkedChange = new EventEmitter<boolean>();

    onCollapseExpand = () => {
        this.item.collapsed = !this.item.collapsed;
    }

    onCheckedChange = () => {
        const checked = this.item.checked;
        if (!_.isNil(this.item.children)) {
            this.item.children.forEach(child => child.setCheckedRecursive(checked));
        }
        this.checkedChange.emit(checked);
    }

    onChildCheckedChange(child: TreeviewItem, checked: boolean) {
        let itemChecked: boolean = null;
        for (let i = 0; i < this.item.children.length; i++) {
            if(itemChecked === null) {
                itemChecked = this.item.children[i].checked;
            }
            else if (itemChecked !== this.item.children[i].checked) {
                itemChecked = undefined;
                break;
            }
        }
        if(itemChecked === null) {
            itemChecked = false;
        }

        if (this.item.checked !== itemChecked) {
            this.item.checked = itemChecked;
        }
        this.checkedChange.emit(checked);
    }
}
