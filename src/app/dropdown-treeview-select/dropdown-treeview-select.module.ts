import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TreeviewModule } from 'ngx-treeview';
import { DropdownTreeviewSelectComponent } from './dropdown-treeview-select.component';
import { DropdownTreeviewSelectDemoComponent } from './dropdown-treeview-select-demo.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    TreeviewModule.forRoot()
  ],
  declarations: [
    DropdownTreeviewSelectComponent,
    DropdownTreeviewSelectDemoComponent
  ],
  exports: [
    DropdownTreeviewSelectDemoComponent
  ]
})
export class DropdownTreeviewSelectModule { }
