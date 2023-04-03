import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found.component';
import { I18n } from './i18n';
import { DisabledOnSelectorDirective } from './disabled-on-selector.directive';
import { TerminologyTreeTestComponent } from './terminology-tree-test/terminology-tree-test.component';
import { TerminologyTreeviewModule } from 'terminology-treeview';
import { I18NewModule } from '@orbis-u/i18n';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TerminologyTreeviewModule,
    I18NewModule.forRoot({
      urlResolver: function (appName, lang) {
        return undefined;
      },
    }),
    AppRoutingModule,
  ],
  declarations: [
    NotFoundComponent,
    AppComponent,
    DisabledOnSelectorDirective,
    TerminologyTreeTestComponent,
  ],
  providers: [I18n],
  bootstrap: [AppComponent],
})
export class AppModule {}
