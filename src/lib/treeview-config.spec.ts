import { TreeviewConfig } from './treeview-config';

describe('Treeview-Config', () => {
    it('should have sensible default values', () => {
        const config = new TreeviewConfig();
        expect(config.isShowAllCheckBox).toBe(true);
        expect(config.isShowFilter).toBe(false);
        expect(config.isShowCollapseExpand).toBe(false);
        expect(config.maxHeight).toBe(500);
    });
});
