import { test, expect } from 'playwright/test';
import 'dotenv/config'; // Loads the .env file

test.skip('define calendared course', async ({ page }) => {
    const password = process.env.APP_PASSWORD; // Securely get the value
    if (!password) {
        throw new Error('MY_APP_PASSWORD is not set in your .env file');
    }

    await page.goto('/');

    await page.getByRole('link', { name: 'ورود به سامانه' }).click();
    await expect(page).toHaveURL(/login/i);

    await page.getByRole('textbox', { name: 'نام کاربری' }).fill('testali');
    await page.getByRole('textbox', { name: 'کلمه عبور' }).fill(password);
    await page.getByRole('textbox', { name: 'مقدار تصویر' }).fill('12345');

    await page.getByRole('button', { name: 'ورود به سامانه' }).click();
    await expect(page).toHaveURL(/\/Dashboard\/MainDashboard$/i);

    const modal = page.locator('#mainPageAlertModal');
    if (await modal.isVisible())
        await modal.getByRole('button', { name: 'بستن' }).click();

    await page.getByRole('link', { name: 'مدیریت دوره هاو برنامه ها' }).click();
    await expect(page).toHaveURL(/\/MergeClassroomAndCalendarPrograms/i);

    await page.locator('#MyIndexForm').getByRole('button', { name: 'اضافه کردن' }).click();
    await page.getByRole('link', { name: 'افزودن برنامه داخل تقویم' }).click();
    await expect(page).toHaveURL(/\/TrainingCalendarProgramInsertUpdate/i);

    await page.waitForTimeout(5000);
    await page.getByText('پیش آزمون دارد؟').check();
    await page.waitForTimeout(2000);
    await page.locator('a').filter({ hasText: 'تنظیمات پیش آزمون' }).click();
    await page.waitForTimeout(2000);
    const el = page.locator('#TrainingCalendarProgram_PreScoreIsDescriptive');
    await expect(el).toBeVisible();
    await expect(el).toBeEnabled();
    await el.selectOption('false');
    await page.waitForTimeout(2000);
    await page.getByRole('textbox', { name: 'حداقل نمره :' }).fill('14');
    await page.waitForTimeout(2000);
    await page.locator('#TrainingCalendarProgram_PreScoreIsDescriptive').selectOption('true');
    await page.waitForTimeout(2000);
    await page.getByText('پیش آزمون دارد؟').uncheck();
    await page.waitForTimeout(2000);
    await page.getByText('پیش آزمون دارد؟').check();
});


test.skip('define course training need', async ({ page }) => {
    const password = process.env.APP_PASSWORD; // Securely get the value
    if (!password) {
        throw new Error('MY_APP_PASSWORD is not set in your .env file');
    }

    await page.goto('/');

    await page.getByRole('link', { name: 'ورود به سامانه' }).click();
    await expect(page).toHaveURL(/login/i);

    await page.getByRole('textbox', { name: 'نام کاربری' }).fill('testali');
    await page.getByRole('textbox', { name: 'کلمه عبور' }).fill(password);
    await page.getByRole('textbox', { name: 'مقدار تصویر' }).fill('12345');

    await page.getByRole('button', { name: 'ورود به سامانه' }).click();
    await expect(page).toHaveURL(/\/Dashboard\/MainDashboard$/i);

    const modal = page.locator('#mainPageAlertModal');
    if (await modal.isVisible())
        await modal.getByRole('button', { name: 'بستن' }).click();

    const newPagePromise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'داشبورد برنامه ریزی' }).click();
    const oldPage1 = page;
    page = await newPagePromise;
    await expect(page).toHaveURL(/\/PlanningDashboard$/i);

    await page.getByRole('link', { name: 'مدیریت برنامه‌های آموزشی' }).click();
    await expect(page).toHaveURL(/\/TrainingProgramManagement$/i);


    await page.getByRole('link', { name: 'اضافه کردن' }).click();
    await expect(page).toHaveURL(/\/TrainingProgramInsertUpdate/i);

    await page.waitForTimeout(2000);
    await page.getByText('پیش آزمون دارد؟').check();
    
    const sel = page.locator('#TrainingProgram_PreScoreIsDescriptive');
    await sel.selectOption('false', { force: true })
    await sel.highlight();

    await page.waitForTimeout(5000);
    await sel.selectOption('true', { force: true })
    await sel.highlight();    
    await page.waitForTimeout(5000);
    await sel.selectOption('false', { force: true });
    await sel.highlight();    
    await page.waitForTimeout(5000);
    await sel.selectOption('true', { force: true });
    await sel.highlight();    
    await page.waitForTimeout(5000);
    await sel.selectOption('false', { force: true });
    await sel.highlight();
});