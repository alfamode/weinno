import { Page } from '@playwright/test';
import {
    FieldHook
} from '@pages/person/person.types';

type FilterPickerType = 'JobTitle' | 'Unit' | 'Supervisor';

export const fill = (selector: string): FieldHook =>
    async ({ page, value }) => {
        await page.locator(selector).fill(value);
    };

export const selectByMap = (
    selector: string,
    mapping: Record<string, string>,
    opts?: { label?: string }
): FieldHook =>
    async ({ page, value }) => {
        const mapped = mapping[value];

        if (!mapped) {
            const field = opts?.label ?? selector;
            throw new Error(
                `Invalid value "${value}" for ${field}. Allowed values: ${Object.keys(mapping).join(', ')}`
            );
        }

        await page.locator(selector).selectOption(mapped);
    };

export const chosen = (
    selector: string,
    opts?: { fillSearch?: boolean }
): FieldHook =>
    async ({ page, value }) => {
        const root = page.locator(selector);

        await root.locator('a').click();

        if (opts?.fillSearch) {
            await root.locator('.chosen-search-input').fill(value);
        }

        await root.getByText(value).first().click();
    };

export const filterModal = (config: {
    type: FilterPickerType;
    fieldLabel: string;
}): FieldHook =>
    async ({ page, value }) => {
        const wrapper = page
            .locator('div, td, section')
            .filter({
                has: page.locator('label, span, p').filter({ hasText: config.fieldLabel }),
            })
            .last();

        const controls = wrapper.locator('input, button');
        await controls.filter({ hasText: '...' }).click();

        if (config.type === 'JobTitle') {
            await page.getByRole('textbox', { name: 'عنوان شغل' }).fill(value);
        }

        if (config.type === 'Unit') {
            await page
                .locator('#organizationalChartModal_OrganizationalChartFilterVm_Title')
                .fill(value);
        }

        if (config.type === 'Supervisor') {
            const [firstname = '', surname = ''] = value.split(' ', 2);

            await page.getByRole('textbox', { name: 'نام', exact: true }).fill(firstname);
            await page.getByRole('textbox', { name: 'نام خانوادگی' }).fill(surname);
        }

        await page.getByRole('button', { name: 'مشاهده اطلاعات' }).click();
        await page.getByRole('button', { name: 'انتخاب' }).first().click();
    };

export const custom =
    (fn: (page: Page, value: string) => Promise<void>): FieldHook =>
        async ({ page, value }) => {
            await fn(page, value);
        };

export const notImplemented: FieldHook = async ({ value }) => {
    throw new Error(`No hook implemented for value "${value}"`);
};
