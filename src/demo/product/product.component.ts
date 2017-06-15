import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import {
    TreeviewI18n, TreeviewItem, TreeviewConfig, TreeviewHelper, TreeviewComponent,
    TreeviewEventParser, OrderDownlineTreeviewEventParser, DownlineTreeviewItem
} from '../../lib';
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
    templateUrl: './product.component.html',
    providers: [
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
        let isRemoved = false;
        for (let i = 0; i < this.items.length; i++) {
            isRemoved = TreeviewHelper.removeItem(this.items[0], item);
            if (isRemoved) {
                break;
            }
        }

        if (isRemoved) {
            this.treeviewComponent.raiseSelectedChange();
        }
    }
}
