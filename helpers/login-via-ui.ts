import { Page, expect } from '@playwright/test';

export async function loginViaUi(page: Page, username: string, password: string, baseUrl: string, captcha: string) {
        await page.goto(baseUrl);
    await page.getByRole('link', { name: 'ورود به سامانه' }).click();
    await expect(page).toHaveURL(/login/i);

    await page.getByRole('textbox', { name: 'نام کاربری' }).fill(username);
    await page.getByRole('textbox', { name: 'کلمه عبور' }).fill(password);
    await page.getByRole('textbox', { name: 'مقدار تصویر' }).fill(captcha);
    await page.getByRole('button', { name: 'ورود به سامانه' }).click();

    await page.waitForURL(/dashboard|home/i);

    const closeBtn = page.getByRole('button', { name: 'بستن' });
    await closeBtn.click({ timeout: 30000 }).catch(() => {
        console.log('No initial notification found.');
    });
}
