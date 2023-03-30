import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TreeviewModule } from 'ngx-treeview';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BookComponent } from './book/book.component';
import { CityComponent } from './city/city.component';
import { RoomComponent } from './room/room.component';
import { ProductComponent } from './product/product.component';
import { NotFoundComponent } from './not-found.component';
import { DropdownTreeviewSelectModule } from './dropdown-treeview-select';
import { I18n } from './i18n';
import { DisabledOnSelectorDirective } from './disabled-on-selector.directive';
import { TerminologyTreeTestComponent } from './terminology-tree-test/terminology-tree-test.component';
import { TerminologyTreeviewModule } from '../../projects/terminology-treeview/src/lib/terminology-treeview.module';
import { I18NewModule } from '@orbis-u/i18n';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TreeviewModule.forRoot(),
    TerminologyTreeviewModule,
    DropdownTreeviewSelectModule,
    I18NewModule.forRoot({
      urlResolver: function (appName, lang) {
        return undefined;
      },
    }),
    AppRoutingModule,
  ],
  declarations: [
    NotFoundComponent,
    BookComponent,
    CityComponent,
    RoomComponent,
    ProductComponent,
    AppComponent,
    DisabledOnSelectorDirective,
    TerminologyTreeTestComponent,
  ],
  providers: [I18n],
  bootstrap: [AppComponent],
})
export class AppModule {}
