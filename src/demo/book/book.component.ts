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
    items: TreeviewItem[];
    values: number[];

    constructor(
        private service: BookService,
        private config: TreeviewConfig
    ) {
        config.hasAllCheckBox = true;
        config.hasFilter = true;
        config.hasCollapseExpand = true;
        config.maxHeight = 400;
        config.decoupleChildFromParent = false;
     }

    ngOnInit() {
        this.items = this.service.getBooks();
    }
}
