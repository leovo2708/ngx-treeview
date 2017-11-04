import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { DropdownTreeviewComponent } from './dropdown-treeview.component';
import { TreeviewComponent } from './treeview.component';
import { TreeviewItemComponent } from './treeview-item.component';
import { TreeviewPipe } from './treeview.pipe';
import { TreeviewI18n, TreeviewI18nDefault } from './treeview-i18n';
import { TreeviewConfig } from './treeview-config';
import { TreeviewEventParser, DefaultTreeviewEventParser } from './treeview-event-parser';
var TreeviewModule = (function () {
    function TreeviewModule() {
    }
    TreeviewModule.forRoot = function () {
        return {
            ngModule: TreeviewModule,
            providers: [
                TreeviewConfig,
                { provide: TreeviewI18n, useClass: TreeviewI18nDefault },
                { provide: TreeviewEventParser, useClass: DefaultTreeviewEventParser }
            ]
        };
    };
    return TreeviewModule;
}());
export { TreeviewModule };
TreeviewModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    CommonModule
                ],
                declarations: [
                    TreeviewComponent,
                    TreeviewItemComponent,
                    TreeviewPipe,
                    DropdownDirective,
                    DropdownMenuDirective,
                    DropdownToggleDirective,
                    DropdownTreeviewComponent
                ], exports: [
                    TreeviewComponent,
                    TreeviewPipe,
                    DropdownTreeviewComponent
                ]
            },] },
];
/** @nocollapse */
TreeviewModule.ctorParameters = function () { return []; };
//# sourceMappingURL=treeview.module.js.map