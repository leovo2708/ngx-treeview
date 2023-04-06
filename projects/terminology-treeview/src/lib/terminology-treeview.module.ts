import { NgModule } from '@angular/core';
import { TerminologyTreeviewComponent } from './terminology-treeview.component';
import { TerminologyTreeViewComponent } from './terminology-tree-view/terminology-tree-view.component';
import { DropdownModule } from '@orbis-u/components/dropdown';
import { BadgeModule } from '@orbis-u/components/badge';
import { InputModule } from '@orbis-u/components/input';
import { IconModule } from '@orbis-u/components/icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from '@orbis-u/components/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkModule } from '@orbis-u/common/cdk';
import { AutomationIdModule } from '@orbis-u/common';
import { I18NewModule } from '@orbis-u/i18n';
import { TerminologyTreeViewItemComponent } from './terminology-tree-view/terminology-tree-view-item/terminology-tree-view-item.component';
import {
  TerminologyDefaultTreeviewI18n,
  TerminologyTreeviewI18n,
} from './model/terminology-treeview-i18n';
import { TreeviewConfig } from './model/treeview-config';
import {
  DefaultTerminologyTreeviewEventParser,
  TerminologyTreeviewEventParser,
} from './helpers/terminology-treeview-event-parser';
import { TerminologyTreeFilterComponent } from './terminology-tree-filter/terminology-tree-filter.component';
import { NewSelectModule } from '@orbis-u/components/new-select';
import { CheckboxModule } from '@orbis-u/components/checkbox';

@NgModule({
  declarations: [
    TerminologyTreeviewComponent,
    TerminologyTreeViewComponent,
    TerminologyTreeViewItemComponent,
    TerminologyTreeFilterComponent,
  ],
  imports: [
    AutomationIdModule,
    BadgeModule,
    BrowserAnimationsModule,
    ButtonModule,
    CdkModule,
    CheckboxModule,
    DropdownModule,
    FormsModule,
    InputModule,
    IconModule,
    I18NewModule,
    NewSelectModule,
    ReactiveFormsModule,
  ],
  providers: [
    TreeviewConfig,
    {
      provide: TerminologyTreeviewI18n,
      useClass: TerminologyDefaultTreeviewI18n,
    },
    {
      provide: TerminologyTreeviewEventParser,
      useClass: DefaultTerminologyTreeviewEventParser,
    },
  ],
  exports: [TerminologyTreeviewComponent],
})
export class TerminologyTreeviewModule {}
