import {
    PersonFieldKey,
    FieldHook,
} from '@pages/person/person.types';
import {
    fill,
    selectByMap,
} from '@pages/person/hooks/factories';

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
    'insurance-date': fill('#InsuranceDate'),
    'insurance-code': fill('#InsuranceNumber'),
    'tamin-username': fill('#InsuranceUserName'),
    'tamin-password': fill('#InsurancePassword'),
    'bank-name': selectByMap('#BankId', {
        'ملی': '62',
        'ملت': '2',
        'سیزپی': '1',
        'بانک مهرایران': '4',
        'بانک مهر ایران': '4'
    }, { label: 'bank-name' }),
    'branch-name': fill('#BranchName'),
    'branch-code': fill('#BranchCode'),
    'debit-card-number': fill('#CardNumber'),
    'deposit-type': fill('#AccountType'),
    'deposit-number': fill('#AccountNumber'),
    'deposit-owner-name': fill('#AccountOwner'),
    'iban': fill('#ShabaNumber'),
};
