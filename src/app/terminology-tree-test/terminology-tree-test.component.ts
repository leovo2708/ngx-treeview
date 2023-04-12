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

  selectedSpecs = [
    {
      id: 'SPECID002',
      name: 'Speciality test spec_002_text',
      nameAggregated: 'Speciality test spec_002_text',
    },
    {
      id: 'SPECID001',
      name: 'Speciality test spec_001_text',
      nameAggregated: 'Speciality test spec_001_text',
    },
  ];

  selectedAnats = [
    {
      id: 'ANAID002',
      name: 'Anatomy test ana_002_text',
      nameAggregated: 'Anatomy test ana_002_text',
    },
    {
      id: 'ANAID001',
      name: 'Anatomy test ana_001_text',
      nameAggregated: 'Anatomy test ana_001_text',
    },
  ];

  selectedPaths = [
    {
      id: 'PATHID001',
      name: 'Pathology test path_001_text',
      nameAggregated: 'Pathology test path_001_text',
    },
    {
      id: 'PATHID002',
      name: 'Pathology test path_002_text',
      nameAggregated: 'Pathology test path_002_text',
    },
  ];

  selectedDiags = [
    {
      id: 'DIAGID002',
      name: 'Diagnosis test diag_002_text',
      nameAggregated: 'Diagnosis test diag_002_text',
    },
    {
      id: 'DIAGID001',
      name: 'Diagnosis test diag_001_text',
      nameAggregated: 'Diagnosis test diag_001_text',
    },
  ];

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
