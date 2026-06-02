import { expect, Page } from '@playwright/test';
import { PageHandle } from './types';

export class PersonNavigation {
    private oldPages: Page[] = [];

    constructor(private readonly pageHandle: PageHandle) { }

    async toManagement() {
        let page = this.pageHandle.get();
        const [popup] = await Promise.all([
            page.waitForEvent('popup'),
            page.getByRole('link', { name: 'شناسنامه شاغل' }).click(),
        ]);

        this.oldPages.push(page);
        this.pageHandle.set(popup);
        page = this.pageHandle.get();

        await expect(page).toHaveURL(/\/Person\/PersonManagment$/i);
    }

    async toDefinePerson() {
        let page = this.pageHandle.get();
        await page
            .locator('#frmPerson')
            .getByRole('link', { name: 'اضافه کردن' })
            .click();

        await expect(page).toHaveURL(/\/Person\/PersonInsertUpdate$/i);
    }
}
