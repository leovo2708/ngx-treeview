import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import {
    TreeviewI18n, TreeviewItem, TreeviewConfig, TreeviewHelper, TreeviewComponent,
    TreeviewEventParser, OrderDownlineTreeviewEventParser, DownlineTreeviewItem
} from 'ngx-treeview';
import { ProductService } from './product.service';

@Injectable()
export class ProductTreeviewConfig extends TreeviewConfig {
    isShowAllCheckBox = true;
    isShowFilter = true;
    isShowCollapseExpand = false;
    maxHeight = 500;
}

@Component({
    selector: 'ngx-product',
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
        <label class="form-check-label">
            <i class="fa fa-trash" aria-hidden="true" title="Remove" (click)="removeItem(item)"></i>
        </label>
    </div>
</ng-template>
<div class="row">
    <div class="col-6">
        <div class="form-group">
            <div class="d-inline-block">
                <ngx-treeview [items]="items" [template]="tpl" (selectedChange)="onSelectedChange($event)">
                </ngx-treeview>
            </div>
        </div>
    </div>
    <div class="col-6">
        <div class="alert alert-success" role="alert">
            Selected products:
            <div *ngFor="let row of rows">{{row}}</div>
        </div>
    </div>
</div>
`, providers: [
        ProductService,
        { provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser },
        { provide: TreeviewConfig, useClass: ProductTreeviewConfig }
    ]
})
export class ProductComponent implements OnInit {
    @ViewChild(TreeviewComponent) treeviewComponent: TreeviewComponent;
    items: TreeviewItem[];
    rows: string[];

    constructor(
        private service: ProductService
    ) { }

    ngOnInit() {
        this.items = this.service.getProducts();
    }

    onItemCheckedChange(item: TreeviewItem) {
        console.log(item);
    }

    onSelectedChange(downlineItems: DownlineTreeviewItem[]) {
        this.rows = [];
        downlineItems.forEach(downlineItem => {
            const item = downlineItem.item;
            const value = item.value;
            const texts = [item.text];
            let parent = downlineItem.parent;
            while (!_.isNil(parent)) {
                texts.push(parent.item.text);
                parent = parent.parent;
            }
            const reverseTexts = _.reverse(texts);
            const row = `${reverseTexts.join(' -> ')} : ${value}`;
            this.rows.push(row);
        });
    }

    removeItem(item: TreeviewItem) {
        TreeviewHelper.removeItem(item, this.items);
        this.treeviewComponent.raiseSelectedChange();
    }
}
