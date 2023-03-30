import { NgModule } from '@angular/core';
import { TerminologyTreeviewComponent } from './terminology-treeview.component';
import { TerminologyTreeFilterComponent } from './terminology-tree-filter/terminology-tree-filter.component';
import { TerminologyTreeViewComponent } from './terminology-tree-view/terminology-tree-view.component';
import { TerminologyTreeMainComponent } from './terminology-tree-main/terminology-tree-main.component';
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

@NgModule({
  declarations: [
    TerminologyTreeviewComponent,
    TerminologyTreeFilterComponent,
    TerminologyTreeViewComponent,
    TerminologyTreeMainComponent,
  ],
  imports: [
    AutomationIdModule,
    BadgeModule,
    BrowserAnimationsModule,
    ButtonModule,
    CdkModule,
    DropdownModule,
    FormsModule,
    InputModule,
    IconModule,
    I18NewModule,
    ReactiveFormsModule,
  ],
  exports: [TerminologyTreeviewComponent],
})
export class TerminologyTreeviewModule {}
