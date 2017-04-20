import { TreeviewItem, TreeviewConfig } from '../index';

const childrenCategory = new TreeviewItem({
    text: 'Children', value: 1, children: [
        { text: 'Baby 3-5', value: 11 },
        { text: 'Baby 6-8', value: 12 },
        { text: 'Baby 9-12', value: 13 }
    ]
});
const itCategory = new TreeviewItem({
    text: 'IT', value: 9, children: [
        {
            text: 'Programming', value: 91, children: [
                { text: 'Angular 1', value: 911 },
                { text: 'Angular 2', value: 912 }
            ]
        },
        {
            text: 'Networking', value: 92, children: [
                { text: 'Internet', value: 921 },
                { text: 'Security', value: 922 }
            ]
        }
    ]
});
const teenCategory = new TreeviewItem({
    text: 'Teen', value: 2, disabled: true, children: [
        { text: 'Adventure', value: 21 },
        { text: 'Science', value: 22 }
    ]
});
const othersCategory = new TreeviewItem({ text: 'Others', value: 3, disabled: true });
const config: TreeviewConfig = {
    isShowAllCheckBox: true,
    isShowCollapseExpand: true,
    isShowFilter: true,
    maxHeight: 500
};

export let model = {
    items: [childrenCategory, itCategory, teenCategory, othersCategory],
    config: config
};
