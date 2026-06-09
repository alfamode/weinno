import {
    PersonFieldKey,
    FieldHook,
} from '@pages/person/person.types';
import {
    fill,
    chosen,
    filterModal,
    selectByMap,
    notImplemented,
    custom,
} from '@pages/person/hooks/factories';

export const employmentKeys = [
    'personnel-code',
    'organization',
    'job-title',
    'job-degree',
    'employment-type',
    'date-of-employment',
    'employee-unit',
    'higher-education-degree',
    'higher-education-field',
    'training-basis',
    'degree-reference-code',
    'assigned-shift',
    'shift-group',
    'person-type',
    'supervisor',
] as const satisfies readonly PersonFieldKey[];

export const employmentHooks: Partial<Record<(typeof employmentKeys)[number], FieldHook>> = {
    'personnel-code': fill('#PersonnelCode'),
    'organization': chosen('#OrgIdAndIsFreeVolunteer_chosen', { fillSearch: true }),
    'job-title':
        // FIXME this is preferred method, but it doesn't work for some reason.
        // filterModal({ type: 'JobTitle', fieldLabel: 'سمت', }),
        custom(async (page, value) => {
            await page.locator('#mainPost').getByRole('button', { name: '...' }).click();
            await page.getByRole('textbox', { name: 'عنوان شغل' }).fill(value);
            await page.getByRole('button', { name: 'مشاهده اطلاعات' }).click();
            await page.getByRole('button', { name: 'انتخاب' }).first().click();
        }),
    'job-degree': selectByMap('#EmploymentTypeId', {
        '1': '13',
        '2': '3',
        '3': '4',
        '4': '5',
        'ارشد': '7',
    }, { label: 'job-degree' }),
    'employment-type': selectByMap('#EmploymentTypeId', {
        'ساعتی': '62',
        'پیمانی': '2',
        'رسمی': '1'
    }, { label: 'emplyment-type' }),
    'date-of-employment': fill('#EmploymentDateStr'),
    'employee-unit': filterModal({ type: 'Unit', fieldLabel: 'واحد محل خدمت', }),
    'higher-education-degree': chosen('#EducationalLevelId_chosen'),
    'higher-education-field': chosen('#EducationalFieldId_chosen', { fillSearch: true }),
    'training-basis': chosen('#OrganizationalPostTypeId_chosen'),
    'degree-reference-code': fill('#TrackCode'),
    'assigned-shift': chosen('#ShiftWorkId_chosen'),
    'shift-group': notImplemented,
    'person-type': chosen('#PersonTypeIdAndEnum_chosen'),
    'supervisor': filterModal({ type: 'Supervisor', fieldLabel: 'مدیر', }),
};
