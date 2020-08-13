import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { BookService } from '../book/book.service';

@Component({
  selector: 'ngx-dropdown-treeview-select-demo',
  templateUrl: './dropdown-treeview-select-demo.component.html',
  providers: [
    BookService
  ]
})
export class DropdownTreeviewSelectDemoComponent implements OnInit {
  value = 11;
  items: TreeviewItem[];
  config = TreeviewConfig.create({
    hasFilter: true,
    hasCollapseExpand: true
  });

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.items = this.bookService.getBooks();
  }

  onValueChange(value: number): void {
    console.log('valueChange raised with value: ' + value);
  }

  loadBooks1(): void {
    this.items = this.bookService.getBooks();
    this.value = 11;
  }

  loadBooks2(): void {
    this.items = [new TreeviewItem({
      text: 'ABC',
      value: 123456
    })];
    this.value = undefined;
  }
}
