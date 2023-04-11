import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TreeViewFilterTextChange } from '../model/tree-view-filter-text-change';

@Injectable()
export class TreeViewSelectHelperService {
  edutrFilterTextChange = new Subject<TreeViewFilterTextChange>();

  constructor() {}

  getEdutrFilterTextChange(): Observable<TreeViewFilterTextChange> {
    return this.edutrFilterTextChange.asObservable();
  }

  updateEdutrFilterTextChange(value: TreeViewFilterTextChange) {
    this.edutrFilterTextChange.next(value);
  }
}
