import { expect, Page } from '@playwright/test';

export class PersonError {
    constructor(private getPage: () => Page) { }

    async expectFieldInvalid() {
        const page = this.getPage();

        console.error('Error encountered in form, attempting recovery...');

        const closeBtn = page.getByRole('button', { name: 'Close' });

        if (await closeBtn.isVisible()) {
            await closeBtn.click();
        }

        await page.getByRole('link', { name: 'بازگشت' }).click().catch(() => { });
    }
}