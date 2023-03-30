import { TestBed } from '@angular/core/testing';
import {
  TerminologyTreeviewItem,
  TerminologyTreeviewSelection,
} from '../model/terminology-treeview-item';
import { TerminologyTreeviewModule } from 'terminology-treeview';
import { TerminologyTreeViewComponent } from '../terminology-tree-view/terminology-tree-view.component';

import {
  TerminologyTreeviewEventParser,
  DefaultTerminologyTreeviewEventParser,
  TerminologyOrderDownlineTreeviewEventParser,
  DownlineTreeviewEventParser,
} from './terminology-treeview-event-parser';

const selectionWithUndefinedCheckedItems: TerminologyTreeviewSelection = {
  checkedItems: undefined,
  uncheckedItems: undefined,
};

const selectionWithNullCheckedItems: TerminologyTreeviewSelection = {
  checkedItems: null,
  uncheckedItems: undefined,
};

describe('DefaultTreeviewEventParser', () => {
  let parser: TerminologyTreeviewEventParser;
  let fakeComponent: TerminologyTreeViewComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TerminologyTreeviewModule],
      providers: [
        {
          provide: TerminologyTreeviewEventParser,
          useClass: DefaultTerminologyTreeviewEventParser,
        },
      ],
    });
    parser = TestBed.inject(TerminologyTreeviewEventParser);
    fakeComponent = TestBed.createComponent(
      TerminologyTreeViewComponent
    ).componentInstance;
  });

  it('should return empty list if checkedItems is null or undefined', () => {
    fakeComponent.items = undefined;
    fakeComponent.selection = selectionWithUndefinedCheckedItems;
    let result = parser.getSelectedChange(fakeComponent);
    expect(result).toEqual([]);

    fakeComponent.items = undefined;
    fakeComponent.selection = selectionWithNullCheckedItems;
    result = parser.getSelectedChange(fakeComponent);
    expect(result).toEqual([]);
  });

  it('should return list of value of checked items', () => {
    fakeComponent.items = undefined;
    fakeComponent.selection = {
      checkedItems: [
        new TerminologyTreeviewItem({
          id: 'RID34257',
          meaning: 'fein-pleomorphe Verkalkung',
        }),
        new TerminologyTreeviewItem({
          id: 'RID34255',
          meaning: 'fein-lineare Verkalkung',
        }),
      ],
      uncheckedItems: undefined,
    };

    const result = parser.getSelectedChange(fakeComponent);
    expect(result).toEqual([1, 2]);
  });
});

describe('DownlineTreeviewEventParser', () => {
  let parser: TerminologyTreeviewEventParser;
  let fakeComponent: TerminologyTreeViewComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TerminologyTreeviewModule],
      providers: [
        {
          provide: TerminologyTreeviewEventParser,
          useClass: TerminologyOrderDownlineTreeviewEventParser,
        },
      ],
    });
    parser = TestBed.inject(TerminologyTreeviewEventParser);
    fakeComponent = TestBed.createComponent(
      TerminologyTreeViewComponent
    ).componentInstance;
  });

  it('should return empty list if items is null or undefined', () => {
    fakeComponent.items = undefined;
    fakeComponent.selection = selectionWithUndefinedCheckedItems;
    let result = parser.getSelectedChange(fakeComponent);
    expect(result).toEqual([]);

    fakeComponent.items = null;
    fakeComponent.selection = selectionWithUndefinedCheckedItems;
    result = parser.getSelectedChange(fakeComponent);
    expect(result).toEqual([]);
  });

  it('should return list of checked items with links', () => {
    const item1 = new TerminologyTreeviewItem({
      id: 'RID34257',
      meaning: 'fein-pleomorphe Verkalkung',
      checked: false,
    });
    const item1Child1 = new TerminologyTreeviewItem({
      id: 'RID34255',
      meaning: 'fein-lineare Verkalkung',
    });
    const item1Child2 = new TerminologyTreeviewItem({
      id: 'RID34257',
      meaning: 'fein-pleomorphe Verkalkung',
      checked: false,
      children: [
        { id: 'RID34255', meaning: 'fein-lineare Verkalkung', checked: false },
      ],
    });
    item1.children = [item1Child1, item1Child2];
    const item2 = new TerminologyTreeviewItem({
      id: 'RID34255',
      meaning: 'fein-lineare Verkalkung',
    });
    const item3 = new TerminologyTreeviewItem({
      id: 'RID34255',
      meaning: 'fein-lineare Verkalkung',
      checked: false,
    });
    fakeComponent.items = [item1, item2, item3];
    fakeComponent.selection = selectionWithUndefinedCheckedItems;
    const result = parser.getSelectedChange(fakeComponent);
    const expected = [
      {
        item: item1Child1,
        parent: {
          item: item1,
          parent: null,
        },
      },
      {
        item: item2,
        parent: null,
      },
    ];
    expect(result).toEqual(expected);
  });
});

