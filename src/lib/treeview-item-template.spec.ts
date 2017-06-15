export const fakeItemTemplate = `
<ng-template #tpl let-item="item"
    let-toggleCollapseExpand="toggleCollapseExpand"
    let-onCheckedChange="onCheckedChange">
    <div class="form-check">
        <i *ngIf="item.children" (click)="toggleCollapseExpand()" aria-hidden="true"
            class="fa" [class.fa-caret-right]="item.collapsed" [class.fa-caret-down]="!item.collapsed"></i>
        <label class="form-check-label">
            <input type="checkbox" class="form-check-input"
                [(ngModel)]="item.checked" (ngModelChange)="onCheckedChange()" [disabled]="item.disabled" />
            {{item.text}}
        </label>
    </div>
</ng-template>
`;
