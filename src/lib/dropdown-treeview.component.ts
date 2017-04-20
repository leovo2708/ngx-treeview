import { Component, EventEmitter, Input, Output, HostListener, ViewChild, TemplateRef } from '@angular/core';
import * as _ from 'lodash';
import { TreeviewI18n } from './treeview-i18n';
import { TreeviewItem } from './treeview-item';
import { TreeviewConfig } from './treeview-config';
import { TreeviewComponent } from './treeview.component';
import { TreeviewItemTemplateContext } from './treeview-item-template-context';

@Component({
    selector: 'ngx-dropdown-treeview',
    template: `
<div class="dropdown" [class.show]="isOpen">
    <button class="btn btn-secondary dropdown-toggle" type="button" role="button" (click)="onButtonClick($event)"
        aria-haspopup="true" aria-expanded="false">
        {{getText()}}
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" (click)="$event.stopPropagation()">
        <div class="dropdown-container">
            <ngx-treeview [items]="items" [template]="template" [config]="config" (selectedChange)="onSelectedChange($event)">
            </ngx-treeview>
        </div>
    </div>
</div>
    `,
    styles: [`
.dropdown {
    width: 100%;
    display: inline-block;
}
.dropdown button {
    width: 100%;
    margin-right: .9rem;
    text-align: left;
}
.dropdown button::after {
    position: absolute;
    right: .6rem;
    margin-top: .6rem;
}
.dropdown .dropdown-menu .row {
    padding: 2px 10px;
}
.dropdown .dropdown-menu .dropdown-item-collapse-expand {
    padding: 0;
}
.dropdown .dropdown-menu .dropdown-container {
    padding: 0 .6rem;
}
    `]
})
export class DropdownTreeviewComponent {
    @Input() template: TemplateRef<TreeviewItemTemplateContext>;
    @Input() items: TreeviewItem[];
    @Input() config: TreeviewConfig;
    @Output() hide = new EventEmitter();
    @Output() selectedChange = new EventEmitter<any[]>(true);
    @ViewChild(TreeviewComponent) treeviewComponent: TreeviewComponent;
    isOpen = false;
    private mouseEvent: MouseEvent;

    constructor(
        public i18n: TreeviewI18n,
        private defaultConfig: TreeviewConfig
    ) {
        this.config = this.defaultConfig;
    }

    @HostListener('keyup.esc') onKeyupEsc() {
        this.isOpen = false;
    }
    @HostListener('document:click', ['$event']) onDocumentClick(event: MouseEvent) {
        if (this.mouseEvent !== event) {
            this.isOpen = false;
        }
    }

    get hasItems(): boolean {
        return !_.isNil(this.items) && this.items.length > 0;
    }

    getText(): string {
        if (this.treeviewComponent) {
            return this.i18n.getText(this.treeviewComponent.checkedItems, this.treeviewComponent.allItem.checked);
        }

        return '';
    }

    onSelectedChange(values: any[]) {
        this.selectedChange.emit(values);
    }

    onButtonClick(event: MouseEvent) {
        this.mouseEvent = event;
        this.isOpen = !this.isOpen;
        if (!this.isOpen) {
            this.hide.emit();
        }
    }
}