describe('OrderDownlineTreeviewEventParser', () => {
  let parser: TerminologyTreeviewEventParser;
  let fakeComponent: TerminologyTreeViewComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TerminologyTreeviewModule],
      providers: [
        {
          provide: TerminologyTreeviewEventParser,
          useClass: TerminologyOrderDownlineTreeviewEventParser,
        },
      ],
    });
    parser = TestBed.inject(TerminologyTreeviewEventParser);
    fakeComponent = TestBed.createComponent(
      TerminologyTreeViewComponent
    ).componentInstance;
  });

  it('should return empty list if items is null or undefined', () => {
    fakeComponent.items = undefined;
    fakeComponent.selection = selectionWithUndefinedCheckedItems;
    let result = parser.getSelectedChange(fakeComponent);
    expect(result).toEqual([]);

    fakeComponent.items = null;
    fakeComponent.selection = selectionWithUndefinedCheckedItems;
    result = parser.getSelectedChange(fakeComponent);
    expect(result).toEqual([]);
  });

  describe('', () => {
    const item1 = new TerminologyTreeviewItem({
      id: 'RID34255',
      meaning: 'fein-lineare Verkalkung',
      checked: false,
    });
    const item1Child1 = new TerminologyTreeviewItem({
      id: 'RID34255',
      meaning: 'fein-lineare Verkalkung',
    });
    const item1Child2 = new TerminologyTreeviewItem({
      id: 'RID34255',
      meaning: 'fein-lineare Verkalkung',
      checked: false,
      children: [
        { id: 'RID34255', meaning: 'fein-lineare Verkalkung', checked: false },
      ],
    });
    item1.children = [item1Child1, item1Child2];
    const item2 = new TerminologyTreeviewItem({
      id: 'RID34255',
      meaning: 'fein-lineare Verkalkung',
      checked: false,
    });
    const item3 = new TerminologyTreeviewItem({
      id: 'RID34255',
      meaning: 'fein-lineare Verkalkung',
    });

    beforeEach(() => {
      fakeComponent.items = [item1, item2, item3];
      fakeComponent.selection = selectionWithUndefinedCheckedItems;
    });

    it('should return list of checked items with links', () => {
      const result = parser.getSelectedChange(fakeComponent);
      const expected = [
        {
          item: item1Child1,
          parent: {
            item: item1,
            parent: null,
          },
        },
        {
          item: item3,
          parent: null,
        },
      ];
      expect(result).toEqual(expected);
    });

    it('should return list of checked items with links by order', () => {
      parser.getSelectedChange(fakeComponent);
      item1Child1.checked = false;
      item2.checked = true;
      const result = parser.getSelectedChange(fakeComponent);
      const expected = [
        {
          item: item3,
          parent: null,
        },
        {
          item: item2,
          parent: null,
        },
      ];
      expect(result).toEqual(expected);
    });
  });
});
