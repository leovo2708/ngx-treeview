import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { BookComponent } from './book/book.component';
import { CityComponent } from './city/city.component';
import { RoomComponent } from './room/room.component';
import { DropdownTreeviewSelectDemoComponent } from './dropdown-treeview-select/dropdown-treeview-select-demo.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: '', redirectTo: 'components', pathMatch: 'full' },
  { path: 'components', component: BookComponent },
  { path: 'pipe', component: CityComponent },
  { path: 'performance', component: RoomComponent },
  { path: 'template', component: DropdownTreeviewSelectDemoComponent },
  { path: 'advanced', component: ProductComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
