import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from '../../lib';
import { BookService } from './book.service';

@Component({
    selector: 'ngx-book',
    templateUrl: './book.component.html',
    providers: [
        BookService
    ]
})
export class BookComponent implements OnInit {
    enableButton = true;
    items: TreeviewItem[];
    values: number[];
    config: TreeviewConfig = {
        isShowAllCheckBox: true,
        isShowFilter: true,
        isShowCollapseExpand: true,
        maxHeight: 500
    };

    constructor(
        private service: BookService
    ) { }

    ngOnInit() {
        this.items = this.service.getBooks();
    }
}
