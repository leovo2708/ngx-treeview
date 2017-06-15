import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TreeviewModule } from '../lib';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { CityComponent } from './city/city.component';
import { RoomComponent } from './room/room.component';
import { ProductComponent } from './product/product.component';
import { I18n } from './i18n';
import { DisabledOnSelectorDirective } from './disabled-on-selector.directive';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        TreeviewModule.forRoot()
    ],
    declarations: [
        BookComponent,
        CityComponent,
        RoomComponent,
        ProductComponent,
        AppComponent,
        DisabledOnSelectorDirective
    ],
    providers: [
        I18n
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
