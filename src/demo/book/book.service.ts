import { Injectable } from '@angular/core';
import { TreeviewItem } from '../../lib';

export class BookService {
    getBooks(): TreeviewItem[] {
        const allAccounts = new TreeviewItem({
            text: 'All Accounts', value: 1, checked: true
        });
        const accountTypes = new TreeviewItem({
            text: 'Acount Type', value: 2, checked: false, collapsed: true, children: [
                {
                    text: 'Cert Accounts', value: 21, checked: false
                }
            ]
        });
        const levelOne = new TreeviewItem({
            text: 'Level One', value: 3, checked: false, collapsed: true
        });
        const orBank = new TreeviewItem({
            text: 'OR_Bank', value: 4, checked: false, collapsed: true, children: [
                {
                    text: 'Cert Accounts', value: 41, checked: false
                }
            ]
        });
        const system = new TreeviewItem({
            text: 'SYSTEM', value: 5, checked: false, collapsed: true, children: [
                {
                    text: 'Level One', value: 51, checked: false
                }
            ]
        });
        return [allAccounts, accountTypes, levelOne, orBank, system];
    }
}
