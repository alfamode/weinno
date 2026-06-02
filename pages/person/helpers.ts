import { Page, Locator } from '@playwright/test';

export const notImplemented = () => {
    throw new Error('Hook not implemented for Person Page.');
};

export const selectChoose = async (
    page: Page,
    selector: string,
    text: string,
    fill = false
) => {
    const dropdown = page.locator(selector);
    await dropdown.locator('a').click();

    if (fill) {
        await dropdown.locator('.chosen-search-input').pressSequentially(text);
    }

    await dropdown.getByText(text).first().click();
};

export const filterChoose = async (
    page: Page,
    type: 'JobTitle' | 'Unit' | 'Supervisor',
    controlList: Locator,
    text: string
) => {
    switch (type) {
        case 'JobTitle':
            await controlList.getByRole('button', { name: '...' }).click();
            await page.getByRole('textbox', { name: 'عنوان شغل' }).fill(text);
            break;
        case 'Unit':
            await controlList.filter({ hasText: '...' }).click();
            await page
                .locator('#organizationalChartModal_OrganizationalChartFilterVm_Title')
                .fill(text);
            break;
        case 'Supervisor':
            await controlList.filter({ hasText: '...' }).click();
            const [supervisorFirstname, supervisorSurname] = text.split(' ', 2);
            await page
                .getByRole('textbox', { name: 'نام', exact: true })
                .fill(supervisorFirstname);
            await page
                .getByRole('textbox', { name: 'نام خانوادگی' })
                .fill(supervisorSurname);
            break;
    }
    await page.getByRole('button', { name: 'مشاهده اطلاعات' }).click();
    await page.getByRole('button', { name: 'انتخاب' }).first().click();
};

const getFieldWrapper = (
    page: Page,
    text: string
) => {
    const anchor = page.locator('div, td, section')
        .filter({ has: page.locator('label, span, p').filter({ hasText: text }) })
        .last();
    return anchor;
}

export const getFieldControl = (
    page: Page,
    text: string
) => {
    const wrapper = getFieldWrapper(page, text);
    const controls = wrapper
        .locator('input, button');
    return controls;
}