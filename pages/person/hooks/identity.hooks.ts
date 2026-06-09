import {
    PersonFieldKey,
    FieldHook,
} from '@pages/person/person.types';
import {
    fill,
    chosen,
    selectByMap,
} from '@pages/person/hooks/factories';

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
    'nationality': chosen('#NationalityId_chosen'),
    'national-code': fill('#NationalCode'),
    'firstname': fill('#FirstName'),
    'surname': fill('#LastName'),
    'male-parent': fill('#FatherName'),
    'date-of-birth': fill('#BirthDate'),
    'location-of-birth': fill('#BirthLocation'),
    'location-of-registration': fill('#IssuanceLocation'),
    'firstname-english': fill('#FirstNameEn'),
    'surname-english': fill('#LastNameEn'),
    'male-parent-english': fill('#FatherNameEn'),
    'location-of-birth-english': fill('#BirthLocationEng'),
    'location-of-registration-english': fill('#IssuanceLocationEng'),
    'marital-status': selectByMap('#MaritalStatus', {
        'متاهل': 'Married',
        'متأهل': 'Married',
        'مجرد': 'ُSingle',
        'معیل': 'Supporter',
        'مطلقه': 'Divorced',
        'نامشخص': 'Unknown',
        'نا مشخص': 'Unknown',
    }, { label: 'marital-status' }),
    'id-certificate-code': fill('#IdNumber'),
    'gender': selectByMap('#Gender', {
        'مرد': 'Male',
        'زن': 'Female'
    }, { label: 'gender' }),
};
