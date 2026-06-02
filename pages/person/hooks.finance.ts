import { FieldHook, PersonFieldKey } from './types';

export const financeKeys = [
    'insurance-date',
    'insurance-code',
    'tamin-username',
    'tamin-password',
    'bank-name',
    'branch-name',
    'branch-code',
    'debit-card-number',
    'deposit-type',
    'deposit-number',
    'deposit-owner-name',
    'iban',
] as const satisfies readonly PersonFieldKey[];

export const financeHooks: Partial<Record<(typeof financeKeys)[number], FieldHook>> = {
    'insurance-date': async ({ page, value }) => {
        await page.locator('#InsuranceDate').fill(value);
    },

    'insurance-code': async ({ page, value }) => {
        await page.locator('#InsuranceNumber').fill(value);
    },

    'tamin-username': async ({ page, value }) => {
        await page.locator('#InsuranceUserName').fill(value);
    },

    'tamin-password': async ({ page, value }) => {
        await page.locator('#InsurancePassword').fill(value);
    },

    'bank-name': async ({ page, value }) => {
        const select = page.locator('#BankId');

        switch (value) {
            case 'ملی':
                await select.selectOption('8');
                break;
            case 'ملت':
                await select.selectOption('10');
                break;
            case 'سیزپی':
                await select.selectOption('7');
                break;
            case 'بانک مهرایران':
                await select.selectOption('4');
                break;
            case 'بانک مهر ایران':
                await select.selectOption('4');
                break;
            default:
                throw new Error(
                    "Bank Name was passed correctly from test case to form's page."
                );
        }
    },

    'branch-name': async ({ page, value }) => {
        await page.locator('#BranchName').fill(value);
    },

    'branch-code': async ({ page, value }) => {
        await page.locator('#BranchCode').fill(value);
    },

    'debit-card-number': async ({ page, value }) => {
        await page.locator('#CardNumber').fill(value);
    },

    'deposit-type': async ({ page, value }) => {
        await page.locator('#AccountType').fill(value);
    },

    'deposit-number': async ({ page, value }) => {
        await page.locator('#AccountNumber').fill(value);
    },

    'deposit-owner-name': async ({ page, value }) => {
        await page.locator('#AccountOwner').fill(value);
    },

    'iban': async ({ page, value }) => {
        await page.locator('#ShabaNumber').fill(value);
    },
};
