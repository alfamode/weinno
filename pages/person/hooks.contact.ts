import { FieldHook, PersonFieldKey } from './types';
import { selectChoose } from './helpers';

export const contactKeys = [
    'mobile',
    'province',
    'town', 
    'email', 
    'address', 
    'postal-code', 
    'work-number',
] as const satisfies readonly PersonFieldKey[];

export const contactHooks: Partial<Record<(typeof contactKeys)[number], FieldHook>> = {
    'mobile': async ({ page, value }) => {
        await page.locator('#Mobile').fill(value);
    },

    'province': async ({ page, value }) => {
        await selectChoose(page, '#ProvinceId_chosen', value);
    },

    'town': async ({ page, value }) => {
        await selectChoose(page, '#CountyId_chosen', value);
    },

    'email': async ({ page, value }) => {
        await page.locator('#EmailAddress').fill(value);
    },

    'address': async ({ page, value }) => {
        await page.locator('#Address').fill(value);
    },

    'postal-code': async ({ page, value }) => {
        await page.locator('#ZipCode').fill(value);
    },

    'work-number': async ({ page, value }) => {
        await page.getByRole('textbox', { name: 'تلفن محل کار:' }).fill(value);
    },
};
