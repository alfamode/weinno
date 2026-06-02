import { FieldHook, PersonFieldKey } from './types';
import {
    filterChoose,
    notImplemented,
    selectChoose,
    getFieldControl
} from './helpers';

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
    'personnel-code': async ({ page, value }) => {
        await page.locator('#PersonnelCode').fill(value);
    },

    'organization': async ({ page, value }) => {
        await selectChoose(page, '#OrgIdAndIsFreeVolunteer_chosen', value, true);
    },

    'job-title': async ({ page, value }) => {
        await filterChoose(page, 'JobTitle', page.locator('#mainPost'), value);
    },

    'job-degree': async ({ page, value }) => {
        const select = page.locator('#EmploymentTypeId');

        switch (value) {
            case '1':
                await select.selectOption('13');
                break;
            case '2':
                await select.selectOption('3');
                break;
            case '3':
                await select.selectOption('4');
                break;
            case '4':
                await select.selectOption('5');
                break;
            case 'ارشد':
                await select.selectOption('7');
                break;
            default:
                throw new Error(
                    "Job Degree was passed correctly from test case to form's page."
                );
        }
    },

    'employment-type': async ({ page, value }) => {
        const select = page.locator('#EmploymentTypeId');

        switch (value) {
            case 'ساعتی':
                await select.selectOption('62');
                break;
            case 'پیمانی':
                await select.selectOption('2');
                break;
            case 'رسمی':
                await select.selectOption('1');
                break;
            default:
                throw new Error(
                    "Employment Type was passed correctly from test case to form's page."
                );
        }
    },

    'date-of-employment': async ({ page, value }) => {
        await page.locator('#EmploymentDateStr').fill(value);
    },

    'employee-unit': async ({ page, value }) => {
        const controls = getFieldControl(page, 'واحد محل خدمت');
        await filterChoose(page, 'Unit', controls, value);
    },

    'higher-education-degree': async ({ page, value }) => {
        await selectChoose(page, '#EducationalLevelId_chosen', value);
    },

    'higher-education-field': async ({ page, value }) => {
        await selectChoose(page, '#EducationalFieldId_chosen', value, true);
    },

    'training-basis': async ({ page, value }) => {
        await selectChoose(page, '#OrganizationalPostTypeId_chosen', value);
    },

    'degree-reference-code': async ({ page, value }) => {
        await page.locator('#TrackCode').fill(value);
    },

    'assigned-shift': async ({ page, value }) => {
        await selectChoose(page, '#ShiftWorkId_chosen', value);
    },

    'shift-group': notImplemented,

    'person-type': async ({ page, value }) => {
        await selectChoose(page, '#PersonTypeIdAndEnum_chosen', value);
    },

    'supervisor': async ({ page, value }) => {
        const controls = getFieldControl(page, 'مدیر');
        await filterChoose(page, 'Supervisor', controls, value);
    },
};
