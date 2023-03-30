import { TerminologyTreeviewItem } from './terminology-treeview-item';

describe('TreeviewItem', () => {
  it('should throw error if TreeItem param is null of undefined', () => {
    const error = new Error('Item must be defined');
    expect(() => new TerminologyTreeviewItem(null)).toThrow(error);
    expect(() => new TerminologyTreeviewItem(undefined)).toThrow(error);
  });

  it('should throw error if TreeItem text is not a string', () => {
    const error = new Error('A text of item must be string object');
    const fakeString: any = 1;
    expect(
      () => new TerminologyTreeviewItem({ id: null, meaning: '' })
    ).toThrow(error);
    expect(
      () => new TerminologyTreeviewItem({ id: undefined, meaning: '' })
    ).toThrow(error);
    expect(
      () => new TerminologyTreeviewItem({ id: fakeString, meaning: '' })
    ).toThrow(error);
  });

  it('should throw error if TreeviewItem children is assigned an empty array', () => {
    const error = new Error('Children must be not an empty array');
    const treeviewItem = new TerminologyTreeviewItem({
      id: 'Parent',
      meaning: '',
    });
    expect(() => (treeviewItem.children = [])).toThrow(error);
  });

  it('should allow to create TreeviewItem with empty children', () => {
    const treeviewItem = new TerminologyTreeviewItem({
      id: 'RID34255',
      meaning: 'fein-lineare Verkalkung',
      children: [],
    });
    expect(treeviewItem.children).toBeUndefined();
  });

  describe('checked', () => {
    it('should have value is true by default', () => {
      const treeviewItem = new TerminologyTreeviewItem({
        id: 'RID34255',
        meaning: 'fein-lineare Verkalkung',
      });
      expect(treeviewItem.checked).toBeTruthy();
    });

    it('should correct checked value when input second param', () => {
      const treeviewItem = new TerminologyTreeviewItem(
        {
          id: 'RID34255',
          meaning: 'fein-lineare Verkalkung',
          checked: false,
          children: [
            {
              id: 'RID34255',
              meaning: 'fein-lineare Verkalkung',
              checked: true,
            },
          ],
        },
        true
      );
      expect(treeviewItem.checked).toBe(true);
    });

    it('should set checked value correctly when invoke correctChecked', () => {
      const treeviewItem = new TerminologyTreeviewItem({
        id: 'RID34255',
        meaning: 'fein-lineare Verkalkung',
        checked: false,
        children: [
          { id: 'RID34255', meaning: 'fein-lineare Verkalkung', checked: true },
        ],
      });
      expect(treeviewItem.checked).toBe(true);
      treeviewItem.children.push(
        new TerminologyTreeviewItem({
          id: 'RID34255',
          meaning: 'fein-lineare Verkalkung',
          checked: false,
        })
      );
      treeviewItem.correctChecked();
      expect(treeviewItem.checked).toBe(undefined);
    });

    it('should not change checked value if item is disabled', () => {
      const treeviewItem = new TerminologyTreeviewItem({
        id: 'RID34255',
        meaning: 'fein-lineare Verkalkung',
        checked: true,
        disabled: true,
      });
      expect(treeviewItem.checked).toBe(true);
      treeviewItem.checked = false;
      expect(treeviewItem.checked).toBe(true);
    });
  });

  describe('setCheckedRecursive', () => {
    it('should apply checked value to children if item is enabled', () => {
      const treeviewItem = new TerminologyTreeviewItem({
        id: 'RID34255',
        meaning: 'fein-lineare Verkalkung',
        checked: false,
        children: [
          {
            id: 'RID34255',
            meaning: 'fein-lineare Verkalkung',
            checked: false,
          },
        ],
      });
      expect(treeviewItem.children[0].checked).toBe(false);
      treeviewItem.setCheckedRecursive(true);
      expect(treeviewItem.children[0].checked).toBe(true);
    });

    it('should not apply checked value to children if item is disabled', () => {
      const treeviewItem = new TerminologyTreeviewItem({
        id: 'RID34255',
        meaning: 'fein-lineare Verkalkung',
        disabled: true,
        children: [{ id: 'RID34255', meaning: 'fein-lineare Verkalkung' }],
      });
      expect(treeviewItem.children[0].checked).toBe(true);
      treeviewItem.setCheckedRecursive(true);
      expect(treeviewItem.children[0].checked).toBe(true);
    });
  });

  describe('collapsed', () => {
    it('should set value is false by default', () => {
      const treeviewItem = new TerminologyTreeviewItem({
        id: 'RID34255',
        meaning: 'fein-lineare Verkalkung',
      });
      expect(treeviewItem.collapsed).toBeFalsy();
    });

    it('should affectly change collapsed value', () => {
      const treeviewItem = new TerminologyTreeviewItem({
        id: 'RID34255',
        meaning: 'fein-lineare Verkalkung',
        collapsed: true,
      });
      expect(treeviewItem.collapsed).toBeTruthy();
      treeviewItem.collapsed = false;
      expect(treeviewItem.collapsed).toBeFalsy();
      treeviewItem.collapsed = false;
      expect(treeviewItem.collapsed).toBeFalsy();
    });
  });

  describe('setCollapsedRecursive', () => {
    it('should apply collapsed value to children', () => {
      const treeviewItem = new TerminologyTreeviewItem({
        id: 'RID34255',
        meaning: 'fein-lineare Verkalkung',
        collapsed: false,
        children: [
          {
            id: 'RID34255',
            meaning: 'fein-lineare Verkalkung',
            collapsed: false,
          },
        ],
      });
      expect(treeviewItem.children[0].collapsed).toBe(false);
      treeviewItem.setCollapsedRecursive(true);
      expect(treeviewItem.children[0].collapsed).toBe(true);
    });
  });

  describe('disabled', () => {
    it('should set value is false by default', () => {
      const treeviewItem = new TerminologyTreeviewItem({
        id: 'RID34255',
        meaning: 'fein-lineare Verkalkung',
      });
      expect(treeviewItem.disabled).toBeFalsy();
    });

    it('should initialize children are disabled if initializing parent is disabled', () => {
      const treeviewItem = new TerminologyTreeviewItem({
        id: 'RID34255',
        meaning: 'fein-lineare Verkalkung',
        disabled: true,
        children: [
          {
            id: 'RID34255',
            meaning: 'fein-lineare Verkalkung',
            disabled: false,
          },
        ],
      });
      expect(treeviewItem.children[0].disabled).toBeTruthy();
    });

    it('should change disabled value of children to false if changing disabled of parent to false', () => {
      const treeviewItem = new TerminologyTreeviewItem({
        id: 'RID34255',
        meaning: 'fein-lineare Verkalkung',
        children: [{ id: 'RID34255', meaning: 'fein-lineare Verkalkung' }],
      });
      expect(treeviewItem.children[0].disabled).toBe(false);
      treeviewItem.disabled = true;
      expect(treeviewItem.children[0].disabled).toBe(true);
      treeviewItem.disabled = true;
      expect(treeviewItem.children[0].disabled).toBe(true);
    });
  });

  describe('children', () => {
    it('should throw error if change value to empty list', () => {
      const treeviewItem = new TerminologyTreeviewItem({
        id: 'RID34255',
        meaning: 'fein-lineare Verkalkung',
      });
      const error = new Error('Children must be not an empty array');
      expect(() => (treeviewItem.children = [])).toThrow(error);
    });

    it('should affectly change children value', () => {
      const treeviewItem = new TerminologyTreeviewItem({
        id: 'RID34255',
        meaning: 'fein-lineare Verkalkung',
      });
      const children: TerminologyTreeviewItem[] = [
        new TerminologyTreeviewItem({
          id: 'RID34255',
          meaning: 'fein-lineare Verkalkung',
        }),
      ];
      expect(treeviewItem.children).toBeUndefined();
      treeviewItem.children = children;
      expect(treeviewItem.children).toBe(children);
      treeviewItem.children = children;
      expect(treeviewItem.children).toBe(children);
    });

    it('should accept undefined value', () => {
      const treeviewItem = new TerminologyTreeviewItem({
        id: 'RID34255',
        meaning: 'fein-lineare Verkalkung',
        children: [{ id: 'RID34255', meaning: 'fein-lineare Verkalkung' }],
      });
      expect(treeviewItem.children).toBeDefined();
      treeviewItem.children = undefined;
      expect(treeviewItem.children).toBeUndefined();
    });
  });

  describe('getSelection', () => {
    describe('no children', () => {
      it('should return empty list if item is unchecked', () => {
        const parentItem = new TerminologyTreeviewItem({
          id: 'RID34255',
          meaning: 'fein-lineare Verkalkung',
          checked: false,
        });
        const selection = parentItem.getSelection();
        expect(selection.checkedItems).toEqual([]);
        expect(selection.uncheckedItems).toEqual([parentItem]);
      });

      it('should return a list of current item if item is unchecked', () => {
        const parentItem = new TerminologyTreeviewItem({
          id: 'RID34255',
          meaning: 'fein-lineare Verkalkung',
        });
        const selection = parentItem.getSelection();
        expect(selection.checkedItems).toEqual([parentItem]);
        expect(selection.uncheckedItems).toEqual([]);
      });
    });

    describe('has children', () => {
      it('should return list of checked items', () => {
        const parentItem = new TerminologyTreeviewItem({
          id: 'RID34255',
          meaning: 'fein-lineare Verkalkung',
          checked: false,
        });
        const childItem1 = new TerminologyTreeviewItem({
          id: 'RID34255',
          meaning: 'fein-lineare Verkalkung',
          checked: true,
        });
        const childItem2 = new TerminologyTreeviewItem({
          id: 'RID34255',
          meaning: 'fein-lineare Verkalkung',
          checked: false,
        });
        const childItem21 = new TerminologyTreeviewItem({
          id: 'RID34255',
          meaning: 'fein-lineare Verkalkung',
          checked: true,
        });
        const childItem22 = new TerminologyTreeviewItem({
          id: 'RID34255',
          meaning: 'fein-lineare Verkalkung',
          checked: false,
        });
        childItem2.children = [childItem21, childItem22];
        parentItem.children = [childItem1, childItem2];
        const selection = parentItem.getSelection();
        expect(selection.checkedItems).toEqual([childItem1, childItem21]);
        expect(selection.uncheckedItems).toEqual([childItem22]);
      });
    });
  });
});
