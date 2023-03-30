import { TestBed } from '@angular/core/testing';
import {
  TerminologyTreeviewItem,
  TerminologyTreeviewSelection,
} from './terminology-treeview-item';
import {
  TerminologyDefaultTreeviewI18n,
  TerminologyTreeviewI18n,
} from './terminology-treeview-i18n';

describe('DefaultTreeviewI18n', () => {
  let treeviewI18n: TerminologyTreeviewI18n;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TerminologyDefaultTreeviewI18n],
    });
    treeviewI18n = TestBed.inject(TerminologyDefaultTreeviewI18n);
  });

  describe('getText', () => {
    it('should return "All" if having no unchecked items', () => {
      const selection: TerminologyTreeviewSelection = {
        checkedItems: undefined,
        uncheckedItems: [],
      };
      expect(treeviewI18n.getText(selection)).toBe('All');
    });

    it('should return "Select options" if list of checked items is empty', () => {
      const selection: TerminologyTreeviewSelection = {
        checkedItems: [],
        uncheckedItems: [
          new TerminologyTreeviewItem({
            id: 'RID34255',
            meaning: 'fein-lineare Verkalkung',
          }),
        ],
      };
      expect(treeviewI18n.getText(selection)).toBe('Select options');
    });

    it('should return text of first checked item if length of checked items is 1', () => {
      const selection: TerminologyTreeviewSelection = {
        checkedItems: [
          new TerminologyTreeviewItem({
            id: 'RID34255',
            meaning: 'fein-lineare Verkalkung',
          }),
        ],
        uncheckedItems: [
          new TerminologyTreeviewItem({
            id: 'RID34255',
            meaning: 'fein-lineare Verkalkung',
          }),
        ],
      };
      expect(treeviewI18n.getText(selection)).toBe('Item 1');
    });

    it('should return "2 options selected" if length of checked items is 2', () => {
      const selection: TerminologyTreeviewSelection = {
        checkedItems: [
          new TerminologyTreeviewItem({
            id: 'RID34255',
            meaning: 'fein-lineare Verkalkung',
          }),
          new TerminologyTreeviewItem({
            id: 'RID34255',
            meaning: 'fein-lineare Verkalkung',
          }),
        ],
        uncheckedItems: [
          new TerminologyTreeviewItem({
            id: 'RID34255',
            meaning: 'fein-lineare Verkalkung',
          }),
        ],
      };
      expect(treeviewI18n.getText(selection)).toBe('2 options selected');
    });
  });
});
