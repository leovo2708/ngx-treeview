import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { isNil, remove, reverse } from 'lodash';
import {
    TreeviewI18n, TreeviewItem, TreeviewConfig, TreeviewHelper, TreeviewComponent,
    TreeviewEventParser, OrderDownlineTreeviewEventParser, DownlineTreeviewItem
} from '../../lib';
import { ProductService } from './product.service';
import {faCaretDown, faCaretRight} from '@fortawesome/free-solid-svg-icons';

@Injectable()
export class ProductTreeviewConfig extends TreeviewConfig {
    hasAllCheckBox = true;
    hasFilter = true;
    hasCollapseExpand = false;
    maxHeight = 400;
}

@Component({
    selector: 'ngx-product',
    styleUrls: ['./product.component.scss'],
    templateUrl: './product.component.html',
    providers: [
        ProductService,
        { provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser },
        { provide: TreeviewConfig, useClass: ProductTreeviewConfig }
    ]
})
export class ProductComponent implements OnInit {
  @ViewChild(TreeviewComponent, {static: false}) treeviewComponent: TreeviewComponent;
  items: TreeviewItem[];
  rows: string[];
  public icons = {
    caretDown: faCaretDown,
    caretRight: faCaretRight
  };


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
            while (!isNil(parent)) {
                texts.push(parent.item.text);
                parent = parent.parent;
            }
            const reverseTexts = reverse(texts);
            const row = `${reverseTexts.join(' -> ')} : ${value}`;
            this.rows.push(row);
        });
    }

    removeItem(item: TreeviewItem) {
        let isRemoved = false;
        for (const tmpItem of this.items) {
            if (tmpItem === item) {
                remove(this.items, item);
            } else {
                isRemoved = TreeviewHelper.removeItem(tmpItem, item);
                if (isRemoved) {
                    break;
                }
            }
        }

        if (isRemoved) {
            this.treeviewComponent.raiseSelectedChange();
        }
    }
}
