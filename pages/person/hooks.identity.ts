import { FieldHook, PersonFieldKey } from './types';
import { selectChoose } from './helpers';

export const identityKeys = [
    'nationality',
    'national-code',
    'firstname',
    'surname',
    'male-parent',
    'date-of-birth',
    'location-of-birth',
    'location-of-registration',
    'firstname-english',
    'surname-english',
    'male-parent-english',
    'location-of-birth-english',
    'location-of-registration-english',
    'marital-status',
    'id-certificate-code',
    'gender',
] as const satisfies readonly PersonFieldKey[];

export const identityHooks: Partial<Record<(typeof identityKeys)[number], FieldHook>> = {
    'nationality': async ({ page, value }) => {
        await selectChoose(page, '#NationalityId_chosen', value);
    },

    'national-code': async ({ page, value }) => {
        await page.locator('#NationalCode').fill(value);
    },

    'firstname': async ({ page, value }) => {
        await page.locator('#FirstName').fill(value);
    },

    'surname': async ({ page, value }) => {
        await page.locator('#LastName').fill(value);
    },

    'male-parent': async ({ page, value }) => {
        await page.locator('#FatherName').fill(value);
    },

    'date-of-birth': async ({ page, value }) => {
        await page.locator('#BirthDate').fill(value);
    },

    'location-of-birth': async ({ page, value }) => {
        await page.locator('#BirthLocation').fill(value);
    },

    'location-of-registration': async ({ page, value }) => {
        await page.locator('#IssuanceLocation').fill(value);
    },

    'firstname-english': async ({ page, value }) => {
        await page.locator('#FirstNameEn').fill(value);
    },

    'surname-english': async ({ page, value }) => {
        await page.locator('#LastNameEn').fill(value);
    },

    'male-parent-english': async ({ page, value }) => {
        await page.locator('#FatherNameEn').fill(value);
    },

    'location-of-birth-english': async ({ page, value }) => {
        await page.locator('#BirthLocationEng').fill(value);
    },

    'location-of-registration-english': async ({ page, value }) => {
        await page.locator('#IssuanceLocationEng').fill(value);
    },

    'marital-status': async ({ page, value }) => {
        const select = page.locator('#MaritalStatus');

        switch (value) {
            case 'متاهل':
                await select.selectOption('Married');
                break;
            case 'مجرد':
                await select.selectOption('ُSingle');
                break;
            case 'معیل':
                await select.selectOption('Supporter');
                break;
            case 'مطلقه':
                await select.selectOption('Divorced');
                break;
            case 'نامشخص':
                await select.selectOption('Unknown');
                break;
            default:
                throw new Error(
                    "Marital status was passed incorrectly from test case to form's page."
                );
        }
    },

    'id-certificate-code': async ({ page, value }) => {
        await page.locator('#IdNumber').fill(value);
    },

    'gender': async ({ page, value }) => {
        const select = page.locator('#Gender');

        switch (value) {
            case 'مرد':
                await select.selectOption('Male');
                break;
            case 'زن':
                await select.selectOption('Female');
                break;
            default:
                throw new Error(
                    "Gender was passed correctly from test case to form's page."
                );
        }
    },
};
