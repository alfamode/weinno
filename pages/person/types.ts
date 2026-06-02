import { Page } from '@playwright/test';

export type PersonFieldKey =
    | 'nationality'
    | 'national-code'
    | 'firstname'
    | 'surname'
    | 'male-parent'
    | 'date-of-birth'
    | 'mobile'
    | 'location-of-birth'
    | 'location-of-registration'
    | 'firstname-english'
    | 'surname-english'
    | 'male-parent-english'
    | 'location-of-birth-english'
    | 'location-of-registration-english'
    | 'marital-status'
    | 'personnel-code'
    | 'id-certificate-code'
    | 'gender'
    | 'province'
    | 'town'
    | 'email'
    | 'organization'
    | 'job-title'
    | 'job-degree'
    | 'employment-type'
    | 'date-of-employment'
    | 'employee-unit'
    | 'work-number'
    | 'higher-education-degree'
    | 'higher-education-field'
    | 'training-basis'
    | 'degree-reference-code'
    | 'address'
    | 'postal-code'
    | 'insurance-date'
    | 'insurance-code'
    | 'tamin-username'
    | 'tamin-password'
    | 'assigned-shift'
    | 'shift-group'
    | 'person-type'
    | 'supervisor'
    | 'bank-name'
    | 'branch-name'
    | 'branch-code'
    | 'debit-card-number'
    | 'deposit-type'
    | 'deposit-number'
    | 'deposit-owner-name'
    | 'iban'
    | 'personnel-picture-manual-selection'
    | 'signature-manual-selection';

export type PersonFormData = Partial<Record<PersonFieldKey, string>>;

export type FieldHook = (ctx: {
    page: Page;
    value: string;
}) => Promise<void>;

export const DEFAULT_PERSON_FEILDS: PersonFieldKey[] = [
    'national-code',
    'date-of-birth',
    'firstname',
    'surname',
    'mobile',
    'marital-status',
    'personnel-code',
    'id-certificate-code',
    'gender',
    'province',
    'town',
    'organization',
    'job-title',
    'address',
    'person-type',
];

export type PageHandle = {
  get: () => Page;
  set: (page: Page) => void;
};