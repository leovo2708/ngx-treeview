import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from '../../lib';
import { BookService } from '../book/book.service';

@Component({
    selector: 'ngx-dropdown-treeview-select-demo',
    templateUrl: './dropdown-treeview-select-demo.component.html',
    providers: [
        BookService
    ]
})
export class DropdownTreeviewSelectDemoComponent implements OnInit {
    selectedItem: TreeviewItem;
    items: TreeviewItem[];
    config = TreeviewConfig.create({
        hasFilter: true,
        hasCollapseExpand: true
    });

    constructor(
        private bookService: BookService
    ) { }

    ngOnInit() {
        this.items = this.bookService.getBooks();
    }
}
