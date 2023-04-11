import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TerminologyTreeviewItem } from 'terminology-treeview';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-terminology-tree-test',
  templateUrl: './terminology-tree-test.component.html',
  styleUrls: ['./terminology-tree-test.component.scss'],
})
export class TerminologyTreeTestComponent implements OnInit, OnDestroy {
  pathologyTreeItems;
  anatomyTreeItems;
  diagnosisTreeItems;
  subscription: Subscription;
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.buildPathoTree();
    this.buildAnatTree();
    this.buildDiagTree();
  }

  buildPathoTree() {
    this.subscription = this.httpClient
      .get('/assets/pathologyTree.json')
      .subscribe(data => {
        this.pathologyTreeItems = new TerminologyTreeviewItem(data as any);
      });
  }

  buildAnatTree() {
    this.subscription = this.httpClient
      .get('/assets/anatomyTree.json')
      .subscribe(data => {
        this.anatomyTreeItems = new TerminologyTreeviewItem(data as any);
      });
  }

  buildDiagTree() {
    this.subscription = this.httpClient
      .get('/assets/diagTree.json')
      .subscribe(data => {
        this.diagnosisTreeItems = new TerminologyTreeviewItem(data as any);
      });
  }

  onPathologySelectedChange(event: TerminologyTreeviewItem[]) {
    console.log(event);
  }
  onAnatomySelectedChange(event: TerminologyTreeviewItem[]) {
    console.log(event);
  }
  onDiagnosisSelectedChange(event: TerminologyTreeviewItem[]) {
    console.log(event);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  onFilterChange(value: string): void {
    console.log('filter:', value);
  }
}
